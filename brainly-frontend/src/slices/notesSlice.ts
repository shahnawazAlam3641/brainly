import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface TagDoc {
    _id:string,
    name:string,
    user:string,
    createdAt:string,
    updatedAt:string,
    __v?:number
}

interface NoteDoc { 
    _id:string,
    link:string,
    title:string,
    type:string,
    user:string,
    createdAt:string,
    updatedAt:string,
    tag:TagDoc[]
    __v?:number
}

interface NotesState {
    content: NoteDoc[];
  }

  const initialState: NotesState = {
    content: [],
  };
  


const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
        setNotes(state:NotesState,action: PayloadAction<NoteDoc[]>){
            state.content = action.payload
        },
        pushNote(state:NotesState,action: PayloadAction<NoteDoc>){
            
            state.content.push(action.payload)
        },
        deleteNote(state:NotesState,action: PayloadAction<string>){
            const id:string = action.payload

            state.content = state.content.filter((note) => note._id !== id);
        }
    }
})

export const {setNotes,pushNote,deleteNote} = notesSlice.actions
export default notesSlice.reducer