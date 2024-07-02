import { Router } from "express";
import { getAllTodo } from "../controller/userController.js";


const router = Router()
router
    .get("/todo", getAllTodo)

export default router