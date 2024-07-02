import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import adminRoutes from "./routes/adminRoute.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"

dotenv.config({ path: "./.env" })
mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoute)
app.use("/api/user",userRoute)

app.use((err,req,res,next)=>{
console.log(err);
res.status(500).json({
    error:err.message || "something went wrong"
})
})

mongoose.connection.once("open",()=>{
    console.log(`server is running on http://localhost${process.env.PORT}`);
    app.listen(process.env.PORT || 5000,console.log("MONGO CONNECTED"))
})