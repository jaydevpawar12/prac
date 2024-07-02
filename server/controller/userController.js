import asyncHandler from "express-async-handler"
import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const getAllTodo = asyncHandler(async (req, res) => {
    const x = await User.findById(req.body.userId)
    const result = await Todo.find({ userId: x.userId })
    console.log(req.body);
    res.status(200).json({ message: "Todo add success", result })
})