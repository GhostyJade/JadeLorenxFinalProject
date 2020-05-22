const jwt = require('jsonwebtoken')

module.exports = async function ValidateToken(req, res) {
    const token = req.headers['x-access-token']

    var errorCode = 200
    var success = true

    if (!token) {
        errorCode = 403
        success = false
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                errorCode = 403
                success = false
            }
        })
    }
    return { success, errorCode }
}