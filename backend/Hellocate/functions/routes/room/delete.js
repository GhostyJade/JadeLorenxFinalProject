const { AddRoom } = require(".")

module.exports = function DeleteRoom(app, DataUtils) {
    app.delete('/rooms/:username', (req, res) => {
        const result = true//= await DataUtils.TokenValidator.ValidateToken()
        if (result) {//.success) {
            const { ambientKey, roomKey } = req.body.data
            const { username } = req.params
            DataUtils.deleteRoom(username, ambientKey, roomKey, res)
        }
    })
}