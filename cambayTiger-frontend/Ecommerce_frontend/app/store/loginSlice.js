import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:"login",
    initialState:false,
    reducers:{
        setLoginPage:(state,action)=>{
            
           return action.payload;
        }
    }
})

export const {setLoginPage}=loginSlice.actions;

export default loginSlice.reducer;