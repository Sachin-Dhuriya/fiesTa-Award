//--------------------------------Requiring Express------------------------------------
const express = require("express");
const app = express();
const port =  8080;
const path = require("path")
//--------------------------------Requiring EJS / Static File ------------------------------------
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"../views"))
app.use(express.static(path.join(__dirname,"../public")))
//app.set('layout', 'layouts/boilerplate'); //deep 

//--------------------------------Requiring MongooseDB------------------------------------
const EmployeeData = require("../DB_Models/db.js")
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

// Middleware for session handling
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
    res.redirect('/auth/google'); // Redirect to login if not authenticated
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
                // Save the Google profile data to the database
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

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    // Make sure isAdmin is included in the serialized user data
    done(null, { id: user.id, isAdmin: user.isAdmin });
});

passport.deserializeUser(async (user, done) => {
    try {
        const profile = await GoogleProfile.findOne({ id: user.id });
        done(null, profile); // This ensures the profile includes the isAdmin field
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
        res.redirect("/"); // Redirect to profile on successful login
    }
);

app.get("/profile", async(req, res) => {

    if (!req.isAuthenticated()) {
        return res.redirect('/auth');
      }
      res.json(req.user); // Send the user data saved in MongoDB

    res.redirect("/"); // Safely access displayName
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
    console.log('User:', req.user);  // Log the user object to ensure isAdmin is true

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
    let data = await EmployeeData.find();
    let nominate = await nominateData.find();
    let userName = req.isAuthenticated() ? req.user.displayName : null; // Get the user's name
    res.render("routes/home.ejs", { data, nominate, userName });
});
//----> Vote Route
app.post('/vote/:_id', isAuthenticated, async (req, res) => {
    try {
        let { _id } = req.params;
        let data = await nominateData.findById(_id);
        let count = ++data.votes;
        await nominateData.findByIdAndUpdate(_id, { votes: count });

        res.status(200).json({ success: true, votes: count });
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
        // Sort nominees by total score in descending order
        nominate = nominate.sort((a, b) => {
            const totalScoreA = a.votes + (a.juryVotes || 0);
            const totalScoreB = b.votes + (b.juryVotes || 0);
            return totalScoreB - totalScoreA;
        });

        // Assign ranks only to the top 3
        nominate = nominate.map((nominee, index) => {
            nominee.rankIcon =
                index === 0
                    ? "🏆"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : ""; // No prize for ranks beyond 3
            return nominee;
        });

        res.render("./pages/leaderboard", { nominate, userName });
    } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
        res.status(500).send("Internal Server Error");
    }
});

//----> Vote Route
app.post("/vote/:_id", async (req, res) => {
    try {
        let { _id } = req.params;
        let data = await nominateData.findById(_id);
        let count = ++data.votes;
        await nominateData.findByIdAndUpdate(_id, { votes: count });

        res.status(200).json({ success: true, votes: count });
    } catch (error) {
        console.error("Error updating votes: ", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
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
// Search API for live search functionality
app.get('/search', async (req, res) => {
    try {
        const { query } = req.query; // Get the search term from the request

        // Query the database for employees whose full name matches the search term
        const results = await nominateData.find({
            fullName: { $regex: query, $options: 'i' }, // Case-insensitive search
        });

        res.status(200).json(results); // Return matching results as JSON
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





