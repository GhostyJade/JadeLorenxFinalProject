module.exports = function Register(app, Config, db, crypt) {
    app.post('/users/', async (req, res) => {

        const { username, usrPassword } = req.body.data
        const password = await crypt.hash(usrPassword, 8)

        let registered = false

        //this check if the username field exists and verify if the specified value exists in the db
        await db.ref(`${Config.usersCollection}/${username}/username`).once("value", snapshot => {
            if (snapshot.exists()) {
                if (snapshot.val() === username)
                    registered = true
            }
        })

        if (!registered)
            await db.ref(Config.usersCollection + username).set({ username, password })

        res.send({ registered: !registered })
    })
}