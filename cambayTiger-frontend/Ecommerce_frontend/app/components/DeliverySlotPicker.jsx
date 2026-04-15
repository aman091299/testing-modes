

import { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/navigation';
import { BASE_URL } from '../utils/constants';

const availableDates = [
  dayjs().add(0,'day'), // Today
  dayjs().add(1, 'day'),
  dayjs().add(2, 'day'),
  dayjs().add(4, 'day'),
  dayjs().add(5, 'day'),
   dayjs().add(6, 'day'),
  dayjs().add(7, 'day'),
  dayjs().add(8, 'day'),
];

const timeSlots = [
  {
    slotValue: '8:00 - 10:00 am',
    startHour: 8,
    endHour: 10,
  },
  {
    slotValue: '10:00 - 12:00 pm',
    startHour: 10,
    endHour: 12,
  },
  {
    slotValue: '3:00 - 5:00 pm',
    startHour: 15,
    endHour: 17,
  },
  {
    slotValue: '6:00 - 8:00 pm',
    startHour: 18,
    endHour: 20,
  },
  {
    slotValue: '8:00 - 10:00 pm',
    startHour: 20,
    endHour: 22,
  },
];


export default function DeliverySlotPicker() {

  const [selectedDate, setSelectedDate] = useState(availableDates[0].format('DD-MM-YYYY'));
  const [selectedTime, setSelectedTime] = useState(timeSlots[0].slotValue);
  const [loading,setLoading]=useState(false);

const currentHour = dayjs().hour();
const router=useRouter();
  const cartItems=useSelector(store=>store.cart.cartItems);
 const totalSum= cartItems?.reduce((acc,item)=>(  acc +item.itemQuantity*item.price),0) || 0;
  
  const availableSlots=timeSlots.filter(slot=> currentHour <slot.startHour)
  
   const createDeliverySlot=async(selectedDate,selectedTime)=>{
    try {
      setLoading(true);
      console.log("deliveryDate and slot",selectedDate,selectedTime)
          const res=await fetch(BASE_URL+"/cart/deliverySlot",{
            method:'Post',
            credentials:'include',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({deliveryDate:selectedDate,deliverySlot:selectedTime})
          })
          const data=await res.json();
          console.log("data in delivery slot...",data);
          if(data.success){
              router.push("/checkout/payment");
          }
    } catch (error) {
      console.log("Error in creating delivery Slot",error)
    }finally{
      setLoading(false);
    }
   }

  return (

    <div>
       <div>
      <div className="font-semibold mb-4"> Select delivery slot</div>
          <div className="flex  gap-4  flex-wrap mb-4">
         {
            availableDates.map( (date)=>(
        <div key={date.format()}
        onClick={()=>setSelectedDate(date.format('DD-MM-YYYY'))}
        className={" text-base-100 font-semibold flex flex-col  items-center py-2 px-4 w-fit rounded-lg "
        + (selectedDate===date.format('DD-MM-YYYY')? "bg-orange-600":"bg-base-100 text-neutral border-1 border-[#ececec] ")}>
             <div>{date.format('DD MMM')} </div>
            <div>{date.format('ddd')}</div>
              </div>
            ))
         }
            
       
       </div>
       <div className="flex flex-wrap gap-6">
       {availableSlots.map((slot)=>(
       <div
       key={slot.slotValue}
       onClick={()=>setSelectedTime(slot.slotValue)}
        className={" w-fit px-4 py-2 rounded-lg text-base-100 " +
       (selectedTime===slot.slotValue?"bg-orange-600 text-base-100":"bg-base-100 border-1 border-[#ececec] text-neutral")}>
         <div >{slot.slotValue}</div>
       </div>
       ))}
       
       
       </div>
           <button className=" bg-neutral text-base-100 text-center font-bold rounded mt-4   w-full  disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} >
       
          <div className="mx-auto w-full  py-4 cursor-pointer " 
   
          onClick={()=>{
           createDeliverySlot(selectedDate,selectedTime)}}>{loading?"Processing...":"PAY ₹ "+totalSum+".00"}</div>
          
          </button>
     

       </div>
    </div>
    // <div className="max-w-md mx-auto p-4">
    //   <h2 className="text-lg font-semibold mb-2">Select slot</h2>

    //   <div className="flex flex-wrap gap-2 mb-4">
    //     {availableDates.map((date) => {
    //       const dateStr = date.format('YYYY-MM-DD');
    //       const isSelected = selectedDate === dateStr;

    //       return (
    //         <button
    //           key={dateStr}
    //           onClick={() => setSelectedDate(dateStr)}
    //           className={`px-4 py-2 rounded-md border text-center ${
    //             isSelected
    //               ? 'bg-orange-500 text-white'
    //               : 'bg-white text-black border-gray-300'
    //           }`}
    //         >
    //           <div className="text-sm font-medium">{date.format('DD MMM')}</div>
    //           <div className="text-xs">{date.format('ddd')}</div>
    //         </button>
    //       );
    //     })}
    //   </div>

    //   <div className="flex gap-4">
    //     {timeSlots.map((slot) => (
    //       <button
    //         key={slot}
    //         onClick={() => setSelectedTime(slot)}
    //         className={`px-4 py-2 rounded-md border ${
    //           selectedTime === slot
    //             ? 'bg-orange-500 text-white'
    //             : 'bg-white text-black border-gray-300'
    //         }`}
    //       >
    //         {slot}
    //       </button>
    //     ))}
    //   </div>

    //   <div className="mt-6 text-sm text-gray-700">
    //     Selected: <strong>{dayjs(selectedDate).format('DD MMM YYYY')} at {selectedTime}</strong>
    //   </div>
    // </div>
  );
}
