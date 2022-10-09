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
        minlength: [3, "please send a long message"],
        unique: true
    }
}, {
    timestamps: true
})
MessageSchema.post("save", function(doc) {
    console.log("%s document create with id ", doc._id)
})
module.exports = mongoose.model("Message", MessageSchema)