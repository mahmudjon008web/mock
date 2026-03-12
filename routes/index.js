const router = require("express").Router()

router.use("/auth", require("./auth.route"))
router.use("/users", require("./user.route"))
router.use("/writing", require("./writing.route"))
router.use("/reading", require("./reading.route"))
router.use("/listening", require("./listening.route"))

module.exports = router