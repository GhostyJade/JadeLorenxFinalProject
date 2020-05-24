module.exports = function UpdateRoom(app, DataUtils){
    app.put('/rooms/:username/', (req, res) => {
        const result = true//= await DataUtils.TokenValidator.ValidateToken()
        if (result) {//.success) {
            const { data } = req.body
            const { username } = req.params
            DataUtils.updateRoom(username, data, res)
        }
    })
}