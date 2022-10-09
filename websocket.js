const express = require("express")
const app = express()
const server = require("http").createServer(app)


const PORT = 3000

let httpServer = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const WebSocket = require("ws")
const wss = new WebSocket.Server({ server: httpServer })
wss.on("connection", function connection(ws) {
    console.log("new client connected")
    ws.send("welcome new client hahha")
    ws.on("message", function incoming(message) {
        console.log(`message from client is ${message}}`)
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log(message.toString())
                client.send(message.toString())
            }
        })
    })
})