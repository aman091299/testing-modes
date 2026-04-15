import React from 'react'

const AvailableCoupons = ({code,description,minCartValue,tag,tagColor,fetchAppliedCoupon,couponCode,setSelectedCoupon}) => {
  return (
 <div className="mt-6 border-1 border-[#d8d8d8] px-4 py-4 rounded-lg w-full">
    <div className="flex justify-between ">
        <div className='flex gap-2'>
            <button className="py-1.5 px-4 bg-green-600 text-base-100 font-semibold rounded-lg">{code}</button>
            <div className="font-semibold text-sm">{description}</div>
            
        </div>
        <button className="font-semibold cursor-pointer" 
      disabled={couponCode===code}
        onClick={()=>{
          setSelectedCoupon(code)
          fetchAppliedCoupon(code)
          }}>
        {couponCode===code?"APPLIED":"APPLY"}
        </button>
        </div>
        <div className="text-[#858585] text-sm mt-3">On orders above ₹{minCartValue}/-</div>
    </div>

  )
}

export default AvailableCoupons