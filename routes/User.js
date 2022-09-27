const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middleware/auth")
const { login, register, user, } = require("../controller/User")
router.route("/login").post(login)
router.route("/register").post(register)
router.route("/user").post(auth, user)
router.route("/deleteaccount").get(auth, async(req, res) => {
    const id = req.userInfo.userId
        // console.log("enter here tags")

    const del = await User.findOneAndDelete({
        _id: id
    })
    console.log(del)
    if (!del) {
        console.log("fail to delete user please trying again later")
        throw new Error("fail to delete user")
    }
    res.status(200).json({ ok: 200 })
        // res.send("hello")
})


module.exports = router