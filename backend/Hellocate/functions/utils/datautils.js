const TokenValidator = require('./tokenvalidator')

class DataUtils {
    constructor(dbInstance, config) {
        this.db = dbInstance
        this.config = config
    }

    // Ambient Data utils:
    getAllUserAmbients(username) {

    }

    async addAmbient(username, data, res) {
        let doesAmbientExists = false
        let success = false
        await this.db.ref(`${this.config.ambientsCollection}/${username}`).once("value", snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    if (child.val().name === data.name) {
                        doesAmbientExists = true
                        return
                    }
                })
            }
        })
        if (!doesAmbientExists) {
            await this.db.ref(`${this.config.ambientsCollection}/${username}`).push(data)
            success = true
        }
        res.send({ success })
    }

    // End Ambient Data utils
}

module.exports = {
    DataUtils, TokenValidator
}