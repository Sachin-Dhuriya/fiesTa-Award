const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/gminfotech"
async function  main(){
   await mongoose.connect(mongoURL);
}

main().then(()=>{console.log("Connection Successfull.....");}).catch(()=>{console.log("Error Occured during connection");})

const nominateSchema = new mongoose.Schema({
    nominationType : {
        type : String,
        required : true,
        trim: true,
    },
    fullName : {
        type : String,
        required : true,
        trim: true,
    },
    email : {
        type : String,
        required : true,
        trim: true,
    },
    linkedIn : {
        type : String,
        required : true,
        trim: true,
    },
    phone : {
        type : Number,
        required : true,
        trim: true,
    },
    company : {
        type : String,
        required : true,
        trim: true,
    },
    jobTitle : {
        type : String,
        required : true,
        trim: true,
    },
    category : {
        type : String,
        required : true,
        trim: true,
    },
    whyFit : {
        type : String,
        trim: true,
    },
    ideas : {
        type : String,
        trim: true,
    },
    votes : {
        type : Number,
        default : 0,
    },
    peerFullName : {
        type : String,
        default : "slef",
        trim: true,
    },
    peerEmail : {
        type : String,
        trim: true,
    },
    peerLinkedIn : {
        type : String,
        trim: true,
    },
    peerPhone : {
        type : Number,
        trim: true,
    },
    peerCompany : {
        type : String,
        trim: true,
    },
    peerJobTitle : {
        type : String,
        trim: true,
    },
    relation : {
        type : String,
        trim: true,
    },



})

const nominateData = new mongoose.model("nominateData",nominateSchema)

module.exports = nominateData;