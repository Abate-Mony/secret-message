const db = require("./db/connections")
const adminModel = require("./models/Dashboard")
const start = async() => {
    try {
        await db()
        await adminModel.deleteMany()
        await adminModel.create({
            password: "$admindashboard123$"
        })
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}
start()