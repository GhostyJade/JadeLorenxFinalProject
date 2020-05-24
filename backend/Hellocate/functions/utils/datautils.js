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
        res.json({ success, ambients })
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
        res.json({ success })
    }

    async deleteAmbient(username, ambientKey, res) {
        let success = true //maybe adding the callback and checking for error could solve always true?
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${ambientKey}`).remove()
        res.json({ success, key: ambientKey }) //if fails, send back the key anyway so the client app can notify the user (this should't never happen btw, it's always successful)
    }

    async updateAmbientName(username, ambientKey, newName, res) {
        let success = true
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${ambientKey}`).update({ name: newName }, (err) => { //here we make always true that ambientKey is already existent in the db
            if (err)
                success = false
        })
        res.json({ success, newName })
    }

    // End Ambient Data utils

    // Room Data utils:
    async addRoom(username, data, res) {
        let success = false
        let doesRoomExists = false
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${data.key}/${this.config.roomsCollection}`).once("value", snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    if (child.val().name === data.room.name) {
                        doesRoomExists = true
                        return;
                    }
                })
            }
        })
        if (!doesRoomExists) {
            await this.db.ref(`${this.config.ambientsCollection}/${username}/${data.key}/${this.config.roomsCollection}`).push(data.room)
            success = true
        }
        res.json({ success, roomName: data.room.name })
    }

    async getAllUserAmbientsAndRooms(username, res) {
        let success = false // idk which errors could happen, I should check later on... // TODO
        let ambients = []
        await this.db.ref(`${this.config.ambientsCollection}/${username}`).once("value", snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    ambients.push({ id: child.key, name: child.val().name, rooms: child.val().rooms })
                })
            }
        })
        success = true
        res.json({ success, ambients })
    }

    async deleteRoom(username, ambientKey, roomKey, res) {
        let success = true //maybe adding the callback and checking for error could solve always true?
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${ambientKey}/${this.config.roomsCollection}/${roomKey}`).remove()
        res.json({ success, ambientKey, roomKey }) //if fails, send back the key anyway so the client app can notify the user (this should't never happen btw, it's always successful)
    }

    async updateRoom(username, data, res) {
        let success = true
        await this.db.ref(`${this.config.ambientsCollection}/${username}/${data.ambientKey}/${this.config.roomsCollection}/${data.roomKey}`).update({ name: data.room.name, icon: data.room.icon }, (err) => { //here we make always true that ambientKey and roomKey are already existent in the db // TODO missing room/ambient.
            if (err)
                success = false
        })
        res.json({ success, room: { name: data.room.name, icon: data.room.icon } })
    }

    // End Room Data utils
}

module.exports = {
    DataUtils, TokenValidator
}