import { createSlice } from "@reduxjs/toolkit";

interface tagDoc {
    _id:string,
    name:string,
    user:string,
    createdAt:string,
    updatedAt:string,
    __v?:number
}

interface noteDoc { 
    _id:string,
    link:string,
    title:string,
    type:string,
    user:string,
    createdAt:string,
    updatedAt:string,
    tag:tagDoc[]
    __v?:number
}

interface NotesState {
    content: noteDoc[];
  }

  const initialState: NotesState = {
    content: [],
  };
  


const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
        setNotes(state,action){
            state.content = action.payload
        },
        pushNote(state,action){
            const note:noteDoc = action.payload
            state.content.push(note)
        },
        deleteNote(state,action){
            const id:string = action.payload

           initialState?.content.map((note,index)=>{
                if(note._id === id){
                    initialState?.content.splice(index,1)
                }
            })
        }
    }
})

export const {setNotes,pushNote,deleteNote} = notesSlice.actions
export default notesSlice.reducer