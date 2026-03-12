const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "owner"],
        default: "user"
    }
})
const User = new mongoose.model("User", userSchema)
module.exports={
    User
};