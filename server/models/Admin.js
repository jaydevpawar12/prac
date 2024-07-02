import mongoose from "mongoose"


const adminSchema = mongoose.Schema({
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

export default mongoose.models.admin || mongoose.model("admin", adminSchema)