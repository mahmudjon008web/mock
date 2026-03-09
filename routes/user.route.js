const router = require("express").Router()
const { deleteUser, getUsers } = require("../controllers/admin/admin.controller")
const {isAdmin} = require("../middleware/isAdmin")
const { protect } = require("../middleware/protected")

router.get("/", protect, isAdmin, getUsers)

router.delete("/delete/:id", protect, isAdmin, deleteUser)

module.exports = router