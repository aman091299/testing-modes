'use client'
import OrderCard from "./OrderCard"
import {useRef} from 'react';
import {useState,useEffect} from 'react';



const OrderCardContainer = ({items}) => {
    console.log("items",items)
    const scrollRef=useRef(null);
      const [showRightButton,setShowRightButton]=useState(false);
      const  [showLeftButton,setShowLeftButton]=useState(true);
   

      useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
    
        checkScroll();
        el.addEventListener('scroll', checkScroll);
    
        return () => {
          el.removeEventListener('scroll', checkScroll);
        };
      }, []); 
    
      const checkScroll=()=>{
       const element=scrollRef.current
        if(!element){
          return;
        }
        // console.log("scrollLeft",element.scrollLeft,"scrollWidth",element.scrollWidth ,"clientWidth",element.clientWidth);
    
       const maxScroll = element.scrollWidth - element.clientWidth;
      //  console.log('maxScroll',maxScroll)
        setShowLeftButton(maxScroll-120 > element.scrollLeft);
        setShowRightButton(element.scrollLeft >=20 );
    
    }
    
      const scroll=(direction)=>{ 
        const element=scrollRef.current
        if(!element){
          return;
        }
    
        const scrollAmount = direction ==='left'? -624 : 624
        // console.log('scroollAmount',scrollAmount)
        scrollRef.current.scrollBy({left:scrollAmount,behavior:"smooth"});
    
      setTimeout(checkScroll, 300);
       
      }
  return (
            <div className="relative w-full">
      {showRightButton&&
      <button
         onClick={() => scroll("left")}
        className=" absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black rounded-full shadow-md p-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      }
    <div ref={scrollRef} className="border-[#d8d8d8] border-1  px-10 py-10 flex gap-4 w-full overflow-auto scroll-smooth scrollbar-hide">  
         {items.map((item,index)=>(

              <OrderCard {...item} key={item._id+index} />
         ))     
    }
   </div>
      {showLeftButton &&
       <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black rounded-full shadow-md p-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      }
      </div>
     
  )
}

export default OrderCardContainer