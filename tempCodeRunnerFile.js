const express = require("express")
const app = express()
const PORT = 5000
const upload = require("express-fileupload")
    // const path = require("path")
const fs = require("fs")
const password = require("./generator")
const path = require("path")
const cors = require("cors")
app.use(express.json());
const bodyparser = require("body-parser")
app.use(cors())
const uri = 'mongodb://localhost:27017/message';
const Messages = require("./models/message.js")
const mongoose = require("mongoose")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
const connectWithDB = () => {
    mongoose.connect(uri, options, (err, db) => {
        if (err) console.error(err);
        else console.log("database connection")
    })
}
connectWithDB()
app.use(upload())

function middleware(req, res) {
    if (1 == 31) {
        next()
    } else {
        console.log("done with the taske")
        res.send("fail to authenticate user here")
    }
}
app.get("/middleware/ware", middleware, (req, res) => {
    res.send("middle ware code here")
        // next()
})
app.post("/update", (req, res) => {
    const { _id, message } = req.body
    Messages.findById({ _id }).then(user => {
        const { messages, _id } = user
        messages.push(message)
        Messages.findByIdAndUpdate({ _id }, { messages }).then(
            result => {
                console.log("updated user messages")
                res.status(200).send({ bool: true })
            }
        ).catch(err => {
            console.log("fail to update user messages")
            res.status(401).send("fail to update user message")
        })

    }).catch(err => {
        console.log("fail to find user")
        res.sendStatus(404)
    })
})
app.get("/:id", (req, res) => {
    const { id } = req.params
    console.count(console.log(id, "62f1f0c3aa7fdbfb105c3841"))

    Messages.findById({ _id: id }).then(user => {
        if (user) {
            const { _id, messages, name, password } = user
            console.log("enter here god")
            res.send({ messages, name, password })
        } else {
            res.sendStatus(404)
            console.log(404)
        }
    }).catch(fail => {
        console.log(fail)
        res.sendStatus(404)
        console.log("fail to enter the search bar here")
    })

})
app.post("/delete/user", (req, res) => {
    const { id } = req.body
    console.log(id)
    Messages.findByIdAndDelete({ _id: id }).
    then(deleted => {
        console.log("user  deleted")
        Messages.find({}).then(users => {
            res.json({ users })
        }).catch(nousers => {
            res.status(404)
        })
    }).catch(notdeleted => {
        res.send("user not found!")
        console.log("fail to delete")
    })
})
app.get("/all/users", (req, res) => {
    Messages.find({}).then(users => {
        res.json({ users })
    }).catch((nousers) => {
        res.status(404)
    })
})


app.post("/login", (req, res) => {
    const { id, password } = req.body
    Messages.findOne({ _id: id, password: password }).then(user => {
        console.log(user.password, user._id)
        res.send({ id }).sendStatus(200)
    }).catch(nouser => {
        // res.sendStatus(404)
        console.log("fail to login user because the user inported a wrong password ")
    })


})
app.get("get/files", (req, res) => {
    const images = []
    fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
        if (err) {
            console.log(err)

        } else {
            for (let file of files) {
                images.push(`http://localhost/images/${file}`)
            }
            res.send({ images })
        }
    })
})
app.get("/images/:name", (req, res) => {
    const name = req.params.name
    const _filepath = path.join(__dirname, "upload", name)
    res.sendFile(_filepath)
})
app.post("/file", (req, res) => {
    const id = "469038897"
    if (req.files) {
        var file = req.files.file
        var filename = file.name
            // console.log(filename)
        const _lenght = filename.split(".").length - 1
        const filenamewithoutextension = filename.split(".").map((_, index) => {
            if (index != _lenght) {
                return _
            }
        }).join("")
        const fileextension = filename.split(".")[_lenght]
        file.mv('./uploads/' + `${id}#${password}.${fileextension}`, function(err) {
            if (err) {
                console.log(err)
                    // res.send(err)
                res.send("fail to upload file")
            } else {
                fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
                    if (err) {
                        console.log(err)

                    } else {
                        for (let file of files) {
                            console.log(file)
                        }
                    }
                })
                console.log("move to folder")
                res.send("file uploaded ")
            }
        })
    }
})

app.post("/", (req, res) => {
    const name = req.body.name
    const newuser = new Messages({
        name,
        messages: [],
        password
    })
    newuser.save().then(result => {
        console.log(result)
        const { _id } = result
        res.send({ id: _id })
    }).catch(err => {
        console.log(err, "failure here")
        res.status(500).send('Internal Server Error')
    })

})

app.delete("/delete/message", (req, res) => {
    const { id, messages } = req.body

    Messages.findOneAndUpdate({ _id: id }, { messages }).then(message => {
        console.log(message)
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(404)
    })
})
app.listen(PORT, () => {
    console.log("app is running on port ", PORT)
})