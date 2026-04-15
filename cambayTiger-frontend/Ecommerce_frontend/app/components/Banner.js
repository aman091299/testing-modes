'use client'
import Image from "next/image";
import {useEffect, useState} from 'react'
const bannerImages=[{
  img1:"/img/fishbnr.png"
},
{
  img1:"/img/chickenbnr.png"
},
{
    img1:"/img/muttonbnr.png"
},
{
  img1:"/img/butterbnr.png"},

]
const Banner=()=>{
const [currentIndex,setCurrentIndex]=useState(0);
useEffect(()=>{
 const interval=setInterval(() => {
    setCurrentIndex(prev=>
       bannerImages.length === prev+1 ? 0 : prev+1   
    )
 }, 3000);

 return ()=>{
  clearInterval(interval)
 }
},[])
       if(!bannerImages[3].img1){
        return <div className="flex justify-between items-center w-full h-[310px] ">Loading...</div>
       }
    return(
       <div className=" relative w-full h-[300px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out" // Changed: smooth scroll animation
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Changed: shift container to show current image
      >
        {bannerImages?.map((bannerImg,index)=>(
          <div key={index} className="min-w-full h-[300px] relative "> {/* Changed: make each slide full width */}
                 <Image  src={bannerImg?.img1} 
                   fill
                     alt="banner Images"
                        className="object-cover"
                         priority
                //    className={(currentIndex ===index)?"block ":"hidden "+"object-cover transition-all duration-500 ease-in-out cursor-pointer"}
                    // layout="responsive"
                     />
                     
                     </div>
        ))}
        </div>
         {/* Dot Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, idx) => (
          <div
            key={idx}
            className={
              (currentIndex === idx ? "bg-white " : "bg-gray-400 ")+"w-2 h-2 rounded-full "
            }
          ></div>
        ))}
      </div>
        </div>
    )
}

export default Banner;