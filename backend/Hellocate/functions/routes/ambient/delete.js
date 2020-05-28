module.exports = function DeleteAmbient(app, DataUtils) {
    app.delete('/ambients/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)
        if (result.success) {
            const { key } = req.body.data
            const { username } = req.params
            DataUtils.deleteAmbient(username, key, res)
        } else {
            res.json({ result })
        }
    })
}