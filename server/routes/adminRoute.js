import { Router } from "express";
import {
    addTodo,
    deleteTodo,
    deleteUser,
    getAllUser,
    getTodo,
    registerUser,
    updateTodo,
    updateUser
} from "../controller/adminController.js";


const router = Router()
router
    .post("/user/register", registerUser)
    .get("/user", getAllUser)
    .put("/user/update/:id", updateUser)
    .delete("/user/delete/:id", deleteUser)

    .post("/todo/register", addTodo)
    .get("/todo", getTodo)
    .put("/todo/update/:id", updateTodo)
    .delete("/todo/delete/:id", deleteTodo)

export default router