module.exports = function UpdateRoom(app, DataUtils) {
    app.put('/rooms/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)
        if (result.success) {
            const { data } = req.body
            const { username } = req.params
            DataUtils.updateRoom(username, data, res)
        } else {
            res.json({ result })
        }
    })
}