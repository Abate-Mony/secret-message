const express = require("express")
const router = express.Router()
const dashboardAuth = require("../middleware/dashboardAuth")
const { allUsers, singleUsers, allmessages } = require("../controller/Dashboard")
const login = require("../controller/DashboardLogin")
router.route("/allusers").get(dashboardAuth, allUsers)
router.route("/login").post(login)
router.route("/messages/:_id").get(dashboardAuth, allmessages)
router.route("/searchusers").get(dashboardAuth, singleUsers)

module.exports = router