const express = require("express")
const router = express.Router()

const {createUser,getUsers,updateUser,deleteUser} = require("../controllers/user_controllers")


router.post("/create", createUser)
router.get("/", getUsers)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router