import {useState,useEffect} from 'react'
import { BASE_URL } from '../utils/constants';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const Payment = () => {
  console.log("inside payment");
    const [type,setType]=useState('Online');
    const [loading,setLoading]=useState(true);
    const router=useRouter();
    const totalSum = useSelector((store) => store.cart.totalPrice);
   
   
//  useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

    useEffect(() => {
    getAddress();
    }, []);

     const getAddress = async () => {
     setLoading(true);
    try {
        const res = await fetch(BASE_URL + "/address/default", {
        credentials: "include",
        });
        const data = await res.json();
         if(!data?.data ){
              setLoading(true);
          router.push("/checkout/address");
          return;
         }
         if(!totalSum){
         return router.push("/")
         }
        
          setLoading(false);
         

    } catch (error) {
        console.log("Error while getting the address", error);
         setLoading(false);
    } 
    };

      if (loading) {
        return (
          <div className="py-40 relative">
            <Loader />
          </div>
        );
      }


    const placeOrderhandler=async(type)=>{
      try{   
        if(totalSum===0){
          console.log("inside total sum 0");
          return;
        }
        console.log("placing order .....",type)
            if(type==='Online'){
                 setLoading(true);
               const res= await fetch(BASE_URL + '/payment/create/order',{
                method:'Post',
                headers:{
                'Content-Type':'application/json'
                },

                credentials:'include',
                body:JSON.stringify({type})
            });
            const data=await res.json();
            const {amount,currency,orderId,notes,address}=data?.data;
            var options = {
                "key": data?.key, // Enter the Key ID generated from the Dashboard
                "amount":amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": currency,
                "name": "Cambay Tiger Corp",
                "description": "Test Transaction",
                "image": "https://cdn.razorpay.com/logos/FKjVLQVqlhHPF2_medium.jpg",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                
                "prefill": {
                    "name": notes.firstName +" "+ notes.lastName,
                    "email": notes.emailId,
                  
                },
                "notes": {
                    "address": address
                },
                "theme": {
                    "color": "#3399cc"
                },
                 handler:verifyPayment, 
            };
            var rzp1 = new Razorpay(options);
                rzp1.open();
            }
            else {
            console.log('Place order with', type); 
            // COD or wallet
            // You can call another API for COD or wallet payment
            if(type==='COD'){
                 setLoading(true);
              const res=await fetch(BASE_URL +"/payment/cod",{
                method:'Post',
                credentials:'include',
                headers:{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify({type})
              })
            const data=await res.json();
            
            console.log("cod data......",data);
            if(data.success){
            return router.push('/order-placed');
            }
            }
         
          }
  }
        catch(error){
            console.log("Error while payment ",error);
        }finally{
          setLoading(false);
        }
    }

       
  const verifyPayment=async()=>{
   try {
    // setLoading(true);
    const res=await fetch(BASE_URL+'/payment/verify',{credentials:'include'});
    const data=await res.json();
    if(data?.data?.paymentStatus==='Paid'){
     return router.push("/order-placed")
    }
   } catch (error) {
    console.log('Error',error);
   }finally{
    setLoading(false);
   }
  }

  return (
    <div>
      <div className="text-black  min-w-full  px-4 py-7 border-1 border-[#ececec] rounded ">
      <div className="flex flex-col gap-3">
        <div className="font-semibold text-2xl"> Select payment method</div>   
                <div
                 className= "bg-base-100 py-4 pl-4 rounded-lg  text-sm my-4 border-1 border-[#d5cbcb]"
                  >
                  <label className="flex gap-4 items-start cursor-pointer ">
                    <input type="checkbox" className="w-5 h-5 mt-2" />
                    <div className="flex flex-col">
                
                      <span className="font-semibold text-neutral text-lg">Pay via CT Money wallet</span>
                         <span>Available balance: <span className="font-medium">₹ 11</span></span>
                    </div>
                   </label>
                </div>

                <div
                 className= "bg-base-100 py-4 pl-4 rounded-lg  text-sm my-4 border-1 border-[#d5cbcb]"
                  >
                  <label className="flex gap-4 items-start cursor-pointer ">
                    <input type="radio" className="w-3 h-3 mt-2" name="payment-method" value="Online" defaultChecked onChange={()=>setType("Online")} />
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral text-lg">Pay Online</span>
                         <span className="text-[#616161] text-sm font-medium">Pay via UPI, Debit Card, Credit Card, Net Banking, etc.</span>
                    </div>
                   </label>
                </div>

             <div
                 className= "bg-base-100 py-4 pl-4 rounded-lg  text-sm my-4 border-1 border-[#d5cbcb]"
                  >
                  <label className="flex gap-4 items-start cursor-pointer ">
                    <input type="radio" className="w-3 h-3 mt-2" name="payment-method" value="COD" onChange={()=>setType("COD")}  />
      
                      <span className="font-semibold text-neutral text-lg">COD</span>
                      
                   </label>
                </div>

                
              </div>
                <button 
                className=" bg-neutral text-base-100 text-center font-bold rounded mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={loading}>
       
          <div className="mx-auto w-full  py-4 cursor-pointer" onClick={()=>placeOrderhandler(type)}>{loading?"Processing...":"PLACE ORDER"}</div>
          
          </button>
            
          </div>
    
 
    </div>
  )
}

export default Payment