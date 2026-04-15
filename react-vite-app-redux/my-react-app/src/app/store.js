import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
console.log("inside store 1")
export const store=configureStore({
    reducer:{
        
        counter:counterSlice,
    },

})
console.log("inside store 2")