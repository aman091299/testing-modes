import { BASE_URL } from '../utils/constants';
import AvailableCoupons from './AvailableCoupons'
import {useState,useEffect} from 'react';
import Loader from './Loader';
import {addCartItemsTotalPrice,addCartItemsDiscount} from "../store/cartSlice"
import { useDispatch ,useSelector} from 'react-redux';
import PriceSummary from './PriceSummary';

const ApplyCoupons = ({totalSum}) => {
    const [availableCoupons,setAvailableCoupons]=useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [selectedCoupon,setSelectedCoupon]=useState('');
    const [message,setMessage]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
      const user=useSelector(store=>store.user);

    useEffect(()=>{
         getAllCoupons();
        getCartCoupon();
      
    },[])
      
    const getCartCoupon=async()=>{
        try {
               const res=await fetch(BASE_URL+"/coupon/cart",{credentials:'include'});
           const data=await res.json();
           if(data?.success){
             fetchAppliedCoupon(data?.data);
           setCouponCode(data?.data);
           setSelectedCoupon(data?.data);
            setMessage("Coupon code applied successfully");

           }

        } catch (error) {
            console.log("Error in getting cart coupon",error);
        }
        
    }
 
    const  fetchAppliedCoupon=async(code)=>{
        try {
             
              setError("");
              setMessage("")
              setLoading(true);
               if(!user){
                setLoading(false);
                return setMessage("Please login");
                  
              }
              if(!code){
                  setLoading(false);
             return setError("Coupon is invalid.")
              }
            const res=await fetch(BASE_URL+"/coupon/apply",{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify({code})
            });
       
            const data=await res.json();
        
            if(data?.success){
                setCouponCode(code)
                 dispatch(addCartItemsTotalPrice(data?.data?.totalPrice));
                 dispatch(addCartItemsDiscount(data?.data?.discount))
               setMessage("Coupon code applied successfully");

            }
            else{
            dispatch(addCartItemsTotalPrice(data?.data?.totalPrice));
            setCouponCode('')
             return setError("Coupon is invalid.")
        
            }
            
        } catch (error) {
            console.log("Error while applied coupon" + error)
        }finally{
            setLoading(false)
        }
    }

    const getAllCoupons=async()=>{
        try { setLoading(true);
            const res=await fetch(BASE_URL+"/coupon/all",{credentials:'include'});
            const data=await res.json();
        
            setAvailableCoupons(data?.data)

        } catch (error) {
            console.log("Error in getting all coupon ",error)
        }finally{
            setLoading(false);
        }
    }

    const removeCoupon=async()=>{
         try {
            const res=await fetch(BASE_URL+"/coupon/remove",{credentials:'include'});
            const data=await res.json();
            if(data.success){

             dispatch(addCartItemsTotalPrice(data?.cart?.totalPrice));
                 dispatch(addCartItemsDiscount(data?.cart?.discount))

            setCouponCode('');
            setSelectedCoupon('')
            setMessage('');
            setError('');
                return;
            }

            console.log("data....",data);
         } catch (error) {
            console.log("Error in removing coupon",error);
         }
    }


  return (
    <div className="px-4">
     {loading &&<Loader/>}
    <div className="font-semibold text-2xl mb-4">Apply offers and coupons</div>
    {message && <div className="text-[#63825b] px-2 py-4 italic">{message}</div>}
    {error&&<div className="text-red-500 px-2 py-4 italic">{error}</div>}

    <div className="relative flex items-center">

    <input type="text"  placeholder="Enter Coupon Code"
    value={selectedCoupon.toLowerCase()}
    onChange={(e)=>{
    if(e.target.value===''){
      setError('');
     setMessage('')
    }
    if(!couponCode){
     setSelectedCoupon((e.target.value).trim())
    }
    }}
        className={"border-1 border-[#d8d8d8] px-4 py-4 rounded-lg w-full  text-[#858585] " 
        + (selectedCoupon?"font-semibold":"") }
    />
   { couponCode ?<button className="absolute top-1/4 right-5 text-orange-600 font-semibold cursor-pointer"
    onClick={()=>removeCoupon()}
    >REMOVE</button>
    :<button className="absolute top-1/4 right-5 text-orange-600 font-semibold cursor-pointer   "
    disabled={!selectedCoupon}
    onClick={()=>fetchAppliedCoupon(selectedCoupon)}
    >APPLY</button>} 
    </div>
    <div>
    <div className="flex justify-between mt-4">
        <div className="font-semibold text-lg">
            Available Coupons
        </div>
        <div className="text-sm text-orange-600 font-semibold flex items-center gap-2 ">
            <span>
            <svg width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
            d="M13.1163 5.42625C12.8806 5.18 12.6369 4.92625 12.545 4.70312C12.46 4.49875 12.455 4.16 12.45 3.83187C12.4406 3.22187 12.4306 2.53062 11.95 2.05C11.4694 1.56937 10.7781 1.55937 10.1681 1.55C9.84 1.545 9.50125 1.54 9.29688 1.455C9.07438 1.36312 8.82 1.11937 8.57375 0.88375C8.1425 0.469375 7.6525 0 7 0C6.3475 0 5.85812 0.469375 5.42625 0.88375C5.18 1.11937 4.92625 1.36312 4.70312 1.455C4.5 1.54 4.16 1.545 3.83187 1.55C3.22187 1.55937 2.53062 1.56937 2.05 2.05C1.56937 2.53062 1.5625 3.22187 1.55 3.83187C1.545 4.16 1.54 4.49875 1.455 4.70312C1.36312 4.92562 1.11937 5.18 0.88375 5.42625C0.469375 5.8575 0 6.3475 0 7C0 7.6525 0.469375 8.14187 0.88375 8.57375C1.11937 8.82 1.36312 9.07375 1.455 9.29688C1.54 9.50125 1.545 9.84 1.55 10.1681C1.55937 10.7781 1.56937 11.4694 2.05 11.95C2.53062 12.4306 3.22187 12.4406 3.83187 12.45C4.16 12.455 4.49875 12.46 4.70312 12.545C4.92562 12.6369 5.18 12.8806 5.42625 13.1163C5.8575 13.5306 6.3475 14 7 14C7.6525 14 8.14187 13.5306 8.57375 13.1163C8.82 12.8806 9.07375 12.6369 9.29688 12.545C9.50125 12.46 9.84 12.455 10.1681 12.45C10.7781 12.4406 11.4694 12.4306 11.95 11.95C12.4306 11.4694 12.4406 10.7781 12.45 10.1681C12.455 9.84 12.46 9.50125 12.545 9.29688C12.6369 9.07438 12.8806 8.82 13.1163 8.57375C13.5306 8.1425 14 7.6525 14 7C14 6.3475 13.5306 5.85812 13.1163 5.42625ZM9.85375 5.85375L6.35375 9.35375C6.30731 9.40024 6.25217 9.43712 6.19147 9.46228C6.13077 9.48744 6.06571 9.50039 6 9.50039C5.93429 9.50039 5.86923 9.48744 5.80853 9.46228C5.74783 9.43712 5.69269 9.40024 5.64625 9.35375L4.14625 7.85375C4.05243 7.75993 3.99972 7.63268 3.99972 7.5C3.99972 7.36732 4.05243 7.24007 4.14625 7.14625C4.24007 7.05243 4.36732 6.99972 4.5 6.99972C4.63268 6.99972 4.75993 7.05243 4.85375 7.14625L6 8.29313L9.14625 5.14625C9.19271 5.09979 9.24786 5.06294 9.30855 5.0378C9.36925 5.01266 9.4343 4.99972 9.5 4.99972C9.5657 4.99972 9.63075 5.01266 9.69145 5.0378C9.75214 5.06294 9.80729 5.09979 9.85375 5.14625C9.90021 5.1927 9.93705 5.24786 9.9622 5.30855C9.98734 5.36925 10.0003 5.4343 10.0003 5.5C10.0003 5.5657 9.98734 5.63075 9.9622 5.69145C9.93705 5.75214 9.90021 5.8073 9.85375 5.85375Z" 
            fill="#E76E1E">

            </path>
            </svg>
            </span>
            <span>{availableCoupons?.length} OFFERS</span>
            <span>
            <svg 
            width="16" 
            height="11" 
            viewBox="0 0 16 11" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
            d="M8.00002 5.68459L2.81536 10.8711L0.221191 8.27876L8.00002 0.499927L15.7789 8.27876L13.1847 10.8711L8.00002 5.68459Z" 
            fill="#000">

            </path>
            </svg>
            </span>
           
        </div>
    </div>
    {availableCoupons?.map(cop=>(
    <AvailableCoupons {...cop} key={cop._id} fetchAppliedCoupon={fetchAppliedCoupon} couponCode={couponCode} setSelectedCoupon={setSelectedCoupon}/>
    ))}
    <div className="border-t-6 border-b-6 border-[#ebebeb] mt-10 py-5">
    <div className="text-2xl px-4 font-semibold py-3">Payment Summary</div>
    <PriceSummary totalSum={totalSum}/>
    </div>
    </div>
    </div>
  )
}

export default ApplyCoupons