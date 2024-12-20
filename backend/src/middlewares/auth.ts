import express,{Request, Response,NextFunction} from "express"
import jwt,{JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"
import {Types} from "mongoose"
import { z } from "zod"

dotenv.config()

// interface tagDoc {
//     _id:Types.ObjectId,
//     name:string,
//     user:string,
//     createdAt:NativeDate,
//     updatedAt:NativeDate,
//     __v?:number
// }

// interface noteDoc { 
//     _id:Types.ObjectId,
//     link:string,
//     title:string,
//     type:string,
//     user:string,
//     createdAt:NativeDate,
//     updatedAt:NativeDate,
//     tag:tagDoc[]
//     __v?:number
// }

// interface userDoc {
//     _id:Types.ObjectId,
//     name:string,
//     email:string,
//     password:string,
//     content:noteDoc[],
//     isPrivate:boolean,
//     createdAt:NativeDate,
//     updatedAt:NativeDate,
//     __v?:number
// }

export const auth = async (req: Request,res:Response,next:NextFunction)=>{
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

        const token = req.header("Authorisation") || req.cookies || req.body 
        // console.log("her---------------->",req.header("Authorisation"))

        if(!process.env.JWT_SECRET) throw new Error("JWT secret in ,env is undefined")

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET) as JwtPayload

        const user = await User.findOne({email:decodedToken.email})
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

        req.user = {
            _id:user._id as Types.ObjectId,
            name:user.name as string,
            email:user.email as string,
            // content:user.content as noteDoc[],
            // isPrivate:user.isPrivate as boolean,
            // createdAt:NativeDate,
            // updatedAt:NativeDate,
        }

        next()


        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured while authenticating user",
            error:error
        })
        return
        
    }

}