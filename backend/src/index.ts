import express, { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import User from "./models/User";
import connectDB from "./config/database";
import cookieParser from "cookie-parser"
import { auth } from "./middlewares/auth";
import {Types} from "mongoose"
import Content from "./models/Content";
import Tag from "./models/Tag";
import cors from "cors"

const app = express()

dotenv.config()

app.use(cookieParser())

const PORT:number = parseInt(process.env.PORT || "4000", 10);

app.use(express.json())

app.use(
    cors({
      origin: process.env.REACT_APP_BASE_URL,
      credentials: true,
    })
  );

interface UserDocument {
    _id:Types.ObjectId,
    name:string,
    email:string,
    password?:string,
    content?:contentDocument[]
}

interface contentDocument{
    _id:Types.ObjectId,
    title:string,
    link:string,
    type:string,
    tag?:tagDocument[]
}

interface tagDocument{
    _id:Types.ObjectId,
    name:string,
    user:Types.ObjectId
}


app.post("/api/v1/signup", async (req, res) =>{
   try {
    const {email, password, name} = req.body

    if(!email || ! password|| !name){
         res.status(401).json({
            success:false,
            message:"All fields are mandetory"
        })
        return
    }
    
    const user = await User.findOne({email:email})

    if(user){
         res.status(403).json({
            success:false,
            message:'User already exist with this email'
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
      }

    const token = jwt.sign({
        name:newUser.name,
        email:newUser.email
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    newUser.password = undefined

    res.status(200).json({
        success:true,
        message:"User successfully registered",
        user:newUser,
        token
    })
    return

   } catch (error) {
    console.log(error)
     res.status(500).json({
        success:false,
        message:"Error occured while Signup",
        error:error
    })
    return
   }
})

app.post("/api/v1/signin", async (req,res) =>{
    try {
        const {email,password} = req.body

        if(!email || !password){
             res.status(403).json({
                success:false,
                message:"All input fields are mandetory"
            })
            return
        }

        const user = await User.findOne({email:email})
        // .populate({
        //     path:"content",
        //     populate:{
        //         path:"tag"
        //     }
        // }).exec()

        
// console.log(user)
        

        if(!user || !user.password){
             res.status(404).json({
                success:false,
                message:"Invalid Credntials"
            })
            return
        }

        const hashedPassword = user.password as string



        // console.log(hashedPassword)

        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

        if(!isPasswordCorrect){
             res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
            return
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
          }

        const token = jwt.sign({
            name:user.name
            ,email:user.email
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        user.password = undefined

         res.status(200).json({
            success:true,
            message:"User Signed In successfully",
            user,
            token
        })
        return


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured while signin"
        })
        return
    }


})

app.post("/api/v1/content",auth ,async (req,res) =>{

    try {
        
        const {title,link,type,tags} = req.body

        // console.log(type)
// 
        if(!title|| !link|| !type|| tags.length === 0){
            res.status(401).json({
                success:false,
                message:"All fields are mandetory"
            })
            return
        }

        if(!req.user) throw new Error("User not LoggedIn")

        const {_id} = req.user

        const allTags = await Tag.find()

        const existingTags = allTags.map((tag)=>{
            return tag.name
        })

        let tagArray:Types.ObjectId[] = []

        await Promise.all(tags.map(async (tag:string)=>{
            if(!existingTags.includes(tag)){
                const newTag = await Tag.create({name:tag,user:_id})
                tagArray.push(newTag._id)
            }else{
                const foundTag = await Tag.findOne({name:tag})

                foundTag ? 
                    (tagArray.push(foundTag._id)) 
                    :  (res.status(401).json({success:false,message:"Tag not found"}))
            }
        }))

        // console.log(tagArray)



        const content = await (await Content.create({title,link,type,user:_id,tag:tagArray})).populate("tag")

        console.log(content)

        const user = await User.findById(_id)

        user?.content.push(content._id)

        await user?.save()

        res.status(200).json({
            success:true,
            message:"Content ceated successfully",
            content,
            user
        })
        return



    } catch (error) {
        console.log(error)
         res.status(500).json({
            success:false,
            message:"Error occured while creating content"
        })
        return
    }

})

app.get("/api/v1/content", auth, async (req,res)=>{
    try {

        const currentUser = req.user

        const contents = await Content.find({user:currentUser?._id}).populate("tag")

        // console.log(contents)

        res.status(200).json({
            success:true,
            message:"Got all contents Successfully",
            contents
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured while getting all contents"
        })
        return
        
    }
})

app.delete("/api/v1/delete", auth, async(req:Request, res:Response)=>{
    try {
        const {noteId} = req.body

        const currentUser = req.user

        const note = await Content.findOneAndDelete({_id:noteId, user:currentUser?._id})

        if(!note){
            res.status(200).json({
                success:false,
                message:"Note not found",
                note
            })
            return
        }

        // console.log(note)

        res.status(200).json({
            success:true,
            message:"Note deleted Successfully",
            note
        })
        return
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured while deleting note",
            error
        })
        
    }
})

app.get("/api/v1/share/:id", async(req,res)=>{
    try {

        const {id} = req.params
        // const currentUser = req.user

        // if(!currentUser){
        //     res.status(401).json({
        //         successs:false,
        //         message:"Please login before accessing shared brain"
        //     })
        //     return
        // }

        // if(id == currentUser._id.toString()){
        //     res.status(401).json({
        //             success:false,
        //             message:"You are trying to access your own brain"
        //     })
        //     return
        // }

        // console.log(id)

        const user = await User.findById(id).select("name email isPrivate content").populate({
            path:"content",
            populate:{
                path:"tag"
            }
        })

        if(!user){
            res.status(404).json({
                success:false,
                message:"User does not exist"
            })
            return
        }

        if(user.isPrivate){
            res.status(200).json({
                success:false,
                message:"The brain you are trying to access is Private",
                isPrivate:true
            })
            return
        }

        res.status(200).json({
            success:true,
            message:"Successfully got shared brain",
            isPrivate:false,
            user
        })
        return
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured while accessing shared Brain",
            error
        })
        return
    }
})

app.put("/api/v1/share/:id",auth, async(req,res)=>{
try {
    const {id} = req.params
    const {isPrivate} = req.body

    const currentUser = req.user

    if(id !== currentUser?._id.toString()){
        res.status(401).json({
            success:false,
            message:"Request forbidden"
        })
        return
    }

    const user = await User.findByIdAndUpdate(id,{isPrivate:isPrivate},{
        returnOriginal: false
      })

    

    if(user){
        user.password = undefined
        res.status(200).json({
            success:true,
            message:"Brain privacy successfully updated",
            user

        })
        return
    }else{
        res.status(401).json({
            success:false,
            message:"Something went wrong"
        })
        return
    }

} catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:"Error occured while sharing brain",
        error
    })
    
}
})

app.get("/api/v1/userDetails", async(req:Request, res:Response)=>{

    try {

        // console.log(req.header("Authorisation"))
        

        const token = req.header("Authorisation") || req.cookies || req.body 

        // console.log(token)

        if(!process.env.JWT_SECRET) throw new Error("JWT secret in ,env is undefined")

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

        let user = await User.findOne({email:decodedToken.email})
        // .populate({
        //     path:"content",
        //     populate:{
        //         path:"tag"
        //     }
        // }).exec()

        if(!user){
            res.status(404).json({
                success:false,
                message:"User not found",
            })
            return
        }

        // req.user = {
        //     _id:user._id as Types.ObjectId,
        //     name:user.name as string,
        //     email:user.email as string,
            // content:user.content as noteDoc[],
            // isPrivate:user.isPrivate as boolean,
            // createdAt:NativeDate,
            // updatedAt:NativeDate,
            user.password = undefined

        res.status(200).json({
            success:true,
            message:"User Details Fetched Successfully",
            user
        })
        return
    } catch (error) {
        error
        res.status(401).json({
            success:false,
            message:"Something went wrong while fetching user details",
            error
        })
    }
})


connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log(`Server Running at PORT ${PORT}`)
    })
})

