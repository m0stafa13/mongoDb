import express from 'express'
import { dbConnection } from './database/connection.js'
import { env } from './config/config.service.js'
import userRouter from './module/user/user.controller.js'
import postRouter from './module/post/post.controller.js'

const app = express()
app.use(express.json())

// database connection 
const client = await dbConnection()
const database = client.db("C48")
// user model 
export const userModel = database.collection("users")
// post model
export const postModel = database.collection("posts")
// use user router 
app.use("/auth/users", userRouter)
// posts router 
app.use("/posts", postRouter)

app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))

// to make database uri and password and port number hide
// work with env files
// install and add env
//! install dotenv ==> npm i dotenv
