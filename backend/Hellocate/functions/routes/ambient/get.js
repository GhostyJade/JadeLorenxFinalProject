module.exports = function GetAmbients(app, DataUtils) {
    app.get('/ambients/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)
        if (result.success) {
            const { username } = req.params
            DataUtils.getAllUserAmbients(username, res)
        } else {
            res.json({ result })
        }
    })
}