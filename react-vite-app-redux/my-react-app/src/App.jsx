import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  console.log("inside app .jsx 1")
  const count=useSelector(state=>state.counter.value)
  const dispatch=useDispatch();

  return (
    <div>
     <h1 className="text-blue-500 text-4xl leading-snug">{count}</h1>
         <button onClick={()=>dispatch(increment())}>increment</button>
         <button onClick={()=>dispatch(decrement())}>decrement</button>
    </div>
  );
}
  console.log("inside app .jsx 2")

export default App;