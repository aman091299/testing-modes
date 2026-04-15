'use client'
import {useEffect, useState} from 'react'

const PaymentOrderSummary = ({cartItems,totalSum}) => {
    const   [isShowFullText,setIsShowFullText]=useState(false);
   
  return (
    <div className="text-black   min-w-full  py-2 border-1 border-[#ececec] rounded ">
         <div className="px-4 font-semibold">
             <div className="border-b-1 py-2">Order Summary({cartItems?.length} items)</div>
             
        </div>
        <div>
        {cartItems?.map(item=>(
                <div className="w-full px-4 py-3" key={item._id}>
           <div className="bg-[#f9f9f9] py-4 pl-4 rounded-lg text-[#616161] text-sm">
            <div className="font-semibold text-neutral mb-1">{item.name}</div>
            <div className="flex gap-3  items-center border-b-1 text-[#616161] border-dashed pb-4 ">
                 <div className="line-through">₹{item.actualPrice}.00</div>
                 <div className="text-black font-semibold">₹{item.price}.00</div>
                 <div>24% Off.</div>
                  <div>Quantity:{item.itemQuantity}</div>
            </div> 
           </div>
            </div>
        ))}
           
        </div>
        <div className="py-3">
            <div className="px-4">
                <div className="flex justify-between text-sm font-semibold text-neutral">
                    <div>Price Summary</div>
                    <div onClick={()=>setIsShowFullText(prev=>!prev)}>{isShowFullText?"Show More":"Show Less"}</div>
                </div>
              {isShowFullText &&<>
                      <div className="  border-b-1 w-full my-3 mr-10"></div>

               <div className="flex justify-between text-[#616161] text-sm ">
                    <div>Item Total</div>
                    <div>₹{totalSum}.00</div>
                </div>

                  <div className="flex justify-between mt-4 text-[#616161] text-sm ">
                    <div>Sub Total</div>
                    <div>₹{totalSum}.00</div>
                </div>
                </>
              }
    
    <div className="border-dashed border-[#d9d9d9] border-1 w-full my-4 mr-10"></div>

                 <div className="flex justify-between font-semibold text-neutral ">
                    <div>Grand Total</div>
                    <div>₹{totalSum}.00</div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default PaymentOrderSummary