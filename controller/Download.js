const fs = require('fs')
const path = require('path')




const image = async(req, res) => {
    const name = req.params.name
    const fp = path.resolve(__dirname, "../uploads", name)
    res.sendFile(fp, (err) => {
        if (err) {
            throw new BadErrorRequest("something went wrong")
        }
        console.log("send file to client")
    })
}
const images = async(req, res) => {
    const id = req.userInfo.userId
    const fp = path.resolve(__dirname, "../uploads/")
    const userFiles = []
    try {
        const files = fs.readdirSync(fp)
        for (let file of files) {
            if (file.includes(id)) {
                userFiles.push(`/api/v1/images/${file}`)
            }
        }
    } catch (error) {
        console.log(error)
        throw new BadErrorRequest("something went wrong")
    }
}
module.exports = {
    images,
    image
}