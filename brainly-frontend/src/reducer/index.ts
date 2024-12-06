import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import notesReducer from "../slices/notesSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  notes:notesReducer,
});

export default rootReducer
