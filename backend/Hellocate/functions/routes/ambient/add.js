module.exports = function AddAmbient(app, DataUtils) {
    app.post('/ambients/:username/', (req, res) => {
        const result = true // await DataUtils.TokenValidator.ValidateToken() idk if token validator is in the right place :D
        // TODO read auth

        if (result/*.success*/) {
            const ambientData = req.body.data
            const { username } = req.params
            DataUtils.addAmbient(username, ambientData, res)
        }
        
    })
}