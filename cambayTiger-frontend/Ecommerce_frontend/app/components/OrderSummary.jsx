'use client'
import { useSelector } from 'react-redux';
import PriceSummary from './PriceSummary';

const OrderSummary = () => {

   const cartItems=useSelector(store=>store.cart.cartItems);
   const totalSum = useSelector((store) => store.cart.totalPrice);
  return (
    <div className="text-black   min-w-full  py-2 border-1 border-[#ececec] rounded ">
         <div className="px-4 font-semibold">
             <div className="border-b-1 py-2">Order Summary({cartItems.length} items)</div>
             
        </div>
        <div>
        {cartItems.map(item=>(
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
         <PriceSummary totalSum={totalSum}/>
    </div>
  )
}

export default OrderSummary