import { Request, Response } from "express"
import Tag from "../models/Tag"
import { Types } from "mongoose"
import Content from "../models/Content"
import User from "../models/User"
import { z } from "zod"


export const createContent = async (req:Request, res:Response) =>{

    try {

        const requestBodySchema = z.object({
            title:z.string().email().min(5).max(50),
            link:z.string(),
            type:z.enum(["Twitter(X)", "Youtube","Document", "Link"]),
            tags:z.array(z.string())
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
                const newTag = await Tag.create({name:tag, user:_id})
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
            message:"Content created successfully",
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

}

export const fetchContent = async (req:Request, res:Response)=>{
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
}

export const deleteContent = async(req:Request, res:Response)=>{
    try {

        const requestBodySchema = z.object({
            noteId:z.string()
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
}

export const getSharedContent = async(req:Request, res:Response)=>{
    try {

        const idSchema = z.string()

        const isparsedDataSuccess = idSchema.safeParse(idSchema)

        if(!isparsedDataSuccess.success){
            res.status(401).json({
                success:false,
                message:isparsedDataSuccess.error.issues[0].message,
                error:isparsedDataSuccess.error
            })
            return
        }

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
}

export const changeContentPrivacy = async(req:Request, res:Response)=>{
    try {
        const requestBodySchema = z.object({
            isPrivate:z.boolean()
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
    }