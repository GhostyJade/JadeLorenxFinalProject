const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')

const crypt = require('bcrypt')

admin.initializeApp(functions.config().firebase)

const app = express()
const main = express()

main.use('/v1/', app)
main.use(express.json())

const db = admin.database()
const usersCollection = "users/"

// register
app.post('/users/', async (req, res) => {

    const { username, usrPassword } = req.body.data
    const password = await crypt.hash(usrPassword, 8)

    let registered = false

    //this check if the username field exists and verify if the specified value exists in the db
    await db.ref(`${usersCollection}/${username}/username`).once("value", snapshot => {
        if (snapshot.exists()) {
            if (snapshot.val() === username)
                registered = true
        }
    })

    if (!registered)
        await db.ref(usersCollection + username).set({ username, password })

    res.send({ registered: !registered })
})

exports.api = functions.https.onRequest(main)
