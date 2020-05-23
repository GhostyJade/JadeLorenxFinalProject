module.exports = function DeleteAmbient(app, DataUtils) {
    app.delete('/ambients/:username/', (req, res) => {
        const result = true//= await DataUtils.TokenValidator.ValidateToken()
        if (result) {//.success) {
            const { key } = req.body.data
            const { username } = req.params
            DataUtils.deleteAmbient(username, key, res)
        }
    })
}