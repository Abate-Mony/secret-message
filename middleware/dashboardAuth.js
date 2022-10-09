const { BadErrorRequest } = require("../error")
const jwt = require("jsonwebtoken")
const Password = require("../models/Dashboard")
const auth = async(req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("dashboard")) {
        throw new BadErrorRequest("headers authentication fail")
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, "secret")
        console.log(payload)
        _id = payload._id
        const isAdmin = await Password.findOne({ _id })
        if (!isAdmin) {
            throw new BadErrorRequest("invalid token")
        }
        next()
    } catch (error) {
        console.log(error)
        throw new error
    }
}
module.exports = auth