import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import notesReducer from "../slices/notesSlice"
// import { useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  notes:notesReducer,
});

export default rootReducer

// Derive RootState type
export type RootState = ReturnType<typeof rootReducer>;

// // Use RootState in your components
// const currentUser = useSelector((state: RootState) => state.auth.signupData);
// const token = useSelector((state: RootState) => state.auth.token);
// const content = useSelector((state: RootState) => state.notes.content);