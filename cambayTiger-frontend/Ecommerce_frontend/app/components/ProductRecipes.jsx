'use client'
import Image from "next/image";
import { useState } from "react";

const ProductRecipes = ({recipesInfo,moreInfo,nutritionInfo}) => {

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="flex justify-between shadow-sm mt-10 w-full px-4 py-4">
      <div className="w-full">
        <div className="flex justify-evenly   mr-3 w-full px-4  font-semibold text-[#616161]">
          <div className={(activeIndex===0?"text-orange-600 border-b-1 w-1/3":"border-b-1 border-bg-[#ebebeb] w-1/3") + " px-17 py-3"} 
          onClick={()=>setActiveIndex(0)}>
          Nutri info
          </div>
          <div className={(activeIndex===1?"text-orange-600 border-b-1 w-1/3":"border-b-1 border-bg-[#ebebeb] w-1/3") + " px-17 py-3"}
           onClick={()=>setActiveIndex(1)}
           >More info
            </div>
          <div className={(activeIndex===2?"text-orange-600 border-b-1 w-1/3":"border-b-1 border-bg-[#ebebeb] w-1/3") + " px-17 py-3"} 
           onClick={()=>setActiveIndex(2)}
           >Recipes
            </div>
    
        </div>
        <div className="px-10 py-4 ">
          {activeIndex === 0 && (
            <div>
              <div className="font-semibold py-2">
              
                     {nutritionInfo.heading}
              </div>
              <ul className="list-disc pl-5 text-sm">
              {nutritionInfo?.content?.map((list,index)=>{
                 
                  return <li key={index}>{list}</li>
              })}
               
              </ul>
            </div>
          )}
          {activeIndex === 1 && (
            <div>
              <div className="font-semibold py-2">  {moreInfo?.heading}</div>
              <ul className="list-disc pl-5 text-sm">
                 {moreInfo?.content?.map((list,index)=>{
                 
                  return <li key={index}>{list}</li>
              })}
              </ul>
            </div>
          )}
          {activeIndex === 2 && (
            <div>
              <div className="font-semibold py-2">  {recipesInfo?.heading}</div>
              <ul className="list-disc pl-5 text-sm">
                  {recipesInfo?.content?.map((list,index)=>{
                 
                  return <li key={index}>{list}</li>
              })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
      {activeIndex===0 &&nutritionInfo?.image&&
         <Image
          src={nutritionInfo?.image}
          alt="Product Nutrition Image"
          height={900}
          width={800}
        />
      }
       {activeIndex===1 &&moreInfo?.image&&
            <Image
          src={moreInfo?.image}
          alt="Product Recipes Image"
          height={900}
          width={800}
        />
        }
        {activeIndex===2 &&recipesInfo?.image&&
          <Image
          src={recipesInfo?.image}
          alt="Product Recipes Image"
          height={900}
          width={800}
        />
      }
      </div>
    </div>
  );
};

export default ProductRecipes;
