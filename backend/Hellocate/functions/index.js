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

// Import the config file
const Config = require('./config.json')

// Import some usefull stuff and initialize them
const { DataUtils } = require('./utils/datautils')
const DataUtilities = new DataUtils(db, Config)

// Import app functions routes
const User = require('./routes/user/index')
const Ambient = require('./routes/ambient/index')

// Login
User.Login(app, Config, db, crypt, jwt)

// Register
User.Register(app, Config, db, crypt)

// Ambient
// Ambient.GetAmbient(app, Config, DataUtilities)
Ambient.AddAmbient(app, DataUtilities)

// export the function used by firebase
exports.api = functions.https.onRequest(main) //Note: to call this api you must use {baseurl}/api/v1/{function}