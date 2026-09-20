import express from 'express'
import { dbConnection } from './database/connection.js'
import { env } from './config/config.service.js'

const app = express()
const port = 3000


const client = await dbConnection()
const database = client.db("C48")
const users = database.collection("users")
app.get('/', async (req, res) => {
    const data = await users.find().toArray()
    res.json(data)
})
app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))

// to make database uri and password and port number hide
// work with env files
// install and add env
//! install dotenv ==> npm i dotenv
 