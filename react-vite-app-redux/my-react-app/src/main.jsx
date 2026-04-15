import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import { store } from './app/store.js';
import App from './App.jsx'
import './index.css'; // Tailwind CSS import
console.log("inside main .jsx 1")
createRoot(document.getElementById('root')).render(
  <StrictMode>
  
   <BrowserRouter>
   <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
console.log("inside main .jsx 2")