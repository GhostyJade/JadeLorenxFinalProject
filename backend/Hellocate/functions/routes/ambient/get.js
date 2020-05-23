module.exports = function GetAmbients(app, DataUtils) {
    app.get('/ambients/:username/', (req, res) => {
        const result = true//= await DataUtils.TokenValidator.ValidateToken()
        if (result) {//.success) {
            const { username } = req.params
            DataUtils.getAllUserAmbients(username, res)
        }
    })
}