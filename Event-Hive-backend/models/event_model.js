const mongoose=require("mongoose");
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
const Event = new mongoose.model("Event", eventSchema)

module.exports={
    Event
};