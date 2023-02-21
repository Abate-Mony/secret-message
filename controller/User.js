const User = require("../models/User")
const bcrypt = require("bcryptjs")
const feedBack = require("../models/UserFeed")
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
    res.status(200).json({ user: { name: user.name, _id: user._id, token } })
}
const register = async(req, res) => {

    // console.log(req.body)

    const user = await User.create({...req.body })
    const token = await user.createJWT()
    res.status(200).json({ user: { name: user.name, password: user.password, id: user.id, _id: user._id, token } })
}

const user = async(req, res) => {
    const id = req.userInfo.userId
    const havethisuserupdatedhisfeedback = await feedBack.findOne({ createdBy: id });
    const isTrue = havethisuserupdatedhisfeedback ? true : false
        // if()
    console.log(havethisuserupdatedhisfeedback)
    const _user = await User.findOne({ _id: id })
    if (!_user) {
        throw new UnethicatedError("Unthication Error")

    }
    res.status(200).json({ user: _user, update: isTrue })
}
const getUserName = async(req, res) => {
    console.log(req.params);
    const { id } = req.params
    const username = await User.findOne({
        _id: id
    }, {
        name: 1,
        _id: 0
    })
    if (!username) throw new UnethicatedError("canft find user with id " + id)
    res.status(200).json({ username })

}
module.exports = {
    register,
    login,
    user,
    getUserName
}