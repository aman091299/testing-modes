import Image from "next/image"
import {useState,useMemo } from 'react';
import { addItemsInAddToCart } from "../store/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import { formattedValue } from "../utils/constants";
import { createCart } from "../utils/constants";
import SmallLoader from "./SmallLoader";
import Link from "next/link";

const Card=({image,name,description,price,_id,combo,actualPrice})=>{

    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch();
    const cartItems=useSelector(store=>store.cart.cartItems);

     const  productDetails=useMemo(()=> {
        return cartItems?.filter((item)=> item?._id ===_id)
},[cartItems, _id])
   
 const  quantityInCart  =productDetails?.[0]?.itemQuantity || 0;

  const handleCartUpdate =async (type) => {
          let newQuantity=quantityInCart;
          
       if (type === "add") {
        console.log("inside add quantity befor adding 1",newQuantity)
      newQuantity +=1;
    }
     
    if (quantityInCart > 0 &&  type === "remove") {
  console.log("inside remov quantity before remove 1",newQuantity)
                 newQuantity -=1;
    }
     if (newQuantity < 0) newQuantity = 0
     setLoading(true);
    const data=await createCart(_id,newQuantity);
      setLoading(false);
    if(data){
        dispatch(
        addItemsInAddToCart({
          itemQuantity: newQuantity,
          name: name,
          price: price,
          _id: _id,
        })
      );
         }
    }
   

  const formattedName=formattedValue(name);
    return (
        <div>
        <div className="card bg-base-100 w-74 shadow-sm px-1 py-4">
        <Link href={"/product/"+formattedName}>
  <figure>
      <Image src={image[0]|| '/default-placeholder.png'}
      height={600} width={1090} 
      alt={"Product image of " + name }
      className="h-[170px] w-[700px]" />

  </figure>
  </Link>
  <div className="card-body p-2">
         <Link href={"/product/"+formattedName}>   
    <h2 className="card-title line-clamp-1">{name}</h2>
    <p className="line-clamp-3 h-17">{description}</p>
      </Link>
    <div className="flex flex-row items-center justify-between">
     <Link href={"/product/"+formattedName}>
    <div className="text-[13px]"> Starting from ₹{price?.toFixed(2)}</div>
   </Link>
        <div>
        
              {quantityInCart === 0 ? (
                <button
                 disabled={loading}
                  className="btn btn-neutral text-[12px] flex items-center hover:bg-orange-600 hover:border-orange-600 cursor-pointer"
                  onClick={()=>handleCartUpdate('add')}
                >
                  <svg
                    className="flex items-center my-auto"
                    width="12"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.50008 4.25008H10.6306L10.9222 3.08341H3.66675V1.91675H11.6701C11.7588 1.91675 11.8463 1.93697 11.9259 1.97586C12.0056 2.01476 12.0754 2.0713 12.1299 2.14121C12.1845 2.21111 12.2224 2.29253 12.2408 2.37928C12.2591 2.46603 12.2575 2.55582 12.2359 2.64183L10.7776 8.47516C10.746 8.60131 10.6731 8.71328 10.5706 8.79328C10.4681 8.87329 10.3418 8.91674 10.2117 8.91675H1.91675C1.76204 8.91675 1.61367 8.85529 1.50427 8.74589C1.39487 8.6365 1.33341 8.48812 1.33341 8.33341V1.33341H0.166748V0.166748H1.91675C2.07146 0.166748 2.21983 0.228206 2.32923 0.337602C2.43862 0.446999 2.50008 0.595372 2.50008 0.750081V4.25008ZM2.50008 12.4167C2.19066 12.4167 1.89392 12.2938 1.67512 12.075C1.45633 11.8562 1.33341 11.5595 1.33341 11.2501C1.33341 10.9407 1.45633 10.6439 1.67512 10.4251C1.89392 10.2063 2.19066 10.0834 2.50008 10.0834C2.8095 10.0834 3.10625 10.2063 3.32504 10.4251C3.54383 10.6439 3.66675 10.9407 3.66675 11.2501C3.66675 11.5595 3.54383 11.8562 3.32504 12.075C3.10625 12.2938 2.8095 12.4167 2.50008 12.4167ZM9.50008 12.4167C9.19066 12.4167 8.89392 12.2938 8.67512 12.075C8.45633 11.8562 8.33341 11.5595 8.33341 11.2501C8.33341 10.9407 8.45633 10.6439 8.67512 10.4251C8.89392 10.2063 9.19066 10.0834 9.50008 10.0834C9.8095 10.0834 10.1062 10.2063 10.325 10.4251C10.5438 10.6439 10.6667 10.9407 10.6667 11.2501C10.6667 11.5595 10.5438 11.8562 10.325 12.075C10.1062 12.2938 9.8095 12.4167 9.50008 12.4167Z"
                      fill="white"
                    ></path>
                  </svg>
              {loading?<SmallLoader/>: <div>ADD TO CART</div>}

                </button>
              ) : (
                <div className="flex items-center  gap-5 bg-orange-600 rounded px-2 py-0.5  text-white  text-2xl">
                     <button
                     disabled={loading}
                     className="cursor-pointer"
                  onClick={()=>handleCartUpdate('remove')}
                  >
                    -
                  </button>
                  {loading?<SmallLoader/>: <div>{quantityInCart}</div>}
                 
               <button
                  onClick={()=>handleCartUpdate('add')}
                className="cursor-pointer"
                disabled={loading}
                  >
                    +
                  </button>
                </div>
              )}
            </div>  
    </div>
  </div>
</div>
        </div>
    )
}

export default Card;