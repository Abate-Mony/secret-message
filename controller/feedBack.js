const feedBack = require("../models/UserFeed.js")
const feedback = async(req, res) => {
    const { userId } = req.userInfo
    const { Email, Message } = req.body
    console.log(req.body)
    const newFeedback = await feedBack.create({
        createdBy: userId,
        message: Message,
        email: Email
    })
    if (!newFeedback) {
        const error = new Error("fail to sent feedback")
        error.code = 500
        throw new error
    }
    res.status(200).json({ status: true })
}
module.exports = feedback