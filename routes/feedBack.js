const express = require("express")
const auth = require("../middleware/auth")
const feedback = require("../controller/feedBack")
const router = express.Router()
router.route("/").post(auth, feedback)
module.exports = router