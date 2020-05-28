module.exports = function AddItem(app, DataUtils) {
    app.post('/items/:username/', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)

        if (result.success) {
            const itemData = req.body.data
            const { username } = req.params
            DataUtils.addItem(username, itemData, res)
        } else {
            res.json({ result })
        }

    })
}