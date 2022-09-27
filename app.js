const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 5000
require('dotenv').config();
require("express-async-errors")

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
app.use(fileupload())
app.use("/", express.static(clientFiles))
app.use(express.json())

app.use("/api/v1/auth", userRouter)
app.use("/api/v1/message", auth, messageRouter)
app.use("/api/v1/upload", uploadRouter)
app.use("/api/v1/file", downloadRouter)

app.get("/attack", (req, res) => {
    console.log(res)
    res.status(200)
})

app.use(errorHandler)
app.use(notFound)

// start the server function
const start = async() => {
    try {
        app.listen(port, () => {
            console.log(`App is listening on port ${port} `)
        })
        require("./db/connections")

    } catch (error) {
        console.log(error)
    }
}
start()