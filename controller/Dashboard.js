const Users = require("../models/User.js")
const Password = require("../models/Dashboard")
const { BadErrorRequest } = require("../error")
const Message = require("../models/Message")
const allmessages = async(req, res) => {
    const _id = req.params._id
    if (!_id) {
        throw new BadErrorRequest("please send and id")
    }
    const messages = await Message.find({ sentTo: _id })
    console.log(messages)
    res.status(200).json({ messages })
}
const allUsers = async(req, res) => {

    const users = await Users.find({})
    res.status(200).json({ Users: users })
}
const singleUsers = async(req, res) => {
    const object = {}

    const { id, password, name, _id } = req.query
    console.log(req.query)
    if (name) {
        object["name"] = name
    }
    if (password) {
        object["password"] = password
    }
    if (id) {
        object["id"] = id
    }
    if (_id) {
        object["_id"] = _id
    }
    if ((Object.values(object)).length <= 0) {
        res.status(200).json({ Users: [] })
        return
    }
    const users = await Users.find(object)

    res.status(200).json({ Users: users })
}
module.exports = {
    allUsers,
    singleUsers,
    allmessages
}