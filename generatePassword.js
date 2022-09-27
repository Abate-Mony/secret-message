const passwordString = `1234567890abcdefghigklmnopqrstuvwxy`
const id = `1234567890`
const generatePassword = () => passwordString.split("").sort(() => 0.5 - Math.random()).slice(0, 5).join("")
const getUserId = () => id.split("").sort(() => 0.5 - Math.random()).slice(0, 4).join("")
    // console.log(generatePassword(), getUserId())
module.exports = {
    generatePassword,
    getUserId
}