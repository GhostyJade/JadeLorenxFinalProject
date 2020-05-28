// Include all the required modules
const functions = require('firebase-functions')
const admin = require('firebase-admin')

const crypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')

const cors = require('cors')

// Initializes the backend 
admin.initializeApp(functions.config().firebase)

const app = express()
const main = express()

main.use('/v1/', app)
main.use(express.json())
main.use(cors())

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
const Room = require('./routes/room/index')
const Item = require('./routes/items/index')

// Login
User.Login(app, Config, db, crypt, jwt)

// Register
User.Register(app, Config, db, crypt)

// Ambient
Ambient.GetAmbients(app, DataUtilities)
Ambient.AddAmbient(app, DataUtilities)
Ambient.DeleteAmbient(app, DataUtilities)
Ambient.UpdateAmbientName(app, DataUtilities)

// Room
Room.AddRoom(app, DataUtilities)
Room.GetAmbientsAndRooms(app, DataUtilities)
Room.DeleteRoom(app, DataUtilities)
Room.UpdateRoom(app, DataUtilities)

//Item
Item.AddItem(app, DataUtilities)

// export the function used by firebase
exports.api = functions.https.onRequest(main) //Note: to call this api you must use {baseurl}/api/v1/{function}