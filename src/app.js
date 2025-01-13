//--------------------------------Requiring Express------------------------------------
const express = require("express");
const app = express();
const port =  8080;
const path = require("path")
//--------------------------------Requiring EJS / Static File ------------------------------------
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"../views"))
app.use(express.static(path.join(__dirname,"../public")))

//---------------------------------//Error Handling class-----------------------------------
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

//--------------------------------Requiring MongooseDB------------------------------------
const juryData = require("../DB_Models/jury.js")
const nominateData=require("../DB_Models/nominate.js")
const GoogleProfile=require("../DB_Models/GoogleProfile.js")
//--------------------------------Data Parse------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended : true}))
//--------------------------------Requiring EJS-Mate------------------------------------
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
//-------------------------------Requiring google-authenticate-20------------------------
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//---------------------------------- Middleware for session handling-----------------------
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);
//--------------------------------Middleware for Authentication------------------------------------
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google'); 
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    res.status(403).send('Access denied. Admins only.');
}

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingProfile = await GoogleProfile.findOne({ id: profile.id });
                if (!existingProfile) {
                  const newProfile = new GoogleProfile({
                    id: profile.id,
                    displayName: profile.displayName,
                    name: profile.name,
                    emails: profile.emails,
                    photos: profile.photos,
                    provider: profile.provider,
                    _raw: JSON.stringify(profile._raw),
                    _json: profile._json,
                  });
                  
                  await newProfile.save();
                }
                return done(null, profile);
              } catch (error) {
                return done(error, null);
              }
            }
          )
        );

passport.serializeUser((user, done) => {
    done(null, { id: user.id, isAdmin: user.isAdmin });
});

passport.deserializeUser(async (user, done) => {
    try {
        const profile = await GoogleProfile.findOne({ id: user.id });
        done(null, profile); 
    } catch (error) {
        done(error, null);
    }
});

// Routes
app.get("/auth", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth" }),
    (req, res) => {
        res.redirect("/"); 
    }
);

app.get("/profile", async(req, res) => {

    if (!req.isAuthenticated()) {
        return res.redirect('/auth');
      }
      res.json(req.user); 
    res.redirect("/"); 
});

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err); // Handle errors if logout fails
        res.redirect("/");
    });
});

//--------------------------------google-authenticate end----------------------------
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}.....`);
})
//--------------------------------Routing------------------------------------
//--------------------------------Admin Control Panel Route-------------------------------------
app.get('/admin', isAdmin, async (req, res) => {
    console.log('User:', req.user);  
    const nominations = await nominateData.find();
    const jury = await juryData.find();
    const employees = await EmployeeData.find();
    res.render('./admin/adminPanel', {
        userName: req.user.displayName,
        nominations,
        jury,
        employees,
    });
});

// Admin can delete a nomination
app.post('/admin/deleteNomination/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    await nominateData.findByIdAndDelete(id);
    res.redirect('/admin');
});

// Admin can update a nomination
app.post('/admin/editNomination/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    await nominateData.findByIdAndUpdate(id, updatedData);
    res.redirect('/admin');
});

//---->HomePage Route 
app.get("/", async (req, res) => {
    let nominate = await nominateData.find();
    let userName = req.isAuthenticated() ? req.user.displayName : null; 
    let userId = req.isAuthenticated() ? req.user.id : null;
    res.render("routes/home.ejs", { nominate, userName, userId });
});
//----> Vote Route
app.post('/vote/:_id', isAuthenticated, async (req, res) => {
    try {
        const { _id } = req.params;
        const userId = req.user.id; 
        const nominee = await nominateData.findById(_id);
        if (nominee.votedBy.includes(userId)) {
            return res.status(400).json({ success: false, message: "You have already voted for this nominee." });
        }
        nominee.votes += 1;
        nominee.votedBy.push(userId);

        await nominee.save();

        res.status(200).json({ success: true, votes: nominee.votes });
    } catch (error) {
        console.error('Error updating votes: ', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



//--------------------------------Leaderboard Route------------------------------
app.get("/leaderboard", async (req, res) => {
    try {
        let nominate = await nominateData.find();
        const userName = req.user ? req.user.displayName : null;
        nominate = nominate.sort((a, b) => {
            const totalScoreA = a.votes + (a.juryVotes || 0);
            const totalScoreB = b.votes + (b.juryVotes || 0);
            return totalScoreB - totalScoreA;
        });

        nominate = nominate.map((nominee, index) => {
            nominee.rankIcon =
                index === 0
                    ? "🏆"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : ""; 
            return nominee;
        });

        res.render("./pages/leaderboard", { nominate, userName });
    } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
        res.status(500).send("Internal Server Error");
    }
});

//---------------------------------Jury Route---------------------------------------

app.get("/jury", async (req, res) => {
    const userName = req.user ? req.user.displayName : null;
    const jury = await juryData.find();
    res.render("./pages/jury", { userName, jury });
});


//jury-route
app.post("/jury/:_id",async(req,res)=>{
    let {_id} = req.params;
    let data = await juryData.findById(_id)
    res.redirect("/")

})


//---------------------------------Nominate Route-------------------------------------

app.get("/nominateyourself",(req,res)=>{
    const userName = req.user ? req.user.displayName : null;
    res.render("./pages/nominateyourself",{userName})
})

app.post("/submitnomination",async (req,res)=>{
    let {nominationType, fullName, email, linkedIn, phone, company, jobTitle, category, peerFullName, peerEmail, peerLinkedIn, peerPhone, peerCompany, peerJobTitle, relation} = req.body;

    let data = new nominateData({
        nominationType : nominationType,
        fullName : fullName,
        email : email,
        linkedIn : linkedIn,
        phone : phone,
        company : company,
        jobTitle : jobTitle,
        category : category,
        peerFullName : peerFullName,
        peerEmail : peerEmail,
        peerLinkedIn : peerLinkedIn,
        peerPhone : peerPhone,
        peerCompany : peerCompany,
        peerJobTitle : peerJobTitle,
        relation : relation,
    })

    data.save().then(()=>{console.log("Data Saved Successfully...");}).catch(()=>{console.log("Error Occurred");})
    res.redirect("/")
})


app.get("/nominatesomeoneelse",(req,res)=>{
    const userName = req.user ? req.user.displayName : null;
    res.render("./pages/nominatesomeoneelse",{userName})
})

//---------------------------Search Route-------------------------------------
app.get('/search', async (req, res) => {
    try {
        const { query } = req.query; 
        const results = await nominateData.find({
            fullName: { $regex: query, $options: 'i' }, 
        });

        res.status(200).json(results); 
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found !...."));
})

app.use((err, req, res, next) => {
    let{status=500,message="something went wrong "}=err;
    res.status(status).send(message);
   
});



