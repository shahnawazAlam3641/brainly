import { apiConnector } from "./apiConnector"
import { apiEndpoints } from "./apiEndpoints"

interface  cardPayload  {
    title: string
    link: string
    type: string
    tags: string[]
  };

export const getUserDetails = async(token:string | null)=>{
    const userDetails = await apiConnector("GET", apiEndpoints.USER_DETAILS_API , undefined, {Authorisation: token},undefined)
    return userDetails
}

export const addCard = async(obj:cardPayload,token:string | null)=>{
    console.log(token)

    const createdCard = await apiConnector("POST", apiEndpoints.CONTENT_API , obj,{Authorisation: token})
    return createdCard
}

export const getUserNotes = async(token:string | null)=>{
    const userNotes = await apiConnector("GET", apiEndpoints.CONTENT_API  , undefined,{Authorisation: token})
    return userNotes
}

export const deleteUserNote = async ( noteId:string, token:string | null)=> {
    
    const note = await apiConnector("DELETE", apiEndpoints.DELETE_NOTE_API , {noteId:noteId}, {Authorisation: token})
    return note
}

export const changeBrainPrivacy = async (id:string, privacy:boolean, token:string | null)=> {
    
    const response = await apiConnector("PUT", apiEndpoints.CHANGE_BRAIN_PRIVACY_API+id , {isPrivate:privacy}, {Authorisation: token})
    return response
}

export const getSharedBrain = async (id:string)=> {
    
    const response = await apiConnector("GET", apiEndpoints.GET_SHARED_BRAIN_API+id )
    return response
}