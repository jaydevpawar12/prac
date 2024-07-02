import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        reuired: true
    }

}, { timestamps: true })

export default mongoose.models.user || mongoose.model("user", userSchema)