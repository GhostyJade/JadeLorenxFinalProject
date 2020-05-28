module.exports = function AddRoom(app, DataUtils) {
    app.post('/rooms/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)

        if (result.success) {
            const roomData = req.body.data
            const { username } = req.params
            DataUtils.addRoom(username, roomData, res)
        } else {
            res.json({ result })
        }

    })
}