const express = require("express")
const router = express.Router()
const { createMessage } = require("../controller/Upload")
    // router.route("/post/:id").post(upload)
router.route("/message/:id").post(createMessage)

module.exports = router