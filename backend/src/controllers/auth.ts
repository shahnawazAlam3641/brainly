import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { z } from "zod"

export const signup = async (req:Request, res:Response) =>{
    try {

        const requestBodySchema = z.object({
            email:z.string().email().min(5).max(100),
            password:z.string().min(8).max(100),
            name:z.string().min(3).max(50)
        })

        const isparsedDataSuccess = requestBodySchema.safeParse(req.body)

        if(!isparsedDataSuccess.success){
            res.status(401).json({
                success:false,
                message:isparsedDataSuccess.error.issues[0].message,
                error:isparsedDataSuccess.error
            })
            return
        }

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
 }

 export const signin = async (req:Request, res:Response) =>{
    try {

        const requestBodySchema = z.object({
            email:z.string().email().min(5).max(100),
            password:z.string().min(8).max(100)
        })

        const isparsedDataSuccess = requestBodySchema.safeParse(req.body)

        if(!isparsedDataSuccess.success){
            res.status(401).json({
                success:false,
                message:isparsedDataSuccess.error.issues[0].message,
                error:isparsedDataSuccess.error
            })
            return
        }

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


}

export const fetchUserDetails = async(req:Request, res:Response)=>{

    try {

        const tokenSchema = z.string()

        const isparsedDataSuccess = tokenSchema.safeParse(req.header("Authorisation"))

        if(!isparsedDataSuccess.success){
            res.status(401).json({
                success:false,
                message:isparsedDataSuccess.error.issues[0].message,
                error:isparsedDataSuccess.error
            })
            return
        }

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
}