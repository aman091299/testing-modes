'use client'

const UserDetail= ({firstName,lastName,emailId,addresses,paymentMode}) => {
   console.log("inside userdetails page,,,,,,,,,,,",addresses[0])
  const {pinCode,street,landmark,city,state}=addresses[0];
  return (
    <div className="text-black   min-w-full  py-2 border-1 border-[#ececec] rounded ">
         <div className="font-semibold mb-4">
             <div className="border-b-2 border-[#d9d9d9] py-6 text-2xl px-10">Customer Information</div>
             <div className='px-10 text-[#616161]'>
             <div className=" text-xl mt-10 mb-4">
                Contact Information
             </div>
             <div className="flex flex-col gap-4">
                <div>
                Name:<span className="text-neutral ml-3">{firstName} {lastName}</span>
             </div>
             <div>
               E-mail ID :<span className="text-neutral ml-3">{emailId}</span>
             </div>
             <div>
               Contact number :<span className="text-neutral ml-3">+919470558225</span>
             </div>
             </div>
             
             </div>
             <div className="px-10">
            <div className="border-b-2 border-[#d9d9d9] mt-7 text-2xl "></div>
            <div className="mt-6">
                <div className="text-[#616161]">SHIPPING ADDRESS</div>
               <div>{firstName} {lastName}</div>
                <div className="my-4">
                <div>{street}</div>
                <div>{landmark},</div> 
              {city.toUpperCase()}, {state} - {pinCode}</div>
            </div>
             <div>+919160558225</div>
             </div>
                  <div className="px-10">
            <div className="border-b-2 border-[#d9d9d9] mt-7 text-2xl "></div>
            <div className="mt-6">
                <div className="text-[#616161]">BILLING ADDRESS</div>
               <div>{firstName} {lastName}</div>
                <div className="my-4">
                <div>{street}</div>
                <div>{landmark},</div> 
              {city.toUpperCase()}, {state} - {pinCode}</div>
            </div>
             <div>+919160558225</div>
             </div>
             <div className="px-10">
            <div className="border-b-2 border-[#d9d9d9] mt-7 text-2xl "></div>
          <div className="mt-6">
                <div className="text-[#616161]">PAYMENT METHOD</div>
                <div>{paymentMode==='COD'?"Cash on Delivery":"Online Payment"}</div>
                </div>
             </div>
        </div>
     

    
    </div>
  )
}

export default UserDetail;