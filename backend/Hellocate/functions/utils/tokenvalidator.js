const jwt = require('jsonwebtoken')

const Config = require('../config.json') //TODO use the global config instance

module.exports = async function ValidateToken(req, res) {
    const token = req.headers['x-access-token']

    var errorCode = 200
    var success = true

    if (!token) {
        errorCode = 403
        success = false
    } else {
        jwt.verify(token, Config.SECRET_KEY, (err, decoded) => {
            if (err) {
                errorCode = 403
                success = false
            }
        })
    }
    return { success, errorCode }
}