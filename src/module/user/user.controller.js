import { Router } from "express";
import { addUser, getAllUsers, getUserById, updateUser } from "./user.service.js";

const router = Router()
// get all users 
router.get("/get-all-users", async (req, res) => {
    let { code, data } = await getAllUsers()
    res.status(code).json(data)
})
// find user by id 
router.get("/get-user/:id", async (req, res) => {
    let { code, data } = await getUserById(req.params)
    res.status(code).json(data)
})
// add new user
router.post("/add-new-user", async (req, res) => {
    let { data, code } = await addUser(req.body)
    res.status(code).json(data)
})
// update user  
router.put("/update-user/:id", async (req, res) => {
    let { code, data } = await updateUser(req.params, req.body)
    res.status(code).json(data)
})


export default router