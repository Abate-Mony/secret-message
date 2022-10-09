const dashboard = require("../models/dashboard")
const { BadErrorRequest, UnethicatedError } = require("../error")
const jwt = require("jsonwebtoken")
const login = async(req, res) => {
    const { password } = req.body
    const admin = await dashboard.findOne({ password })
    if (!admin) {
        throw new UnethicatedError("please provide a valid id")
    }
    const token = await jwt.sign({ _id: admin._id }, "secret", { expiresIn: "10d" })
    res.status(200).json({ token })
}

module.exports = login