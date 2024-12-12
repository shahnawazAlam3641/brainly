import { Types } from "mongoose"

export interface UserDocument {
    _id:Types.ObjectId,
    name:string,
    email:string,
    password?:string,
    content?:contentDocument[]
}

export interface contentDocument{
    _id:Types.ObjectId,
    title:string,
    link:string,
    type:string,
    tag?:tagDocument[]
}

export interface tagDocument{
    _id:Types.ObjectId,
    name:string,
    user:Types.ObjectId
}