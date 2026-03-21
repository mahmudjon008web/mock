const router = require("express").Router()
const { getAllExams, getExamById } = require("../controllers/exam.controller")
const {isAdmin} = require("../middleware/isAdmin")
const {protect} = require("../middleware/protected")

router.get("/all", protect, isAdmin, getAllExams)


router.get("/:id", protect, isAdmin, getExamById)

module.exports = router