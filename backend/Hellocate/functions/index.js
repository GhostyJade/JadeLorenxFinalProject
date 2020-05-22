const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')

const crypt = require('bcrypt')

admin.initializeApp(functions.config().firebase)

const app = express()
const main = express()

main.use('/v1/', app)
main.use(express.json())

const db = admin.firestore()
const userCollection = 'users'

app.post('/users/', async (req, res) => {

    const { username, usrPassword } = req.body.data
    const password = await crypt.hash(usrPassword, 8)

    const result = await (db.collection(userCollection)).add({ username, password })

    res.send({ result, registered: true }) //check for errors, check if user already exists
})

exports.api = functions.https.onRequest(main)
