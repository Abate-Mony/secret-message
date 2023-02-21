const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { login, register, user, getUserName } = require("../controller/User")
router.route("/login").post(login)
router.route("/register").post(register)
router.route("/user").post(auth, user)
router.route("/username/:id").get(getUserName)



module.exports = router