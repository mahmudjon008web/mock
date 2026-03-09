const router = require("express").Router()
const { getAllReadings, postReading, deleteReadingByReadingId, updateReadingById, getReadingById } = require("../controllers/reading/reading.controller")
const {isAdmin} = require("../middleware/isAdmin")
const {protect} = require("../middleware/protected")


router.get("/all", protect, isAdmin, getAllReadings)

router.get("/:id", protect, isAdmin, getReadingById)

router.post("/post", protect, isAdmin, postReading)

router.patch("/update/:id", protect, isAdmin, updateReadingById)

router.delete("/delete/:id", protect, isAdmin, deleteReadingByReadingId)

module.exports = router