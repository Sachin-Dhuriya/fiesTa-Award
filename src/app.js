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
    done(null, user); // Save the user object to the session
});

passport.deserializeUser((user, done) => {
    done(null, user); // Retrieve the user object from the session
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
//---->HomePage Route //Welcome to Friend Repo
app.get('/', async (req, res) => {
    let data = await EmployeeData.find();
    let nominate = await nominateData.find();
    res.render("routes/home.ejs",{data , nominate});
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


//--------------------------------Leaderboard Route------------------------------

app.get("/leaderboard",(req,res)=>{
    res.render("./pages/leaderboard")
})

//---------------------------------Jury Route---------------------------------------

app.get("/jury",async(req,res)=>{
  let jury=await juryData.find();
  res.render("./pages/jury",{jury});
})


//jury-route
app.post("/jury/:_id",async(req,res)=>{
    let {_id} = req.params;
    let data = await juryData.findById(_id)
    res.redirect("/")

})


//---------------------------------Nominate Route-------------------------------------

app.get("/nominateyourself",(req,res)=>{
    res.render("./pages/nominateyourself")
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
    res.render("./pages/nominatesomeoneelse")
})







