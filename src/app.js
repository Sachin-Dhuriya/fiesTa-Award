//--------------------------------Requiring Express------------------------------------
const express = require("express");
const app = express();
const port = 8080;
const path = require("path")
//--------------------------------Requiring EJS / Static File ------------------------------------
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"../views"))
app.use(express.static(path.join(__dirname,"../public")))
//app.set('layout', 'layouts/boilerplate'); //deep 

//--------------------------------Requiring MongooseDB------------------------------------
const EmployeeData = require("../DB_Models/db.js")
const juryData = require("../DB_Models/jury.js")
const nominateData = require("../DB_Models/nominate.js")

//--------------------------------Data Parse------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended : true}))
//--------------------------------Requiring EJS-Mate------------------------------------
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);


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







