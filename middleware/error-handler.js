const customApiError = require("../error/custom-error")
const errorHandler = async(err, req, res, next) => {
    // console.log("enter here")
    console.log(err)
    if (err instanceof customApiError) {
        return res.status(500).json({ error: err.message })
    }
    res.status(500).send(err)
}
module.exports = errorHandler