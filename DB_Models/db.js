const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/gminfotech"
async function  main(){
   await mongoose.connect(mongoURL);
}

main().then(()=>{console.log("Connection Successfull.....");}).catch(()=>{console.log("Error Occured during connection");})

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true,
    },
    position : {
        type : String,
        required : true,
        trim: true,
    },
    nominate : {
        type : String,
        required : true,
        trim: true,
    },
    linkedin : {
        type : String,
        required : true,
    },
    votes : {
        type : Number,
        required : true,
        default : 0,
        min: 0,
    },
    juryVotes : {
        type : Number,
        required : true,
        default : 0,
        min: 0,
    },
    nominatedBy : {
        type : String,
        required : true,
        trim: true,
    },
    nominatedDes : {
        type : String,
        required : true,
        trim: true,
    },
})

const EmployeeData = new mongoose.model("EmployeeData",employeeSchema)

module.exports = EmployeeData;

