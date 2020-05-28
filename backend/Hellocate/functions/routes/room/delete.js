const { AddRoom } = require(".")

module.exports = function DeleteRoom(app, DataUtils) {
    app.delete('/rooms/:username', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)
        if (result.success) {
            const { ambientKey, roomKey } = req.body.data
            const { username } = req.params
            DataUtils.deleteRoom(username, ambientKey, roomKey, res)
        } else {
            res.json({ result })
        }
    })
}