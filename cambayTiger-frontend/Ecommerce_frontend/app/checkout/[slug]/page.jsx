"use client"
import OrderSummary from '../../components/OrderSummary'
import Address from '../../components/Address'
import { useParams } from 'next/navigation'
import Delivery from '../../components/Delivery'
import Payment from '@/app/components/Payment'
import { setIsShowCartModal } from '@/app/store/cartSlice'
import {  useDispatch ,useSelector } from "react-redux"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Image from 'next/image';

const page = () => {
  const cart=useSelector(store=>store.cart.cartItems);
  const user=useSelector(store=>store.user);
   const {slug}=useParams();
    const router=useRouter();
    const dispatch=useDispatch();
        // const totalSum = useSelector((store) => store.cart.totalPrice);
   
         
    // useEffect(()=>{
    //    if(!totalSum){
    //         return router.push("/")
    //       }
    //      })

  const handleCartModal=()=>{
     dispatch(setIsShowCartModal(true))
  }



  return (
    <div className="py-25 w-full px-8">
          <div className="flex  font-medium  gap-2 px-14 py-5">
          <span className={(slug==='cart'?"text-orange-600":"") + "cursor-pointer"}
          onClick={handleCartModal}
          >Cart</span>
       
          <svg width="8" height="26" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5.5 5.5L1 10" stroke="#1C1C1C">
          </path>
          </svg>
       
          <span className={(slug==='address'?" text-orange-600":"") + " cursor-pointer"}
          onClick={()=>router.push("/checkout/address")}
          >Address

          </span>
            <span className="flex items-end">
          <svg width="8" height="26" className="flex  items-end" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5.5 5.5L1 10" stroke="#1C1C1C">
          </path>
          </svg>
          </span>
         <span className={(slug==='delivery'?" text-orange-600":"") + " cursor-pointer"}
          onClick={()=>router.push("/checkout/delivery")}
          >Delivery Slot</span>
                    <span>
          <svg width="8" height="26" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5.5 5.5L1 10" stroke="#1C1C1C">
          </path>
          </svg>
          </span>
        <span className={(slug==='payment'?" text-orange-600":"") + " cursor-pointer"}
          onClick={()=>router.push("/checkout/payment")}

          >Payment

          </span>
    </div>
        <div className="flex justify-center items-center ">
           
            <div className="flex flex-col mr-10 gap-4">

            {/* <div className="border-[1.4px] border-orange-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl ">
            1
            </div> */}
           {slug==='delivery' || slug ==='payment' ?
            <div className="bg-orange-600  rounded-full w-12 h-12 flex items-center justify-center">
            <Image src="https://cambaytiger.com/plixlifefc/assets/Tick.svg"
              height={22} width={22} 
              alt="track delivery image"
              />
            </div>:
            <div className="border-[1.4px] border-orange-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl ">
            1
            </div>
            }
               <div >
                 Address
            </div>
          </div>
          <div className="border-dashed border-[#d9d9d9] border-1 w-1/8 mb-3"></div>
             <div className="flex flex-col ml-10 gap-4">
               { slug ==='payment' ?
            <div className="bg-orange-600  rounded-full w-12 h-12 flex items-center justify-center">
            <Image src="https://cambaytiger.com/plixlifefc/assets/Tick.svg"
              height={22} width={22} 
              alt="track delivery image"
              />
            </div>:
            <div className="bg-[#d9d9d9] rounded-full w-12 h-12 flex items-center justify-center text-2xl ">2</div>
               }
              <div>
                Delivery Slot
            </div>
           </div>
          <div className="border-dashed border-[#d9d9d9] border-1 w-1/8 mb-3 mr-10"></div>
            <div  className="flex flex-col gap-4">
                        <div className=" bg-[#d9d9d9] rounded-full w-12 h-12 flex items-center justify-center text-2xl ">3</div>
                   <div> Payment</div>
          </div>
      
        </div>
        <div className="flex mt-8 w-full px-10 gap-10">
            <div className="w-1/2">
                 <OrderSummary/>
            </div>
      {  slug==='address'  &&  
          <div className="w-1/2">
                <Address />       
             </div>
       }

   {  slug==='delivery'  &&  
        <div className="w-1/2">
                <Delivery />       
             </div>
    }
         {  slug==='payment'  &&  
           <div className="w-1/2">
                <Payment />       
             </div>
       }

        </div>
     
    </div>
  )
}

export default page