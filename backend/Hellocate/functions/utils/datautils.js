const TokenValidator = require('./tokenvalidator')

class DataUtils {
    constructor(dbInstance, config) {
        this.db = dbInstance
        this.config = config
    }

    // Ambient Data utils:
    async getAllUserAmbients(username, res) {
        let success = false // idk which errors could happen, I should check later on... // TODO
        let ambients = []
        await this.db.ref(`${this.config.ambientsCollection}/${username}`).once("value", snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    ambients.push({ id: child.key, name: child.val().name })
                })
            }
        })
        success = true
        res.send({ success, ambients })
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

    async deleteAmbient(username, ambientKey, res) {
        let success = true //maybe adding the callback and checking for error could solve always true?
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${ambientKey}`).remove()
        res.send({ success, key: ambientKey }) //if fails, send back the key anyway so the client app can notify the client (this should't never happen btw, it's always successful)
    }

    async updateAmbientName(username, ambientKey, newName, res) {
        let success = true
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${ambientKey}`).update({ name: newName }, (err) => { //here we make always true that ambientKey is already existent in the db
            if (err)
                success = false
        })
        res.send({ success, newName })
    }

    // End Ambient Data utils
}

module.exports = {
    DataUtils, TokenValidator
}