import { MongoClient } from "mongodb"
import { env } from "../config/config.service.js";

export const dbConnection = async () => {
    try {

        const client = new MongoClient(env.databaseUri)
        console.log("db connected successfully...");
        return client
    } catch (error) {
        console.log(error);
    }
}