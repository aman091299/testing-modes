'use client'
import OrderCardContainer from '../components/OrderCardContainer';
import OrderContent from '../components/OrderContent';
import { useState ,useEffect} from 'react';
import { BASE_URL } from "../utils/constants";
import Loader from '../components/Loader';

const OrderHistory = () => {
     console.log("inside Order History");
     const [orders,setOrders]=useState([]);
     const [userDetails,setUserDetails]=useState(null)
     const [loading,setLoading]=useState(true);
     


        
      const fetchAllOrderDetails=async()=>{
        try {
            setLoading(true);
            const res=await fetch(BASE_URL+"/payment/all/order",{credentials:'include'});
            const data=await res.json();
            setOrders(data?.data?.orders);
            setUserDetails(data?.data?.userDetails)
            
        } catch (error) {
            console.log("Error in get all order details : ",error)
        }finally{
            setLoading(false)
        }
      }
    

      useEffect(()=>{
       fetchAllOrderDetails();
      },[])

if(loading){
    return <div className="py-40 relative"><Loader/></div>
}
    
  return (
    <div className="pt-35  px-20 w-full">
        <div className="text-4xl font-bold ">My Orders</div>
        <div className="mt-10">
        {orders?.slice().reverse().map((order)=>(
        <div className='w-full flex mb-17' key={order.orderId} >
               <OrderContent {...order} {...userDetails}/>
             <div className="w-[calc(100%-27%)] border-[#d8d8d8] bg-[#ebebeb]  border-1 rounded-r-lg">
             <div className=" px-4 py-1.5 rounded-tl-lg text-orange-600 font-bold bg-base-100 flex justify-end ">
                ORDER DETAILS
                </div>
                <OrderCardContainer {...order}/>   
             </div>
        </div>
       ) )}
    </div>
    </div>
  )
}

export default OrderHistory;