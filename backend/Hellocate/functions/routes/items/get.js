module.exports = function GetItems(app, DataUtils) {
    app.post('/items/:username/list', async (req, res) => {
        const result = await DataUtils.TokenValidator(req, res)
        if (result.success) {
            const { username } = req.params
            const { data } = req.body
            DataUtils.getAllUserItems(username, data, res)
        } else {
            res.json({ result })
        }
    })
}