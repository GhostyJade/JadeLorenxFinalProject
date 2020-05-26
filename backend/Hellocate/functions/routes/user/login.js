module.exports = function Login(app, Config, db, crypt, jwt) {
    app.post('/users/:username', async (req, res) => {
        const { username } = req.params
        const { password } = req.body

        let authenticated = false
        let token = null

        let user = undefined

        await db.ref(`${Config.usersCollection}/${username}/`).once("value", snapshot => {
            if (snapshot.exists()) {
                user = snapshot.val()
            }
        })

        if (user) {
            authenticated = await crypt.compare(password, user.password)
            if (authenticated) {
                token = jwt.sign({ username }, Config.SECRET_KEY, { expiresIn: '24h' })
            }
        }
        res.json({ authenticated, token })
    })
}