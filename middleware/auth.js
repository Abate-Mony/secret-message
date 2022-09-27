const { BadErrorRequest } = require("../error")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const authentication = async(req, res, next) => {
    const authHeader = req.headers.authorization

    // console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("pablo")) {
        return next(BadErrorRequest("authoriation failed please try again later"))
    }
    const token = authHeader.split(" ")[1]
        // console.log(authHeader)

    try {
        const payload = await jwt.verify(token, "secret")
        const { userId, userName } = payload
        req.userInfo = { userId, userName }
            // console.log(userId, userName)
        next()
    } catch (error) {
        console.log(error)
        throw new BadErrorRequest("invalid token")
    }
}
module.exports = authentication