module.exports = function UpdateAmbientName(app, DataUtils) {
    app.put('/ambients/:username/', (req, res) => {
        const result = true//= await DataUtils.TokenValidator.ValidateToken()
        if (result) {//.success) {
            const { key, name } = req.body.data
            const { username } = req.params
            DataUtils.updateAmbientName(username, key, name, res)
        }
    })
}