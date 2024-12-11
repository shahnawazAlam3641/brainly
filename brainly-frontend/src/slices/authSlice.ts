

import { createSlice } from "@reduxjs/toolkit";

interface SignupData {
    _id: string;
    name:string
    email:string

    isPrivate: boolean;
    createdAt:string
    updatedAt:string
    
  }

const initialState:{
    signupData: SignupData | null; // Allow it to be null initially
  token: string | null;
} = {
    signupData:null,
    token:localStorage.getItem("token")
    
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setSignupData(state,action){
            state.signupData = action.payload
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setIsPrivate(state, action) {
            if(state?.signupData){
                state.signupData.isPrivate = action.payload;
            }
            
          },
    },
})

export const {setSignupData,setToken} = authSlice.actions

export default authSlice.reducer