const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')

const crypt = require('bcrypt')
const jwt = require('jsonwebtoken')

admin.initializeApp(functions.config().firebase)

const app = express()
const main = express()

main.use('/api/v1', app)
main.use(express.json())

const db = admin.firestore()
const userCollection = 'users'

class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}

//register
app.post('/users/', async (req, res) => {
    const { username, usrPassword } = req.body.data
    let result = { registered: true }

    const password = await crypt.hash(usrPassword, 8)

    const newUser = await db.collection(userCollection).add(new User(username, password)) //TODO check if user already exists

    if (!newUser) {
        result.registered = false
    }

    res.send({ result, username })
})

exports.webApi = functions.https.onRequest(main)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

