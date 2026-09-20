import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve('./.env.dev') })
const port = process.env.PORT
const databaseUri = process.env.uri

export const env = {
    port,
    databaseUri
}

