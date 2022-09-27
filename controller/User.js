const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { BadErrorRequest, UnethicatedError } = require("../error")
const login = async(req, res, next) => {
    const { id, password } = req.body
    if (!id || !password) {
        throw new BadErrorRequest("please  provide a name ,password")
    }
    // console.log(req.body)
    const user = await User.findOne({ id, password })
        // console.log(user)
    if (!user) {
        throw new UnethicatedError("Unthication Error")
    }
    const token = await user.createJWT()
    res.status(200).json({ user: { name: user.name, token } })
}
const register = async(req, res) => {

    console.log(req.body)

    const user = await User.create({...req.body })
    const token = await user.createJWT()
    res.status(200).json({ user: { name: user.name, password: user.password, id: user.id, _id: user._id, token } })
}

const user = async(req, res) => {
    const id = req.userInfo.userId
    console.log(id)
    const _user = await User.findOne({ _id: id })
    res.status(200).json({ user: _user })
}
module.exports = {
    register,
    login,
    user
}