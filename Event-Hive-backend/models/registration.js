const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Event"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    teamName: {
        type: String,
        required:true
    },
    members: {
        type: [String],
        required:true
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
})
const Registration = new mongoose.model("Registration", registrationSchema)
module.exports = {
    Registration,
    
}