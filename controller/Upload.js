const User = require("../models/User");
const Message = require("../models/Message.js");
const { BadErrorRequest } = require("../error")

module.exports = {
    createMessage: createMessage = async(req, res) => {
        const { id } = req.params
        const message = req.body.message
        const isUser = await User.findOne({ _id: id })
        if (!isUser) { throw new BadErrorRequest("user is not found") }
        const msg = await Message.create({
            sentTo: id,
            message
        })
        res.status(200).json({ msg: msg })

    }
}