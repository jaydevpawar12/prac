import mongoose from "mongoose"


const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        reuired: true
    },
    desc: {
        type: String,
        reuired: true
    },
    adminId:{
        type:[mongoose.Types.ObjectId],
        ref:"admin"
    },
    userId:{
        type:[mongoose.Types.ObjectId],
        ref:"user"
    },

}, { timestamps: true })

export default mongoose.models.todo || mongoose.model("todo", todoSchema)