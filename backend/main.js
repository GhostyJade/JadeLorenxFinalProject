const express = require('express')
const low = require('lowdb')
const cors = require('cors')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()

app.use(express.json())

const PORT = 8080

db.defaults({ users: [] }).write()

app.post('/users/', (request, response) => {
    const { data } = request.body
    console.log(data)
    let result = { status: true }
    if (!db.get("users").find({ username: data.username }).value() > 0)
        db.get("users").push(data).write()
    else
        result.status = false
    response.send(result)

})

app.listen(PORT, () => { console.log(`Started Hellocate backend on ${PORT}`) })