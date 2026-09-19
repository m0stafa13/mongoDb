import { MongoClient } from "mongodb";

export const databaseConnect = async () => {
    try {
        const uri = "mongodb://localhost:27017"
        const client = new MongoClient(uri)
        console.log("database connected successfully");
        return client
    } catch (error) {
        console.log(error);
    }
}