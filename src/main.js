import express from 'express'
import { dbConnection } from './database/connection.js'
import { env } from './config/config.service.js'
import userRouter from './module/user/user.controller.js'

const app = express()
app.use(express.json())

// database connection 
const client = await dbConnection()
const database = client.db("C48")
export const userModel = database.collection("users")
// use user router 
app.use("/auth/users", userRouter)


app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))

// to make database uri and password and port number hide
// work with env files
// install and add env
//! install dotenv ==> npm i dotenv
