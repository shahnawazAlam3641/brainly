import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    content:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Content"
        }
    ],
    isPrivate:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

 const User = mongoose.model("User",userSchema)

 export default User
