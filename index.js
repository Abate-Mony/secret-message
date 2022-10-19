const adminModel = require("./models/Dashboard")
const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 5000
require('dotenv').config();
require("express-async-errors")
    // var _uploadRouter = require('./routes/upload-route');
    // app.use('/fileupload', _uploadRouter);
    // express error handler functions 
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/error-handler")
    // router for routes
const fileupload = require("express-fileupload")
const uploadRouter = require("./routes/uploads")
const userRouter = require("./routes/User")
const auth = require("./middleware/auth")
const messageRouter = require("./routes/Message")
const clientFiles = path.resolve("./client")
const downloadRouter = require("./routes/download")
const feedbackRouter = require("./routes/feedBack")
const dashboard = require("./routes/Dashboard")
    // const dashboardAuth = require("./middleware/dashboardAuth")
app.use(fileupload())
app.use("/", express.static(clientFiles))
app.use("/dashboard", express.static(path.join(__dirname, "public")))
app.use(express.json())
    // routes here
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/message", auth, messageRouter)
app.use("/api/v1/upload", uploadRouter)
app.use("/api/v1/file", downloadRouter)
app.use("/api/v1/feedback", feedbackRouter)
app.use("/dashboard", dashboard)


app.use(errorHandler)
app.use(notFound)



const start = async() => {
    try {

        let httpServer = app.listen(port, () => {
            console.log(`App is listening on port ${port} `)
        })
        const WebSocket = require("ws")
        const wss = new WebSocket.Server({ server: httpServer })
        wss.on("connection", function connection(ws) {
            // console.log("new client connected")
            ws.send("welcome new client hahha")
            ws.on("message", function incoming(message) {
                // console.log(`${message}`)

                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        // console.log(message.toString())
                        client.send(message.toString())
                    }
                })
            })
        })

        require("./db/connections")
        await adminModel.deleteMany()
        await adminModel.create({
            password: "$admindashboard123$"
        }).then(data => {
            console.log("added successfully")
        }).catch(err => {
            console.log(err)
        })

    } catch (error) {
        console.log(error)
    }
}
start()