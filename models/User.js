const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Message = require("../models/Message")
const { generatePassword, getUserId } = require("../generatePassword")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        minLength: 3,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        maxLength: 12
    },
    id: {
        type: String,
        required: [true, "please provide an id"],
        unique: true,
    }
})
UserSchema.pre("validate", async function(next) {
    this.password = generatePassword()
    this.id = getUserId()
    next()
})


UserSchema.methods.getName = async function() {
    const name = await this.name
    return name
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
UserSchema.methods.createJWT = async function() {
    const token = await jwt.sign({ userId: this._id, userName: this.name }, "secret", { expiresIn: "10d" })
    return token
}

module.exports = mongoose.model("User", UserSchema)