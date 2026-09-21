import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPostById, getPosts, updatePost } from "./post.service.js";

const router = Router()
// crate new post 
router.post("/crate-post", async (req, res) => {
    let { code, data } = await createPost(req.body)
    res.status(code).json(data)
})
// get all posts with author 
router.get("/get-all-posts", async (req, res) => {
    let data = await getAllPosts()
    res.json(data)
})
// get all posts
router.get("/get-posts", async (req, res) => {
    let { data, code } = await getPosts()
    res.status(code).json(data)
})
// delete post by id 
router.delete("/delete-post/:id", async (req, res) => {
    let { id } = req.params
    let { code, data } = await deletePost(id)
    res.status(code).json(data)
})
// update post by id 
router.put("/update-post/:id", async (req, res) => {
    let { id } = req.params
    let { code, data } = await updatePost(id, req.body)
    res.status(code).json(data)
})
// find post by id 
router.get('/find-post/:id', async (req, res) => {
    let { code, data } = await getPostById(req.params)
    res.status(code).json(data)
})

// handle wrong path
router.all("/*path", (req, res) => {
    res.status(404).json({
        message: "path not found"
    })
})






export default router