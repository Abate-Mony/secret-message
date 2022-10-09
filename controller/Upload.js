const Message = require("../models/Message")
const User = require("../models/User")
const { BadErrorRequest } = require("../error")
const path = require("path")





module.exports = {
    upload: upload = async(req, res) => {
        const id = req.params.id
        const isUser = await User.findOne({ _id: id })
        if (!isUser) {
            throw new BadErrorRequest("the user does exist try again later")
        }
        if (req.files) {
            var file = req.files.file
            console.log(file)
            var filename = file.name
            const fileextension = path.extname(filename)
            const extensions = [".jpeg", ".jpg", ".jfif", ".png"]
            const absolutePath = path.resolve(__dirname, "../uploads")
            if (extensions.includes(fileextension)) {
                const date = Date.now()
                file.mv(absolutePath + `\\${id}_${date}${fileextension}`, function(err) {
                    if (err) {
                        console.log(err)
                        return res.send(`/upload.file.html?${id}`)
                    } else {
                        console.log("move to folder")
                        return res.status(200).json({ msg: "file uploaded successfully" })
                    }
                })
            } else {
                throw new BadErrorRequest("Please send a file")
            }



        } else {
            throw new BadErrorRequest("server error")
        }
    },
    createMessage: createMessage = async(req, res) => {
        await Message.init()
        const { id } = req.params
        const message = req.body.message
        const isUser = await User.findOne({ _id: id })
            // console.log(isUser)
        if (!isUser) { throw new BadErrorRequest("user is not found") }
        const msg = await Message.create({
            sentTo: id,
            message
        })
        res.status(200).json({ msg: msg })


    }
}