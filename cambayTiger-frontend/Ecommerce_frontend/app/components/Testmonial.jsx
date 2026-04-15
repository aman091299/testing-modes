"use client"
import React from "react";
import Image from "next/image";
import { useState } from "react";

const Testmonial = () => {
  const [isShowReadMore, setIsShowReadMore] = useState(false);
  return (
    <div className="flex flex-col items-center py-2 px-6  min-w-[500px]">
      <Image src="https://res.cloudinary.com/dgnp4dfhy/image/upload/v1773753879/Prahlad_Kakkar_2-faf594f6538f_tqolun.png"
        width={50}
        height={50}
        alt="Testmonial image"
      />
      <div className="font-semibold text-sm px-2 py-1">Priya Saggi</div>
      <div className="text-sm">Mrs India 2023 Queen of the world</div>
      <div className="flex">
        <div>
          <svg
            width="46"
            height="35"
            viewBox="0 0 48 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M5.03038 33.4674C2.32663 30.5957 0.875 27.3748 0.875 22.1537C0.875 12.9662 7.32463 4.73153 16.7038 0.660156L19.0479 4.27741C10.2935 9.01291 8.582 15.158 7.8995 19.0325C9.30913 18.3028 11.1545 18.0482 12.9631 18.2162C17.6986 18.6545 21.4314 22.5422 21.4314 27.3748C21.4314 29.8115 20.4634 32.1483 18.7404 33.8713C17.0174 35.5943 14.6806 36.5623 12.2439 36.5623C9.42725 36.5623 6.734 35.276 5.03038 33.4674ZM31.2804 33.4674C28.5766 30.5957 27.125 27.3748 27.125 22.1537C27.125 12.9662 33.5746 4.73153 42.9538 0.660156L45.2979 4.27741C36.5435 9.01291 34.832 15.158 34.1495 19.0325C35.5591 18.3028 37.4045 18.0482 39.2131 18.2162C43.9486 18.6545 47.6814 22.5422 47.6814 27.3748C47.6814 29.8115 46.7134 32.1483 44.9904 33.8713C43.2674 35.5943 40.9306 36.5623 38.4939 36.5623C35.6772 36.5623 32.984 35.276 31.2804 33.4674Z"
              fill="#E76E1E"
            ></path>
          </svg>
        </div>
         <div className="font-semibold text-sm px-2 py-2 text-center ">
      
        {!isShowReadMore ?
           "During my weight loss journey last year I was looking for good sources of protein and I came across ..."
            :(<>"During my weight loss journey last year I was looking for good sources of protein and I came across Cambay Tiger and the first thing I started off was their Fresh Smoked Salmon. The product was
                      fresh, tasty and healthy. In fact it became a staple at our
                      breakfast table. I was hooked and then I realised that they have a
                      very wide range of food from seafood to Mutton and Chicken and a
                      variety of marinades. The food is fresh, tasty, healthy and
                      wholesome. I wholeheartedly recommend Cambay Tiger to everyone."
                      </>)
        }
          </div>
        <div className="flex items-end">
          <svg
            className="rotate-180"
            width="46"
            height="35"
            viewBox="0 0 48 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M5.03038 33.4674C2.32663 30.5957 0.875 27.3748 0.875 22.1537C0.875 12.9662 7.32463 4.73153 16.7038 0.660156L19.0479 4.27741C10.2935 9.01291 8.582 15.158 7.8995 19.0325C9.30913 18.3028 11.1545 18.0482 12.9631 18.2162C17.6986 18.6545 21.4314 22.5422 21.4314 27.3748C21.4314 29.8115 20.4634 32.1483 18.7404 33.8713C17.0174 35.5943 14.6806 36.5623 12.2439 36.5623C9.42725 36.5623 6.734 35.276 5.03038 33.4674ZM31.2804 33.4674C28.5766 30.5957 27.125 27.3748 27.125 22.1537C27.125 12.9662 33.5746 4.73153 42.9538 0.660156L45.2979 4.27741C36.5435 9.01291 34.832 15.158 34.1495 19.0325C35.5591 18.3028 37.4045 18.0482 39.2131 18.2162C43.9486 18.6545 47.6814 22.5422 47.6814 27.3748C47.6814 29.8115 46.7134 32.1483 44.9904 33.8713C43.2674 35.5943 40.9306 36.5623 38.4939 36.5623C35.6772 36.5623 32.984 35.276 31.2804 33.4674Z"
              fill="#E76E1E"
            ></path>
          </svg>
        </div>
      </div>

      <div
        className="text-sm mt-2 cursor-pointer text-orange-600 font-medium"
        onClick={() => {
          setIsShowReadMore((prev) => !prev);
        }}
      >
        {isShowReadMore ? "Read More" : "Read Less"}
      </div>
    </div>
  );
};

export default Testmonial;
