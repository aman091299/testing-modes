'use client';
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "./Navbar";

const ClientProviderWrapper = ({ children }) => {
  console.log("insdie client providers")
  return (
    <Provider store={store}>
      <Navbar />
      {children}
    </Provider>
  );
};

export default ClientProviderWrapper;