module.exports = function AddAmbient(app, DataUtils) {
    app.post('/ambients/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)

        if (result.success) {
            const ambientData = req.body.data
            const { username } = req.params
            DataUtils.addAmbient(username, ambientData, res)
        } else {
            res.json({ result })
        }

    })
}