module.exports = function AddRoom(app, DataUtils) {
    app.post('/rooms/:username/', (req, res) => {
        const result = true // await DataUtils.TokenValidator.ValidateToken() idk if token validator is in the right place :D
        // TODO read auth

        if (result/*.success*/) {
            const roomData = req.body.data
            const { username } = req.params
            DataUtils.addRoom(username, roomData, res)
        }
        
    })
}