const express = require("express");
const router = express.Router();

const {createEvent,getEvents,updateEvent,deleteEvent} = require("../controllers/event_controllers")


router.post("/create", createEvent)
router.get("/", getEvents)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

module.exports = router