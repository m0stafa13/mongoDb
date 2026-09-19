import express from 'express'
import { databaseConnect } from './database/connection.js'
const app = express()
const port = 3000
const client = await databaseConnect()
const database = client.db("C48")

const user = database.collection("users")
app.get("/", async (req, res) => {
    let data = await user.find().toArray()
    res.json(data)

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




// install and add env
//! install dotenv ==> npm i dotenv
