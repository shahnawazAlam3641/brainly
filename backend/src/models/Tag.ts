import mongoose from "mongoose"

const tagSchema = new mongoose.Schema({
    tag:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true})


const Tag = mongoose.model("Tag", tagSchema)

export default Tag