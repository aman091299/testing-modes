'use client'

import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const GeoLocation = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [isTextDetect, setIsTextDetect] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [manualLocation,setManualLocation]=useState('');
  const [suggestions,setSuggestions]=useState([]);
  console.log("inside geoLocation");
  const [error,setError]=useState('');

  useEffect(() => {
    detectMyLocation();
  }, []);

  useEffect(()=>{
     if(manualLocation !==''){
    const timer=setTimeout(()=>{
     
       fetchSuggestions(manualLocation);

    
    },200)
    
    return ()=>{
      clearTimeout(timer);
    }  }
  },[manualLocation])

  
  const getCoordinatesFromAddress = async (address) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
    
    const data = await res.json();

    if (data[0]?.lat && data[0]?.lon) {
      // Use the coordinates to get the full address
      reverseGeocode(data[0]?.lat, data[0]?.lon);
    } else {
      setError("Could not find location for the given address.");
    }
  } catch (err) {
    console.log("Error fetching location from address:", err);
    setError("Something went wrong. Please try again.");
  }
};



const fetchSuggestions = async (query) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSuggestions(data);
  } catch (err) {
    console.log("Error fetching suggestions", err);
  }
};
  //getting use current location
  const detectMyLocation = () => {
    try {
      console.log("inside detect my locations")
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
        const { longitude, latitude } = pos.coords;
        reverseGeocode(latitude, longitude);
      } ,(err) => {
        // console.error("Geolocation error:", err);
           console.log("inside detect my locations3",err)
        if (err.code === 1) {
          setError("Unable to retrieve your location.");
        } else if (err.code === 2) {
          setError("Location unavailable.");
        } else if (err.code === 3) {
          setError("Location request timed out.");
        } else {
          setError("Unable to retrieve your location.");
        }
     } );
    } catch (err) {
                 console.log("inside detect my locations4",err)

      console.error("Errorin getting user location : ", err);
    }
  };



  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        BASE_URL + "/user/reverseGeocode?lat=" + lat + "&lng=" + lng,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      const address = data?.data?.address;
      setUserAddress(address);
      setLocationModal(false);
      setIsTextDetect(false);
      setError('')
    } catch (err) {
      
      console.log("ireverseGeocode",err)
      // console.error("Errorin getting user location : ", err);
      setIsTextDetect(false);
    }
  };

  return (
    <div className="relative w-full">
     {locationModal  && (
      <div className="fixed inset-0  bg-white/30">
          <div className="relative w-full flex flex-col">
            <div className="absolute text-neutral top-21 left-24 flex flex-col gap-3 justify-center text-center bg-white py-6 px-4 rounded-lg shadow-lg w-1/3">
              <div
                className="absolute text-xl text-black  right-5 top-1 cursor-pointer"
                onClick={() => setLocationModal(false)}
              >
                x
              </div>
              <div className="text-2xl font-semibold  ">
                Welcome to Cambay Tiger
              </div>
              <div className="">
                Cart will get empty on changing the address
              </div>

              <button
                className="font-semibold  bg-orange-600 rounded-full text-base-100 py-2 cursor-pointer"
                onClick={() => {
                  setIsTextDetect(true);
                  detectMyLocation();
                }}
              >
                <div className="flex justify-center items-center gap-3">
                  <svg width="1em" height="1em" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M13.538.238a1.152 1.152 0 00-1.26-.094L.606 6.511a1.164 1.164 0 00-.032 2.024l2.756 1.622 6.587-5.49-5.25 6.417v2.917l2.238-1.741 2.687 1.58a1.164 1.164 0 001.726-.744L13.97 1.424a1.15 1.15 0 00-.432-1.186z"
                      fill="#fff"
                    ></path>
                  </svg>

                  <span>
                    {isTextDetect
                      ? "Detecting your location..."
                      : "Detect my location"}
                  </span>
                </div>
              </button>

              <div>
                <span></span>
                <span className="w-[43%] h-[1px] border-t bg-neutral "></span>
                <span> OR</span>
                <span className="w-[43%] h-[1px] border-t bg-neutral "></span>
              </div>
              <div className="relative">
              <input
                type="text"
                className="rounded-full w-full focus:outline-none border-1 py-3 px-3 "
                placeholder="Please enter delivery location"
                value={manualLocation}
                onChange={(e)=>setManualLocation(e.target.value)}
           
              />
              {
                suggestions.length !==0 && 
                <div className="absolute rounded-lg py-4  w-[90%] shadow-lg bg-white overflow-y-auto max-h-[200px] text-left">
                      {suggestions.map( (sug,index)=>(
                        <div className={"px-6 py-2 text-[#616161] " + (index===suggestions.length-1?"border-b-0":"border-b-1 border-[#c1c1c1]")} key={index} onClick={()=>{
                            setIsTextDetect(true);
                            setSuggestions([])
                          getCoordinatesFromAddress(sug.display_name)
                          }}>
                        {sug.display_name}
                        </div>
                      ))}
                </div>
              }
              </div>
              {error &&
               <div className="text-red-600"> {error} </div>

              }
              
            </div>
          </div>
   
      </div>
           )}
      <div
        className="flex justify-center items-center gap-4 cursor-pointer"
        onClick={() =>{console.log("location is visible")
          setLocationModal(true)}}
      >
        <svg
          width="1.5em"
          height="2em"
          viewBox="0 0 23 24"
          fill="none"
          color="#fff"
          className=" flex items-end"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.75 10.25C6.75 7.625 8.5 5 12 5s5.25 2.625 5.25 5.25S12 19 12 19s-5.25-6.125-5.25-8.75zm3.5 0a1.75 1.75 0 103.5 0 1.75 1.75 0 00-3.5 0z"
            fill="#fff"
            opacity="1"
          ></path>
        </svg>
        <div className="text-base-100 ">
          {!userAddress && "Select the location" }
          {userAddress?.residential && userAddress?.residential}
            {!userAddress?.residential && userAddress?.road}

          {" "}
          {userAddress?.city} {" "}
           {!userAddress?.city&&userAddress?.state_district}{" "}
          {!userAddress?.residential && userAddress?.state}
         
        </div>
        <div>
          <svg
            width="19"
            height="20"
            viewBox="0 0 16 10"
            fill="none"
            className="flex items-end mt-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99999 5.17192L11.95 0.221924L13.364 1.63592L6.99999 7.99992L0.635986 1.63592L2.04999 0.221924L6.99999 5.17192Z"
              fill="#fff"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GeoLocation;
