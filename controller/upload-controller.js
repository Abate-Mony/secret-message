var multer = require('multer');
var uploadMiddleware = require('../middleware/upload-middleware');
const path = require("path")
const filepath = path.resolve(__dirname, "../views/form.html")
console.log(filepath)
module.exports = {
    uploadForm: function(req, res) {
        res.sendFile(filepath, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log("file upload successfully!!!")
        })
    },
    uploadFiles: function(req, res) {
        var upload = multer({
            storage: uploadMiddleware.files.storage(),
            allowedFiles: uploadMiddleware.files.allowedFiles
        }).single('files');
        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
            } else if (err) {
                res.send(err);
            } else {
                // res.render('upload-form');
                res.sendFile(filepath, (err) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    console.log("file upload successfully!!!11")
                })
            }

        })

    }
}