module.exports = function UpdateAmbientName(app, DataUtils) {
    app.put('/ambients/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)
        if (result.success) {
            const { key, name } = req.body.data
            const { username } = req.params
            DataUtils.updateAmbientName(username, key, name, res)
        } else {
            res.json({ result })
        }
    })
}