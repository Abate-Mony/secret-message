const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const upload = require("express-fileupload")
const fs = require("fs")
const password = require("./generator")
const path = require("path")
const cors = require("cors")
app.use(express.json());
const bodyparser = require("body-parser")
app.use(cors())
const dburl = "mongodb+srv://abate:Bewr5jdodSSpk06f@message.3qbzzy5.mongodb.net/?retryWrites=true&w=majority"
const uri = 'mongodb://localhost:27017/message';
const Messages = require("./models/User.js")
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
    // navigator.onLine
connectWithDB()
app.use(upload())

app.use("/client", express.static("client"))
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
    Messages.findById({ _id: id }).then(user => {
        if (user) {
            const { _id, messages, name, password } = user
            return res.send({ messages, name, password })

        } else {
            res.status(404).json({ msg: "error occured" })
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
        console.log(user.password, user.name, user.id)
        res.status(200).send({ id })
    }).catch(nouser => {
        console.log("fail to login user because the user!!!")
        return res.status(404).json({ error: "fail to find user" })
    })

})
app.get("/download/img/:name", (req, res) => {
    const { name } = req.params
    fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
        if (err) {
            console.log(err)

        } else {
            var flag = false
            for (let file of files) {
                if (file == name) {
                    console.log("enter here")
                    res.download(path.join(__dirname, "uploads", file))
                    flag = true
                    break;
                }
            }
            if (!flag) {
                res.sendStatus(404)
            }
        }
    })
})
app.get("/get/files/:id", (req, res) => {
    const images = []
    const id = req.params.id
    fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
        if (err) {
            console.log(err)
        } else {
            for (let file of files) {
                const imgextensions = ["jpeg", "jpg", "jfif", "png"]
                if (imgextensions.some(ex => file.includes(ex)) && file.includes(id)) {
                    images.push(`http://localhost:5000/images/${file}`)
                }
            }
            res.send({ images })
        }
    })
})

app.get("/images/:name", (req, res) => {
    const name = req.params.name
    const _filepath = path.join(__dirname, "uploads", name)
    res.sendFile(_filepath)
})
let counter = 30
app.post("/file/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    if (req.files) {
        var file = req.files.file
        var filename = file.name
        const _lenght = filename.split(".").length - 1
        const filenamewithoutextension = filename.split(".").map((_, index) => {
            if (index != _lenght) {
                return _
            }
        }).join("")
        const fileextension = filename.split(".")[_lenght]
        const _extensions = ["jpeg", "jpg", "jfif", "png", "mp3", "wav"]
        if (_extensions.some(ext => ext == fileextension)) {
            file.mv('./uploads/' + `${id}_${++counter}.${fileextension}`, function(err) {
                if (err) {
                    console.log(err)
                    return res.send(`/upload.file.html?${id}`)
                } else {
                    console.log("move to folder")
                    return res.status(200).json({ msg: "file uploaded successfully" })
                }
            })
        } else {
            return res.status(500).json({ msg: "something went wrong" })
        }
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
app.delete("/delete/file/:name", (req, res) => {
    const name = req.params.name
    fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
        if (err) {
            consol.log(err)
            res.send("failed to read folder")
            return
        } else {
            for (let file of files) {
                if (file == name) {
                    fs.unlink(path.join(__dirname, "uploads", file), (err) => {
                        if (err) console.log(err);
                        console.log(`${file} was deleted`);
                    });
                }
            }
            console.log("filed deleted")
            res.send("file deleted ")
        }
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
app.use((req, res) => {
    res.send("<h1> UNKNOW ROUTE  </h2> ")
})
app.listen(PORT, () => {
    console.log("app is running on port ", PORT)
})