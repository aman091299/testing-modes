'use client'
import Image from "next/image";
import { useRef,useState } from "react";
import Link from "next/link";
import { categories,excludeDropdowns, formattedValue } from "../utils/constants";


const CategoryButton = () => {
  const scrollRef=useRef(null);
  const [showRightButton,setShowRightButton]=useState(false);
  const  [showLeftButton,setShowLeftButton]=useState(true);

 const checkScroll=()=>{
   const element=scrollRef.current
    if(!element){
      return;
    }
   if(element.scrollLeft > 11){
    setShowRightButton(true);
   
   }
    if(element.scrollLeft > 140){
    setShowLeftButton(false);
   }
     if(element.scrollLeft <= 50){
    setShowRightButton(false);
    setShowLeftButton(true);
   }

}

  const scroll=(direction)=>{
   
    let scrollAmount=0;
    const element=scrollRef.current
    if(!element){
      return;
    }

    if(direction==='left'){
      scrollAmount=-150;
      
    }
    if(direction==='right'){
       scrollAmount=150;

    }
    
    scrollRef.current.scrollBy({left:scrollAmount,behaviour:"smooth"});

setTimeout(checkScroll, 200);
   
  }

  return (
    <div ref={scrollRef} className=" overflow-x-auto scroll-smooth scrollbar-hide cursor-pointer pt-20">
      <div className="mx-2 shadow-lg flex items-center justify-center w-[1550px] h-24 ">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center justify-center w-full border-r-gray-300 border-r-1 h-full group "
          >
            <Image src={cat.icon} alt="navbar-icons" width={40} height={40} className="rounded-full" />
            <div className="flex justify-center  items-baseline gap-2">
              <div className="text-[11px] max-w-10 h-9 py-1">{cat.name}</div>
           {  !excludeDropdowns.includes(cat.name) && 
           <svg     
             width="6"
               height="12"  
             className="transition-transform duration-300 rotate-90 group-hover:rotate-270 fill-black group-hover:fill-red-400"
                viewBox="0 0 6 12"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L0 12V0L6 6Z" ></path>
              </svg>
           }
           {!excludeDropdowns.includes(cat.name) && 
               <div className="hidden z-100 rounded-lg absolute top-[179px] w-32 shadow-md bg-white px-2 py-3 group-hover:block ">
               {cat?.dropdown?.map((subCat,index)=>(
                <div key={index}>
                <Link href={"/collection/"+formattedValue(cat.name)+"/"+formattedValue(subCat)}>
                  <div  className="hover:bg-[#f2f2f2] px-2 py-2 rounded-lg text-[12px] cursor-pointer ">{subCat}</div>
               </Link>
                 <div className=" border-b-[#f2f2f2] border-b-1 border-b-rounded-full "></div>
                 </div>
               ))}
               </div>
               }
            </div>
          </div>
        ))}
      </div>
      {showRightButton&&
      <button
         onClick={() => scroll("left")}
        className=" absolute left-2 top-31 -translate-y-1/2 z-50 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="black"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      }
      {showLeftButton &&
       <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-31 -translate-y-1/2 z-50 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="black"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      }
    </div>
  );
};

export default CategoryButton;

