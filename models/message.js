const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    name: String,
    messages: Array,
    password: String,
    imgurl: Array
})
module.exports = mongoose.model("message", messageSchema)