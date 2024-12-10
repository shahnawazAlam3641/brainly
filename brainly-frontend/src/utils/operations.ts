import { apiConnector } from "./apiConnector"

export const getUserDetails = async(token:string | null)=>{
    const userDetails = await apiConnector("GET", "http://localhost:4000/api/v1/userDetails" , undefined, {Authorisation: token},undefined)
    return userDetails
}

export const addCard = async(obj,token)=>{
    console.log(token)

    const createdCard = await apiConnector("POST", "http://localhost:4000/api/v1/content" , obj,{Authorisation: token})
    return createdCard
}

export const getUserNotes = async(token)=>{
    const userNotes = await apiConnector("GET", "http://localhost:4000/api/v1/content" , undefined,{Authorisation: token})
    return userNotes
}

export const deleteUserNote = async ( noteId, token)=> {
    
    const note = await apiConnector("DELETE", "http://localhost:4000/api/v1/delete" , {noteId:noteId}, {Authorisation: token})
    return note
}