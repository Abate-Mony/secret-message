const express = require("express")
const router = express.Router()
const { createMessage } = require("../controller/Upload")
router.route("/message/:id").post(createMessage)

module.exports = router