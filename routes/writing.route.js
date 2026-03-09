const { getTasks, postTasks, updateTask, deleteTask, getTaskById } = require("../controllers/writing/writing.controller")
const { isAdmin } = require("../middleware/isAdmin")
const { protect } = require("../middleware/protected")
const upload = require("../utils/fileUpload")

const router = require("express").Router()

router.get("/", protect, isAdmin, getTasks)

router.get("/:id", protect, isAdmin, getTaskById)

router.post("/post", protect, isAdmin, upload.single("task1_img"), postTasks)

router.patch("/update/:id", protect, isAdmin, upload.single("task1_img"), updateTask)

router.delete("/delete/:id", protect, isAdmin, deleteTask)

module.exports = router