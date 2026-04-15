import { useSelector, useDispatch } from "react-redux";
import { setIsShowCartModal, addItemsInAddToCart } from "../store/cartSlice";
import { useEffect, useRef, useState } from "react";

import { setLoginPage } from "../store/loginSlice";
import { useRouter } from "next/navigation";
import CartCard from "./CartCard";
import ApplyCoupons from "./ApplyCoupons";

const CartModal = () => {
  console.log("inside cart modal")
  const [isClient, setIsClient] = useState(false);

    const dropDownRef = useRef(null);
  const dispatch = useDispatch();
  const router=useRouter();

  const showCartModal = useSelector((store) => store.cart.isShowCartModal);
  const user=useSelector((store)=>store.user);
  const cartItems = useSelector((store) => store.cart.cartItems);
  
  const totalSum = useSelector((store) => store.cart.totalPrice);

 

  useEffect(() => {
    if (showCartModal) {
      setIsClient(true);
      document.body.style.overflow = "hidden";
    }

    document.addEventListener("mousedown", clickOutsideCartModal);
    return () => {
      document.removeEventListener("mousedown", clickOutsideCartModal);
      document.body.style.overflow = "auto";
    };
  }, [showCartModal]);



  const handleCartModal = () => {
    dispatch(setIsShowCartModal(false));
  };


  const clickOutsideCartModal = (event) => {
    if (
      dropDownRef.current !== null &&
      !dropDownRef.current.contains(event.target)
    )
      dispatch(setIsShowCartModal(false));
  };

  return (
    <div>
    {showCartModal&&
      <div
        className={`fixed inset-0 z-[999] bg-white/30 transition-opacity duration-300 ease-in-out ${
          showCartModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={dropDownRef}
          className={`w-120  bg-white shadow-lg z-[1000] fixed right-0 top-0 rounded transform transition-transform duration-300 ease-in-out 
      ${showCartModal ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between bg-black py-4 px-4">
            <div className="font-semibold text-xl text-[#feffed]">
              Shopping Cart
            </div>
            <div
              className="text-orange-600 font-semibold text-xl"
              onClick={handleCartModal}
            >
              X
            </div>
          </div>
          <div
            className={
               (!cartItems||cartItems?.length === 0 ?"":
              "overflow-auto ")+ (isClient ? "h-[calc(84vh-3rem)]" : "")
            }
          >
            {!cartItems||cartItems?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-screen">
                <svg
                  width="5rem"
                  height="5rem"
                  viewBox="0 0 94 104"
                  fill="none"
                  margin="auto"
                >
                  <path
                    d="M43.14 65.492a3.37 3.37 0 006.702-.692L48.29 49.766a3.369 3.369 0 10-6.702.693l1.553 15.033zM64.224 68.498a3.37 3.37 0 003.697-3.005l1.554-15.034a3.368 3.368 0 10-6.702-.693L61.219 64.8a3.369 3.369 0 003.005 3.698zM38.138 83.141c-5.75 0-10.428 4.678-10.428 10.429S32.388 104 38.138 104c5.75 0 10.429-4.679 10.429-10.43 0-5.75-4.679-10.429-10.429-10.429zm0 14.121a3.696 3.696 0 01-3.69-3.693 3.694 3.694 0 013.69-3.69 3.695 3.695 0 013.69 3.69 3.696 3.696 0 01-3.69 3.693zM72.925 83.141c-5.75 0-10.429 4.678-10.429 10.429S67.174 104 72.925 104c5.75 0 10.43-4.679 10.43-10.43 0-5.75-4.68-10.429-10.43-10.429zm0 14.121a3.696 3.696 0 01-3.69-3.693 3.695 3.695 0 013.69-3.69 3.695 3.695 0 013.691 3.69 3.696 3.696 0 01-3.691 3.693z"
                    fill="#2B364B"
                  ></path>
                  <path
                    d="M93.076 35.523a3.368 3.368 0 00-2.665-1.309H23.258l-2.82-10.844a3.37 3.37 0 00-3.261-2.52H3.369a3.369 3.369 0 000 6.737h11.203l2.797 10.757c.014.06.03.12.047.178l10.402 40a3.37 3.37 0 003.26 2.52h48.907a3.37 3.37 0 003.26-2.52L93.673 38.43a3.37 3.37 0 00-.596-2.908zM77.38 74.306H33.684L25.01 40.953h61.044L77.38 74.306zM42.305 23.74a3.36 3.36 0 002.382.987 3.369 3.369 0 002.382-5.752L36.473 8.385a3.37 3.37 0 00-4.763 4.765l10.595 10.59zM66.39 24.726a3.36 3.36 0 002.384-.988l10.58-10.589a3.369 3.369 0 10-4.767-4.762l-10.58 10.59a3.37 3.37 0 002.383 5.75zM55.535 21.701h.001a3.37 3.37 0 003.369-3.368l.004-14.963A3.37 3.37 0 0055.54 0h-.001a3.37 3.37 0 00-3.37 3.368l-.003 14.963a3.37 3.37 0 003.368 3.37z"
                    fill="#2B364B"
                  ></path>
                </svg>
                <div className="text-[#282c3f]">
                  Your Shopping Cart is Empty!
                </div>
              </div>
            ) : (
               <div>
             { cartItems?.map((item) => (
             <CartCard {...item} key={item._id}/>
              ))
              }
              <div>
               <ApplyCoupons totalSum={totalSum}/>
              </div>
              </div>
                 )
            
            
            }
          

          </div>
            <div className="">
            <div className={"flex  justify-between  py-4 " + (!cartItems||cartItems?.length === 0?"py-8":"border-t-1 border-[#d8d8d8]")}>
            { !cartItems||cartItems?.length === 0  ? <div></div>:
               <div className="text-[##282c3f] mx-6 text-lg font-semibold py-2">
               Total : ₹{totalSum?.toFixed(2)} 
            </div>
           
            }
            <div className="rounded py-2 text-lg font-semibold bg-orange-600 mr-4 text-white cursor-pointer">
            {!cartItems||cartItems?.length === 0 ?<div></div>:!user ?
               <button className="px-2 cursor-pointer" onClick={()=>{dispatch(setLoginPage(true))
                                                                                                                               handleCartModal()}}>
             PROCEED TO LOGIN
            </button>
            :<button className="flex-1 text-lg px-2 cursor-pointer" onClick={()=>{
             
               dispatch(setIsShowCartModal(false))
                router.push('/checkout/address');}}>
            PROCEED TO CHECKOUT
            </button>
            }
            </div>
           
            </div>
            </div>
        </div>
      </div>
      }
    </div>
  );
};

export default CartModal;
