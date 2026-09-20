import { userModel } from "../../main.js"

export const getAllUsers = async () => {
    let data = await userModel.find().toArray()
    if (data.length > 0) {
        return {
            message: "users founded successfully",
            data
        }
    } else {
        return {
            message: "users not found"
        }
    }
}