import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "./models/User";
import connectDB from "./config/database";
import cookieParser from "cookie-parser"
import { auth } from "./middlewares/auth";
import {Types} from "mongoose"
import Content from "./models/Content";

const app = express()

dotenv.config()

app.use(cookieParser())

const PORT:number = parseInt(process.env.PORT || "4000", 10);

app.use(express.json())

interface UserDocument {
    _id:Types.ObjectId,
    name:string,
    email:string,
    password?:string,
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
    
    const user:UserDocument | null = await User.findOne({email:email})

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
        password:hashedPassword,
        content:[]
    })

    res.status(200).json({
        success:true,
        message:"User successfully registered"
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

app.get("/api/v1/signin", async (req,res) =>{
    try {
        const {email,password} = req.body

        if(!email || !password){
             res.status(403).json({
                success:false,
                message:"All input fields are mandetory"
            })
            return
        }

        const user:UserDocument | null = await User.findOne({email:email})

        if(!user || !user.password){
             res.status(404).json({
                success:false,
                message:"Invalid Credntials"
            })
            return
        }

        const hashedPassword = user.password

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

         res.status(200).json({
            success:true,
            message:"User Signed In successfully",
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
        
        const {title,link,type} = req.body

        if(!req.user) throw new Error("User not LoggedIn")

        const {_id} = req.user

        const content = await Content.create({title,link,type,user:_id})

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

app.get("/api/v1/content", async (req,res)=>{
    try {

        const contents = await Content.find({})

        res.status(200).json({
            success:false,
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



connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log(`Server Running at PORT ${PORT}`)
    })
})

