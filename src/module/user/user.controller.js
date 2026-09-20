import { Router } from "express";
import { getAllUsers } from "./user.service.js";

const router = Router()

router.get("/get-all-users", async (req, res) => {
    let data = await getAllUsers()
    res.json(data)
})


export default router