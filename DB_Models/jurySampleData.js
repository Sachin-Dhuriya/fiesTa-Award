const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/gminfotech"
async function  main(){
   await mongoose.connect(mongoURL);
}

main().then(()=>{console.log("Connection Successfull.....");}).catch(()=>{console.log("Error Occured during connection");})

const juryData = require("./jury.js")

//Sample Data
const jurySampleData = [
 
  {
    name :"Javeed Khan",
    position : "Director - Talent Acquisition",
    companyName : "KPMG",
    juryDesc : "Global talent leader with expertise from the UN to KPMG, driving diversity, agile hiring, and forward-thinking talent strategies.",
    img :"https://media.licdn.com/dms/image/v2/D4D03AQF-M05G0-84Hw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708276857992?e=1741824000&v=beta&t=rw8mYDIKyDD_ALxGcXZdaCXP8Gji9Q4hbAdAg-6aCFg",
    linkedin : "https://www.linkedin.com/in/javeedashrafkhan/",
  },
  {
    name :"Savita Hortikar",
    position : "Vice President- Global Head of TA",
    companyName : "Fractal",
    juryDesc : "23+ years in talent acquisition at Oracle, Yahoo, and IBM Labs, specializing in tech hiring, diversity programs, and building high-performing teams.",
    img :"https://media.licdn.com/dms/image/v2/D5603AQGRbyLJBUHSeA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1667743283850?e=1741824000&v=beta&t=uYSanT4l8RTRzxtGMd7cyHP0xHt1trvv0OJIEU9hdMI",
    linkedin : "https://www.linkedin.com/in/savitahortikar/",
  },
  {
    name :"Rajendra Prasad",
    position : "Global Head of Talent Acquisition",
    companyName : "Nium",
    juryDesc : "20+ years in global recruiting, mastering tech, non-tech, and diversity hiring with innovative strategies. Recruiting Geek by choice.",
    img :"https://media.licdn.com/dms/image/v2/C5603AQHo55GkGHUKjw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516251364288?e=1741824000&v=beta&t=XRRXZ1moyef_SLHIcQxCxS4DZ9K5ICEYrxe5Uw0v2js",
    linkedin : "https://www.linkedin.com/in/prasadrajendra/",
  },
  {
    name :"Swati Khanna",
    position : "VP Human Capital",
    companyName : "Peak XV Partners",
    juryDesc : "17+ years in talent consulting, now VP Human Capital at Peak XV Partners, helping startups hire and grow top talent.",
    img :"https://media.licdn.com/dms/image/v2/C4D03AQFyHBWQ96yeBw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1655459387349?e=1741824000&v=beta&t=NaNG06WPkEdJv-ZtaM-djkcIvu0BMuWD2lVbrepAlVI",
    linkedin : "https://www.linkedin.com/in/swatikhanna/",
  },
  {
    name :"Rupali Sharma",
    position : "Director - Human Capital",
    companyName : "Z47",
    juryDesc : "15+ years in HR, specializing in leadership hiring and 0-2 stage startups. Driving talent and culture at Z47. Passionate about building high-performance teams.",
    img :"https://media.licdn.com/dms/image/v2/D5603AQH9wA1lRqm8gQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710941513860?e=1741824000&v=beta&t=IwHp17xJ2j_lkM-YDpBfrszcYjstbqDbngH2TLtdhjA",
    linkedin : "https://www.linkedin.com/in/sharmarupali/",
  },
]
juryData.insertMany(jurySampleData).then(()=>{console.log("Data Added Successfully....");})