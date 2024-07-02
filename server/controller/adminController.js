import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import Todo from "../models/Todo.js"

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const userDetails = await User.findOne({ email })
    if (userDetails) {
        return res.status(500).json({
            error: "Email already exists"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hash })
    res.status(201).json({
        message: "User Register Successfully"
    })
})
export const getAllUser = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.status(200).json({
        message: "user get successfully",
        result
    })
})
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    const hash = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(id, { ...req.body, password: hash })
    res.status(200).json({
        message: "User Update Success"
    })
})
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message: "delete Success"
    })
})




export const addTodo = asyncHandler(async (req, res) => {
    await Todo.create({ ...req.body })
    res.status(200).json({
        message: "Add Todo Success"
    })
})
export const getTodo = asyncHandler(async (req, res) => {
    const result = await Todo.find().populate('user')
    res.status(200).json({
        message: "get todo success",
        result
    })
})
export const updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndUpdate(id,req.body)
    res.status(200).json({
        message :"update Todo success"
    })
})
export const deleteTodo = asyncHandler(async(req,res)=>{
    const {id}=req.params
    await Todo.findByIdAndDelete(id)
    res.status(200).json({
        message:"delete success"
    })
})
