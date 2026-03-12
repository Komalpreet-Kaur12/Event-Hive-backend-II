const express = require("express")
const router = express.Router()

const {createRegistration,getRegistrations,updateRegistration,deleteRegistration} = require("../controllers/registration_controllers")


router.post("/create", createRegistration)
router.get("/", getRegistrations)
router.put("/:id", updateRegistration)
router.delete("/:id", deleteRegistration)

module.exports = router