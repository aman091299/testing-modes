import { createSlice } from "@reduxjs/toolkit";
console.log("inside create slice 1");
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value--;
      }
    },
  },
});
console.log("inside create slice 2");
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
console.log("inside create slice 3");
