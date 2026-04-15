"use client";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import NewAddressInput from "./NewAddressInput";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import Loader from "./Loader";
import {useRouter} from 'next/navigation'

const Address = () => {
  
   console.log("inside address");
  const [loading, setLoading] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState("Home");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [newAddress, setNewAddress] = useState(true);
  const [showtoast, setShowToast] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [error, setError] = useState("");
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(0);
  const [addressInputError, setAddressInputError] = useState("");
  const [isIntaillyAddressAvailable,setIsIntaillyAddressAvailable]=useState(true);
  const router=useRouter();
  
  useEffect(() => {
    getAddress();
  }, [newAddress]);

  const getAddress = async () => {
   
    try {
      const res = await fetch(BASE_URL + "/address", {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.data?.length === 0) {
        console.log("inside this 1")
        setNewAddress(true);
        setAddressData(data?.data);
        return;
      }
      if(isIntaillyAddressAvailable){
        setNewAddress(false);
        setIsIntaillyAddressAvailable(false);
      }
       
      setAddressData(data?.data);
    } catch (error) {
      console.log("Error while getting the address", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showtoast]);

  const validateAddressInput = (pinCode, address, landmark, label) => {
    const errors = {};

    if (!pinCode || pinCode.trim() === "") {
      errors.pinCode = "PinCode is required";
    } else if (pinCode.length !== 6) {
      errors.pinCode = "PinCode length must be 6 digit";
    }

    if (!address || address.trim().length < 10) {
      errors.address = "At least address must be  10 characters";
    }
    if (!landmark || landmark.trim().length < 2) {
      errors.landmark = "At least Landmark must be 2 characters";
    }
    if (!label) {
      errors.label = "Label is required";
    }
    return errors;
  };

  const createAddress = async (pinCode, address, landmark, label) => {
    const validatedErrors = validateAddressInput(
      pinCode,
      address,
      landmark,
      label
    );
    if (Object.keys(validatedErrors).length > 0) {
      return setAddressInputError(validatedErrors);
    }
    setAddressInputError("");

    try {
      setError("");
      const res = await fetch(BASE_URL + "/address/create", {
        credentials: "include",
        method: "Post",
        headers: {
          "Content-Type": "application/json", // ✅ Tells server this is JSON
        },
        body: JSON.stringify({
          pinCode: Number(pinCode),
          address,
          label,
          landmark,
        }),
      });

      const data = await res.json();
      if (!data?.success) {
        setError(data.message);
      }
      if (data.success) {
        setShowToast(true);
        setError("");
        setPinCode("");
        setAddress("");
        setLandmark("");
        setNewAddress(false);
      }
    } catch (error) {
      console.log("Error while creating address : ", error);
    }
  };

  const handleDefaultAddress = async (_id, index) => {
    setDefaultAddressIndex(index);
    try {
      const res = await fetch(BASE_URL + "/address/update", {
        method: "Post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDefault: true, addressId: _id }),
      });
      const data = await res.json();
    } catch (error) {
      console.log("Error while setting default address : ", error);
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
    <div className="text-black  min-w-full  px-4 py-7 border-1 border-[#ececec] rounded ">
      <div className="flex flex-col gap-3">
        <div className="font-semibold"> Address</div>
        {/*   
    <GoogleMapComponent/> */}

        <div className="text-[#616161] text-sm">
          {!newAddress ? "Saved Address" : "Based on location"}
        </div>
        {!newAddress && (
          <div className="overflow-y-auto max-h-[300px] scrollbar-hide">
            {addressData?.map((add, index) => (
              <div key={index}>
                <div
                  onClick={() => handleDefaultAddress(add._id, index)}
                  className={
                    "bg-[#f9f9f9] py-4 pl-4 rounded-lg text-[#616161] text-sm my-4 " +
                    (defaultAddressIndex === index
                      ? "border-1 border-orange-600 "
                      : "border-1 border-[#ebebeb]")
                  }
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
                          stroke={
                            defaultAddressIndex === index ? "none" : "#D8D8D8"
                          }
                          fill={
                            defaultAddressIndex === index
                              ? "rgba(0, 158, 78, 1)"
                              : "none"
                          }
                        ></circle>
                        <path
                          d="M6 10.184l3 3L15.184 7"
                          stroke="#fff"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-bold text-neutral mb-1">
                      Deliver to {!add ? " Home " : add?.label}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2  font-semibold text-[#616161] py-2 ">
                    <div>
                      {!add
                        ? "NO Address Founded "
                        : add?.street.charAt(0).toUpperCase() +
                          add?.street.slice(1) +
                          " " +
                          add?.landmark?.charAt(0).toUpperCase() +
                          add?.landmark?.slice(1)}
                    </div>
                    <div>
                      {!add ? (
                       ""
                      ) : (
                        <div>
                          {add?.city + " " + add?.state + " " + add.pinCode}
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-orange-600 ">
          {!newAddress ? (
            <span className="mb-6  text-xl" onClick={() => setNewAddress(true)}>
              + Add a new address
            </span>
          ) : (
            <div>
              {addressData?.length !== 0 && (
                <span
                  className="text-neutral text-lg"
                  onClick={() => setNewAddress(false)}
                >
                  {"<"} Go back
                </span>
              )}
            </div>
          )}
        </div>
        {newAddress && (
          <NewAddressInput
            addressInputError={addressInputError}
            setLandmark={setLandmark}
            landmark={landmark}
            setPinCode={setPinCode}
            pinCode={pinCode}
            setAddress={setAddress}
            address={address}
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
          />
        )}
      </div>
      <div className=" bg-neutral text-base-100 text-center font-bold rounded mt-4   w-full ">
        {!newAddress ? (
          <div className="mx-auto w-full  py-4 cursor-pointer" onClick={()=>{
            router.push("/checkout/delivery")
          }}>PROCEED</div>
        ) : (
          <div
            className="py-4 mx-auto w-full cursor-pointer"
            onClick={() =>
              createAddress(pinCode, address, landmark, selectedLabel)
            }
          >
            ADD NEW ADDRESS
          </div>
        )}
      </div>
      {error && <div className="text-red-600 mt-1">{error}</div>}
      {showtoast && (
        <div className="toast toast-top toast-center z-1000 ">
          <div className="alert alert-success">
            <span>Address is added Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
