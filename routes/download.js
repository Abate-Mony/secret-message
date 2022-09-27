const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { image, images } = require("../controller/Download")
router.route("/").get(auth, images)
router.route("/image/:name").get(image)

module.exports = router