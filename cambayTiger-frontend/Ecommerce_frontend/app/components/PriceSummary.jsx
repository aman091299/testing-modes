import {useState} from 'react'
import { useSelector } from 'react-redux';

const PriceSummary = ({totalSum}) => {
    const [isShowFullText,setIsShowFullText]=useState(false);
    const couponDiscount = useSelector((store) => store.cart.couponDiscount)||0;
   const originalTotalPrice= useSelector((store) => store.cart.originalTotalPrice)||0;


  return (
      <div className="py-3">
            <div className="px-4">
                <div className="flex justify-between text-sm font-semibold text-neutral">
                    <div>Price Summary</div>
                    <div onClick={()=>setIsShowFullText(prev=>!prev)}>{isShowFullText?"Show More":"Show Less"}</div>
                </div>
              {isShowFullText &&<div>
                      <div className="  border-b-1 w-full my-3 mr-10"></div>

               <div className="flex justify-between text-[#616161] text-sm ">
                    <div>Item Total</div>
                    <div>₹{originalTotalPrice?.toFixed(2)}</div>
                </div>

                  <div className="flex justify-between mt-4 text-[#616161] text-sm mb-4">
                    <div>Sub Total</div>
                    <div>₹{originalTotalPrice?.toFixed(2)}</div>
                </div>
                {couponDiscount !==0 &&
                <div>
                    <div className="border-t-2  border-[#ebebeb]  pt-2 ">
                      <div className="flex justify-between font-semibold text-orange-600 ">
                    <div>Coupon Discount</div>
                    <div>-₹{couponDiscount?.toFixed(2)}</div>
                </div>
                      </div>
                </div>
                }
                </div>
              }
    
    <div className="border-dashed border-[#d9d9d9] border-1 w-full my-3 mr-10"></div>

                 <div className="flex justify-between font-semibold text-neutral ">
                    <div className="text-xl">Grand Total</div>
                    <div>₹{totalSum?.toFixed(2)}</div>
                </div>

            </div>
        </div>
  )
}

export default PriceSummary