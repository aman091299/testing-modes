import {createSlice} from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        count:0,
        cartItems:[],
    },
    reducers:{
        addCartItems:(state,action)=>{
          state.cartItems.push(action.payload);
        },
        addItemsToCart:(state)=>{
            state.count++;
        },
        removeItemToCart:(state)=>{
            if(state.count < 0){
                state.count=0;
            }
           state.count--;
        },
    }
})

export const {removeItemToCart,addItemsToCart, addCartItems}=cartSlice.actions;

export default cartSlice.reducer;
console.log("slce")