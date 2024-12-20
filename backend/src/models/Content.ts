import mongoose from "mongoose"

const contentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
    },
    type:{
        type:String,
        enum:["Twitter(X)", "Youtube","Document", "Link"]
    },
    tag:[{
        type:mongoose.Types.ObjectId,
        ref:"Tag"
    }]

},{timestamps:true})

const Content = mongoose.model("Content", contentSchema )

export default Content