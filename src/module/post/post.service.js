import { ObjectId } from "mongodb"
import { postModel, userModel } from "../../main.js"
import { catchError, successRes, wrongRes } from "../user/user.service.js";
// add new post to author
export const createPost = async (body) => {
    let { content, author, category, title } = body
    try {
        let checkAuthor = await userModel.findOne({ _id: new ObjectId(author) })
        if (checkAuthor) {
            let writePost = await postModel.insertMany([{ title, category, content, author: new ObjectId(author) }])
            if (writePost.insertedCount > 0) {
                return await successRes(201, "post added successfully", writePost.insertedIds)
            } else {
            }
            return await wrongRes(404, "something went wrong")
        } else {
            return await wrongRes(404, "author is not found")
        }
    } catch (error) {
        return await catchError(404, {
            message: "wrong input",
            rule: "all data req in correct way"
        })
    }
}
// return all posts  with author
export const getAllPosts = async () => {
    let data = await postModel.aggregate([{
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "users"
        }
    }]).toArray()
    if (data.length > 0) {
        return await successRes(200, "posts found successfully ", data)
    } else {
        return await wrongRes(404, "no posts found")
    }
}
// get posts only
export const getPosts = async () => {
    let posts = await postModel.find().toArray()
    if (posts.length > 0) {
        return await successRes(200, "posts found successfully", posts)
    } else {
        return await wrongRes(404, "no posts found")
    }
}
// delete post
export const deletePost = async (id) => {
    let checkPost = await postModel.findOne({ _id: new ObjectId(id) })
    if (checkPost) {
        let del = await postModel.deleteOne({ _id: new ObjectId(id) })
        return successRes(200, "post deleted successfully", null)
    } else {
        return wrongRes(404, "post not found ")
    }
}
// update post
export const updatePost = async (id, newData) => {
    let { title, content, category } = newData
    let setData = {}
    title ? setData.title = title : null
    content ? setData.content = content : null
    category ? setData.category = category : null
    let findPost = await postModel.findOne({ _id: new ObjectId(id) })
    if (findPost) {
        let updatedPost = await postModel.updateOne({ _id: new ObjectId(id) }, { $set: setData })
        if (updatedPost.modifiedCount > 0) {
            return await successRes(200, "post updated  successfully", null)
        } else {
            return await wrongRes(200, "change data and try again")
        }
    } else {
        return wrongRes(404, "post not found")
    }
}
// get post by id
export const getPostById = async ({ id }) => {
    try {
        let getPost = await postModel.findOne({ _id: new ObjectId(id) })
        if (getPost) {
            return await successRes(200, "user found successfully", getPost)
        } else {
            return await wrongRes(404, "post not found")
        }
    } catch (error) {
        return catchError(404, "invalid data input")
    }
}


