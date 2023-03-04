const Message = require("../models/Message.js")
const User = require("../models/User")
const { BadErrorRequest } = require("../error")
    // const path = require("path")





module.exports = {

    createMessage: createMessage = async(req, res) => {
        // await Message.init()
        const { id } = req.params
        const message = req.body.message
        const isUser = await User.findOne({ _id: id })
            // console.log(isUser)
        if (!isUser) { throw new BadErrorRequest("user is not found") }
        const msg = await Message.create({
            sentTo: id,
            message
        })
        res.status(200).json({ msg: msg })


    }
}