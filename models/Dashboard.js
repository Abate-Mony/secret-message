const mongoose = require("mongoose")

const DashboardSchema = new mongoose.Schema({
        password: {
            type: String,
            require: [true, "please provide a password"]
        }
    })
    // module.exports = mongoose.model("Dashboard", DashboardSchema)
let dashboard
try {
    dashboard = mongoose.model("Dashboard")
} catch (error) {
    dashboard = mongoose.model("Dashboard", DashboardSchema)
}
module.exports = dashboard