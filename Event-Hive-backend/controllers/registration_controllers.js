const {Registration} = require("../models/registration")


exports.createRegistration = async (req, res) => {
    try {

        const { event, user, teamName, members } = req.body

        const registration = await Registration.create({
            event,
            user,
            teamName,
            members
        })

        res.status(201).json({
            message: "Registration successful",
            registration
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



exports.getRegistrations = async (req, res) => {
    try {

        const registrations = await Registration
            .find()
            .populate("event")
            .populate("user")

        res.status(200).json(registrations)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



exports.updateRegistration = async (req, res) => {
    try {

        const registrationId = req.params.id

        const updatedRegistration = await Registration.findByIdAndUpdate(
            registrationId,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "Registration updated successfully",
            updatedRegistration
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



exports.deleteRegistration = async (req, res) => {
    try {

        const registrationId = req.params.id

        await Registration.findByIdAndDelete(registrationId)

        res.status(200).json({
            message: "Registration deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

