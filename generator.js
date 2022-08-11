const values = "1234567890"
const passcord = values.split("").map(() => values[Math.floor(Math.random() * values.length)]).slice(0, 6).join("")
console.log(passcord)
module.exports = passcord