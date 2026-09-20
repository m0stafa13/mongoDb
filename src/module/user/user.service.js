import { ObjectId } from "mongodb"
import { userModel } from "../../main.js"
// return to success operation 
export const successRes = async (code, message, returnedData) => {
    return {
        code, data: {
            message,
            returnedData
        }
    }
}
// fun to return if wrong response 
export const wrongRes = async (code, message) => {
    return {
        code, data: {
            message
        }
    }
}
// catch error function 
export const catchError = async (code, error) => {
    console.log(error, "from fund");
    return {
        code, data: {
            error
        }
    }
}

// CRUD 
// get all users
export const getAllUsers = async () => {
    let data = await userModel.find().toArray()
    if (data.length > 0) {
        return await successRes(200, "all users found successfully", data)
    } else {
        return await wrongRes(404, "no users founded")
    }
}
// get user by id 
export const getUserById = async ({ id }) => {
    try {
        const data = await userModel.findOne({ _id: new ObjectId(id) })
        if (data) {
            return await successRes(200, "user found successfully", data)
        } else {
            return await wrongRes(404, "user not found")
        }
    } catch (error) {
        return await catchError(404, "invalid data enter correct id")
    }
}
// add new user 
export const addUser = async (body) => {
    let { email, password, name, phone } = body
    let checkUser = await userModel.findOne({ email: email })
    if (!checkUser) {
        let addedUser = await userModel.insertMany([{ email, password, name, phone }])
        if (addedUser.insertedCount > 0) {
            return await successRes(201, "user added successfully")
        } else {
            return await wrongRes(404, "something went wrong")
        }
    } else {
        return await wrongRes(409, "user already exists")
    }
}
//update user using id 
export const updateUser = async (id, body) => {
    const { name, email, password, phone } = body
    console.log(name, email, password, phone);


    let updatedData = {}
    name ? updatedData.name = name : null
    email ? updatedData.email = email : null
    password ? updatedData.password = password : null
    phone ? updatedData.phone = phone : null
    const checkUser = await userModel.findOne({ _id: new ObjectId(id) })
    if (checkUser) {
        let updatedUser = await userModel.updateOne({ _id: new ObjectId(id) }, { $set: updatedData })
        console.log(updatedUser);

        if (updatedUser.modifiedCount > 0) {
            return await successRes(200, "user updated successfully", updatedData)
        } else {
            return await wrongRes(404, "data is Similar")
        }
    } else {
        return await catchError(404, "user not found")
    }
}