'use client'
import CartUpdate from "../components/CartUpdate";
import Loader from "../components/Loader";
import PaymentOrderSummary from "../components/PaymentOrderSummary";
import { BASE_URL } from '../utils/constants';
import { useState ,useEffect} from "react";
import UserDetail from "../components/UserDetail";

const orderPlace = () => {
  console.log("inside order place page");
    const [cartItems,setcartItems]=useState([]);
    const [totalSum,setTotalSum]=useState(0);
    const [userDetails,setUserDetails]=useState(null);
    const [paymentMode,setPaymentMode]=useState(null);
    const [orderId,setOrderId]=useState(null);
    const [loading,setLoading]=useState(true);

 useEffect(()=>{
     fetchPaymentOrderSummary();
 },[])

 const fetchPaymentOrderSummary=async()=>{
    try {
      setLoading(true);
        const res=await fetch(BASE_URL+"/payment/order/summary",{credentials:'include'});
        const data=await res.json();
        if(data?.data){
            console.log("data payment order summary",data.data)
            setcartItems(data?.data?.cartData);
            setTotalSum(data?.data?.amount);
            setPaymentMode(data?.data?.paymentMode);
            setUserDetails(data?.data?.userDetails);
            setOrderId(data?.data?.razorpayOrderId);
        }
        
    } catch (error) {
        console.log("Error in fetch payment order summary",error);
    }finally{
      setLoading(false);
    }
  }

  if(loading){
   return  <div className="py-40 relative">
    <Loader/>
    </div>
  }
  return (
    <div className="py-26 w-full">
    <CartUpdate orderId={orderId} />
    <div className="mt-15 px-10 flex gap-10">
      <div className="w-1/2">
    <UserDetail {...userDetails} paymentMode={paymentMode} />
    </div>
    <div className="w-1/2 ">
    <PaymentOrderSummary cartItems={cartItems} totalSum={totalSum} />
    </div>

    </div>
    </div>
  )
}

export default  orderPlace;