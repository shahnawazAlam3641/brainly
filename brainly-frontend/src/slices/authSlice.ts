

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    },
})

export const {setSignupData,setToken} = authSlice.actions

export default authSlice.reducer