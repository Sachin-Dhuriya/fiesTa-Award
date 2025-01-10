const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/gminfotech"
async function  main(){
   await mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });
}

main().then(()=>{console.log("Connection Successfull.....");}).catch(()=>{console.log("Error Occured during connection");})

const GoogleProfileSchema = new mongoose.Schema({ //googleProfileSchema
    id: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    name: {
      familyName: String,
      givenName: String,
    },
    emails: [
      { value: String, verified: Boolean }
    ],
    photos: [
      { value: String }
    ],
    provider: { type: String, required: true },
    _raw: { type: String },
    _json: {
      sub: String,
      name: String,
      given_name: String,
      family_name: String,
      picture: String,
      email: String,
      email_verified: Boolean,
    },
  }, { timestamps: true });

  module.exports = new mongoose.model("GoogleProfile",GoogleProfileSchema) //googleData

//module.exports = GoogleProfile; //export googleData

