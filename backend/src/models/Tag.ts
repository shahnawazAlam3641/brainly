import mongoose from "mongoose"

const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})


const Tag = mongoose.model("Tag", tagSchema)

export default Tag