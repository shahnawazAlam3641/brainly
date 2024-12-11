import { apiConnector } from "./apiConnector"

interface  cardPayload  {
    title: string
    link: string
    type: string
    tags: string[]
  };

export const getUserDetails = async(token:string | null)=>{
    const userDetails = await apiConnector("GET", "http://localhost:4000/api/v1/userDetails" , undefined, {Authorisation: token},undefined)
    return userDetails
}

export const addCard = async(obj:cardPayload,token:string | null)=>{
    console.log(token)

    const createdCard = await apiConnector("POST", "http://localhost:4000/api/v1/content" , obj,{Authorisation: token})
    return createdCard
}

export const getUserNotes = async(token:string | null)=>{
    const userNotes = await apiConnector("GET", "http://localhost:4000/api/v1/content" , undefined,{Authorisation: token})
    return userNotes
}

export const deleteUserNote = async ( noteId:string, token:string | null)=> {
    
    const note = await apiConnector("DELETE", "http://localhost:4000/api/v1/delete" , {noteId:noteId}, {Authorisation: token})
    return note
}

export const changeBrainPrivacy = async (id:string, privacy:boolean, token:string | null)=> {
    
    const response = await apiConnector("PUT", "http://localhost:4000/api/v1/share/"+id , {isPrivate:privacy}, {Authorisation: token})
    return response
}

export const getSharedBrain = async (id:string)=> {
    
    const response = await apiConnector("GET", "http://localhost:4000/api/v1/share/"+id )
    return response
}