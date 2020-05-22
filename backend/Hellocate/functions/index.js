// Include all the required modules
const functions = require('firebase-functions')
const admin = require('firebase-admin')

const crypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')

// Initializes the backend 
admin.initializeApp(functions.config().firebase)

const app = express()
const main = express()

main.use('/v1/', app)
main.use(express.json())

// Creates the database reference
const db = admin.database()
const usersCollection = "users"

// Import the config file
const Config = require('./config.json')

//login
app.post('/users/:username', async (req, res) => {
    const { username } = req.params
    const { password } = req.body

    let authenticated = false
    let token = null

    let user = undefined

    await db.ref(`${usersCollection}/${username}/`).once("value", snapshot => {
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
    res.send({ authenticated, token })
})

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

// export the function used by firebase
exports.api = functions.https.onRequest(main) //Note: to call this api you must use {baseurl}/api/v1/{function}
