const { Schema, model } = require("mongoose")
const feedBack = Schema({
    createdBy: {
        type: Schema.ObjectId,
        ref: "User",
        required: [true, "please provide a updated"],
    },
    message: {
        type: String,
        required: [true, "please send a message"],
    },
    email: {
        type: String,
        required: [true, "please provide an email"]
    }
}, {
    timestamps: true
})


module.exports = model("Userfeed", feedBack)