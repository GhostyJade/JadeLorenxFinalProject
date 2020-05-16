require('dotenv').config()

const express = require('express')
const low = require('lowdb')
const cors = require('cors')
const FileSync = require('lowdb/adapters/FileSync')

const crypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8080

db.defaults({ users: [] }).write()

app.post("/users/:username", async (req, res) => {
    const { username } = req.params
    const { password } = req.body

    const user = db.get("users").find({ username: username }).value()
    if (user) {
        const authenticated = await crypt.compare(password, user.password)
        let token
        if (authenticated) {
            token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '24h' })
        } else {
            token = null
        }
        res.send({ authenticated, token })
    }
})


app.post('/users/', async (req, res) => {
    const { username, usrPassword } = req.body.data
    let result = { registered: true }

    const password = await bcrypt.hash(usrPassword, 8)
    if (!db.get("users").find({ username: username }).value() > 0) {
        const data = {
            username,
            password
        }
        db.get("users").push(data).write()
    }
    else
        result.registered = false
    res.send({result, username})

})

app.listen(PORT, () => { console.log(`Started Hellocate backend on ${PORT}`) })