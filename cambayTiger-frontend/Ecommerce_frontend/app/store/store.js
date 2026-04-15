import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"
import loginSlice from "./loginSlice";
import userSlice from "./userSlice"

  console.log("inside store ");

export const store=configureStore({
    reducer:{
        cart:cartSlice,
        login:loginSlice,
        user:userSlice,
    }
    ,
})