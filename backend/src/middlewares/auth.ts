import express from "express"
import jwt,{JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config()



export const auth = async (req: express.Request,res:express.Response,next:express.NextFunction)=>{
    try {
        const {token} = req.cookies

        if(!process.env.JWT_SECRET) throw new Error("JWT secret in ,env is undefined")

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET) as JwtPayload

        const user = await User.findOne({email:decodedToken.email}).select("_id name email content")

        if(!user){
            res.status(404).json({
                success:false,
                message:"User not found",
            })
            return
        }

        req.user = {
            _id: user._id,
            name: user.name as string,
            email: user.email as string,
        };

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