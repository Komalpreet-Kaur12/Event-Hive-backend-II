const {User} = require("../models/user_model")
const bcrypt = require("bcryptjs")


exports.createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



exports.getUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password")

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



exports.updateUser = async (req, res) => {
    try {

        const userId = req.params.id

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        )

        res.status(200).json({
            message: "User updated successfully",
            updatedUser
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



exports.deleteUser = async (req, res) => {
    try {

        const userId = req.params.id

        await User.findByIdAndDelete(userId)

        res.status(200).json({
            message: "User deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

