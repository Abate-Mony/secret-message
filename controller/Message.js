const { Message } = require("../models")
const { BadErrorRequest } = require("../error")
const getMessages = async(req, res) => {
    const { userId } = req.userInfo
    const messages = await Message.find({ sentTo: userId }).sort({ createdAt: -1 })
    res.status(200).json({ messages, nbHits: messages.length })
}
const deleteMessage = async(req, res) => {
    const { userId, } = req.userInfo
    const { id } = req.params
    const message = await Message.findOneAndDelete({
        _id: id,
        sentTo: userId
    })
    if (!message) {
        throw new BadErrorRequest("fail to delete message")
    }
    res.status(200).json({ msg: "successfully deleteMessage" })
}
const createMessage = async(req, res) => {
    const { _id, message } = req.body
    if (!_id || !message) {
        throw new BadErrorRequest("please provide id , message")
    }

    const msg = await Message.create({ sentTo: _id, message })
    if (!msg) {
        throw new BadErrorRequest("fail to create message")
    }
    res.status(200).json({ msg: "send successfully" })
}
const getMessage = async(req, res) => {
    const { userId, } = req.userInfo
    const { id } = req.params
    const message = await Message.findOne({
        _id: id,
    })
    if (!message) {
        throw new BadErrorRequest("fail to delte message")
    }
    res.status(200).json({ message })
}
module.exports = {
    getMessages,
    getMessage,
    deleteMessage,
    createMessage
}