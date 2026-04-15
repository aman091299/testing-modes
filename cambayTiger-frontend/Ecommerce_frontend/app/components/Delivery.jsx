import {useState,useEffect} from 'react'
import { BASE_URL } from '../utils/constants';
import DeliverySlotPicker from './DeliverySlotPicker';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
const Delivery = () => {

    const [addressData,setAddressData]=useState(null);
    const [loading,setLoading]=useState(true);
    const router=useRouter();

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
         setAddressData(data?.data);
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
  return (
    <div>
      <div className="text-black  min-w-full  px-4 py-7 border-1 border-[#ececec] rounded ">
      <div className="flex flex-col gap-3">
        <div className="font-semibold"> Select delivery slot</div>
         <div className="text-[#616161] text-sm">
        Saved Address
        </div>
                {addressData &&
                <div
                 className= "bg-[#f9f9f9] py-4 pl-4 rounded-lg text-[#616161] text-sm my-4 border-1 border-[#ebebeb]"
                  >
             
                  <div className="flex gap-3 items-center">
                    <div>
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="10"
                          stroke="#D8D8D8"
                          fill= "rgba(0, 158, 78, 1)"        
                        ></circle>
                        <path
                          d="M6 10.184l3 3L15.184 7"
                          stroke="#fff"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-bold text-neutral mb-1">
                      <div><span>Deliver to</span> <span>{addressData?.label}</span> </div>
                    </div>
                  </div>
                 

                  <div className="flex flex-col gap-2  font-semibold text-[#616161] py-2 ">
                    <div>
                      {addressData
                       &&
                      addressData?.street.charAt(0).toUpperCase() +
                         addressData?.street.slice(1) +
                          " " +
                         addressData?.landmark?.charAt(0).toUpperCase() +
                         addressData?.landmark?.slice(1)}
                    </div>
                    <div>
                      
                        <div>
                          {addressData?.city + " " + addressData?.state + " " + addressData?.pinCode}
                        </div>
                      {" "}
                    </div>
                  </div>
                </div>
                }
              </div>
               <DeliverySlotPicker/>
          </div>
    
 
    </div>
  )
}

export default Delivery