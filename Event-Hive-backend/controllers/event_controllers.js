const {Event} = require("../models/event_model")


exports.createEvent = async (req,res)=>{
    try{

        const {title, description, date, maxParticipants, registrationDeadline} = req.body

        const event = await Event.create({
            title,
            description,
            date,
            maxParticipants,
            registrationDeadline
        })

        res.status(201).json({
            message:"Event created successfully",
            event
        })

    }catch(error){
        res.status(500).json({message:error.message})
    }
}



exports.getEvents = async (req,res)=>{
    try{

        const events = await Event.find()

        res.status(200).json(events)

    }catch(error){
        res.status(500).json({message:error.message})
    }
}



exports.updateEvent = async (req,res)=>{
    try{

        const eventId = req.params.id

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"Event updated successfully",
            updatedEvent
        })

    }catch(error){
        res.status(500).json({message:error.message})
    }
}


exports.deleteEvent = async (req,res)=>{
    try{

        const eventId = req.params.id

        await Event.findByIdAndDelete(eventId)

        res.status(200).json({
            message:"Event deleted successfully"
        })

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

