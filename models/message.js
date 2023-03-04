const { model, Schema } = require("mongoose")

const MessageSchema = new Schema({
    sentTo: {
        type: Schema.ObjectId,
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
const messageModel = model("Message", MessageSchema)
module.exports = messageModel