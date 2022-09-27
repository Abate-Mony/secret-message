const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    sentTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: [true, "please provide a sentto"],

    },
    message: {
        type: String,
        require: [true, "please provide a message"],
        minlength: [3, "please send a long message"]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Message", MessageSchema)