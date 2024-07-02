import asyncHandler from "express-async-handler"
import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const adminDetails = await Admin.findOne({ email })
    if (adminDetails) {
        return res.status(500).json({
            error: "Email already exists",
        })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.status(201).json({
        message: "Admin registered successfully",
    })
})

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
        return res.status(401).json({
            error: "Invalid email or password",
        })
    }
    const verify = await bcrypt.compare(password, admin.password)
    if (!verify) {
        return res.status(401).json({
            error: "Invalid email or password",
        })
    }
    const token = jwt.sign({ userID: result._id }, process.env.JWT_KEY, { expiresIn: "1h" })
    req.cookies("admin", token, { httpOnly: true })
    res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
    })
})

export const logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.status(200).json({
        message: "Admin logged out successfully",
    })
})
export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({ error: "email not registered " })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ error: "invalid password" })
    }
    const token = jwt.sign({ userID: result._id }, process.env.JET_KEY, { expiresIn: "1h" })
    req.cookies("user", token, { httpOnly: true })
    res.status(200).json({
        message: "Login Successfully",
        result: {
            name: result.name,
            email: result.email
        }
    })
})
export const userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.status(200).json({ message: "Logout successfully" })
})