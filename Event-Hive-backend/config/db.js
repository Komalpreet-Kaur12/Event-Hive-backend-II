const mongoose=require("mongoose");
require("dotenv").config();



mongoose.connect(process.env.monodb_connect).
then(() =>{
    console.log("Connected to MongoDb");
}).
catch((err)=>{
    console.log("Mongoose Dissconnected",err)
})
module.exports=mongoose;