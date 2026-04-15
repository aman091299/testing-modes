"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { useState,useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch,useSelector } from "react-redux";
import { setLoginPage } from "../store/loginSlice";
import { addUser } from "../store/userSlice";
import { mergeCart } from "../utils/userCartFunc";

const LoginModal = () => {
  console.log("inside login modal")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showtoast, setShowToast] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch(); 
  const loginModal=useSelector(store=>store.login);
  

  useEffect(() => {
  if (loginModal) {
    // Disable scroll
    document.body.style.overflow = "hidden";
  } else {
    // Enable scroll
    document.body.style.overflow = "auto";
  }

  // Cleanup in case the component unmounts
  return () => {
    document.body.style.overflow = "auto";
  };
}, [loginModal]);

   useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    },5000);
    return () => clearTimeout(timer);
  }, [showtoast]);

  const handleLoginModal=()=>{
   dispatch(setLoginPage(false))
  }
  const SignUpHandler = async () => {
    setError('')
        console.log("Inside signup handler")

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId: email, password, firstName, lastName },
        { withCredentials: true }
      );
      if (!res?.data?.success) {
       return  setError(res?.data?.message);
      }
      if (res?.data?.success) {
        setError('')
              setEmail(""),
                setFirstName(""),
                setPassword(""),
                setLastName(""),
       
         dispatch(addUser(res?.data?.data));
           await mergeCart(dispatch);
         dispatch(setLoginPage(false))
        setShowToast(true);
        //  router.push("/");

      }
    } catch (error) {
    
      setError(error?.response?.data?.message);
      console.log("Error  " + error?.message);
    }
  };

  async function loginHandler() {
     console.log("Inside login handler")
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );
    
      if (!res?.data?.success) {
        return setError(res?.data?.message);
      }
      if (res?.data?.success) {
        console.log("Inside login handler success data" )

        setError('')
        dispatch(addUser(res?.data?.data));
        // getALLCartItems(dispatch);
             console.log("Inside login handler2")

       await mergeCart(dispatch);
             console.log("Inside login handler3")

        setShowToast(true);
        dispatch(setLoginPage(false))
         setEmail("")
        setFirstName("")
        setPassword("")
        setLastName("")
        //  router.push("/");
        
       
       
      }
    } catch (error) {
      setError(error?.response?.data?.message);
       console.log("Error while login  " + error.message);
    }
  }

  return loginModal && loading ? (
    <>
      <span className="loading loading-xl loading-spinner text-error absolute left-1/2 top-1/2"></span>
    </>
  ) : (
    <div>
     <div
        className={`fixed inset-0 z-[999] bg-white/70 transition-opacity duration-300 ease-in-out ${
         loginModal 
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
    <div className={" absolute   z-10000 " + (isLogin ? " bottom-1/5 right-1/3" :" top-1/3 -translate-y-40 right-1/3")}>
      <div className="flex justify-center  items-center  ">
        <fieldset className="fieldset  bg-base-200 border-base-300  shadow-lg rounded-box w-100 border px-10 py-3">
          <legend className="fieldset-legend w-full ">
            <div className="mt-8">{isLogin ? "Login" : "Signup"}</div>
             <button
              className="mt-8 flex flex-end text-2xl cursor-pointer"
              onClick={handleLoginModal}
            >
            <svg 
            width="10"
             height="10" 
             viewBox="0 0 16 16"
              fill="none">
              <path 
              d="M15.513 13.298c.65.6.65 1.651 0 2.252-.3.3-.699.45-1.098.45-.45 0-.849-.15-1.148-.45l-5.242-5.255-5.292 5.255c-.3.3-.699.45-1.098.45-.45 0-.849-.15-1.148-.45a1.545 1.545 0 010-2.252l5.242-5.304L.487 2.74a1.546 1.546 0 010-2.252c.599-.65 1.647-.65 2.246 0l5.292 5.254L13.267.488a1.537 1.537 0 012.246 0c.65.6.65 1.651 0 2.252l-5.242 5.304 5.242 5.254z" 
              fill="#C1C1C1">
              </path>
              </svg>
            </button>
          </legend>
          
          {!isLogin && (
            <>
              <label className="label my-1">FirstName</label>
              <input
                type="text"
                className="input focus:outline-none"
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label className="label my-1">LastName</label>
              <input
                type="text"
                className="input focus:outline-none"
                placeholder="LastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </>
          )}
          <label className="label my-1">Email</label>
          <input
            type="email"
            className="input focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="label  my-1">Password</label>
          <input
            type="password"
            className="input focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isLogin ? (
            <button className="btn btn-neutral mt-4" onClick={loginHandler}>
              Login
            </button>
          ) : (
            <button className="btn btn-neutral mt-4" onClick={SignUpHandler}>
              SignUp
            </button>
          )}

          <div
            className="cursor-pointer text-[13px] font-medium pt-4"
            onClick={() => {
              setEmail(""),
                setFirstName(""),
                setPassword(""),
                setLastName(""),
                setIsLogin((prev) => !prev);
            }}
          >
            {isLogin
              ? "New User -> SignUp from Here"
              : "Alreardy Have Account -> Login from Here"}
          </div>

          {error && <div className="text-red-700 text-md mt-1">{error}</div>}
        </fieldset>
        {showtoast && (
        <div className="toast toast-top toast-center ">
          <div className="alert alert-success">
            <span>{isLogin?"User Login Sucessfully":"User SignUp Successfully"}</span>
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default LoginModal;
