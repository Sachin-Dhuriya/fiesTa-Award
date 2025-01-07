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

app.get('/', (req, res) => {
    res.render("routes/home.ejs");
});









