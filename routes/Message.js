const express = require("express")
const router = express.Router()
const { deleteMessage, getMessages, getMessage, createMessage } = require("../controller/Message")

router.route("/").get(getMessages).post(createMessage)
router.route("/:id").delete(deleteMessage).get(getMessage)


module.exports = router