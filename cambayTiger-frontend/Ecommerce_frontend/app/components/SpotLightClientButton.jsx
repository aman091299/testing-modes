'use client'
import {useEffect ,useRef,useState} from 'react';
import Card from './Card';

const SpotLightClientButton=({products})=>{
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
    return(
           <div className="relative">
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
        <div ref={scrollRef} className="flex mx-4 gap-4 mt-4  shadow-lg overflow-x-hidden scroll-smooth scrollbar-hide ">
         {products?.map(product=>(
          <Card key={product?._id} {...product} />
   ))}
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

export default SpotLightClientButton;