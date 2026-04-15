"use client"
import Image from "next/image";
import Link from "next/link"
import {useDispatch, useSelector} from "react-redux";
import  {addItemsToCart, removeItemToCart,addCartItems} from "../store/slice/cartSlice"
const ProductCard = ({ product }) => {
  const { name, image, price, description ,_id} = product;
  const dispatch=useDispatch();
  const cartCount=useSelector(store=>store.cart.count)

  return (
  <Link href={`/productDetail/${_id}`}>
  <div className="max-w-70 border-red-400 border px-4 py-3 bg-amber-400">
    <Image src={image} alt="product image" width={201} height={133} />
    <h4 className="mt-3">{name}</h4>
    <p className="mt-3">{description}</p>
    <p className="mt-3">{price}</p>
  
    {cartCount ===0 ?  
    <button 
    className="mt-3 cursor-pointer px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition"
    onClick={(e)=>{
        e.preventDefault();  
        
      dispatch(addItemsToCart())
        dispatch(addCartItems({ name, image, price, description ,_id}))
    }}>Add to Cart
     </button>:
     <div className="">
          <button
          onClick={(e)=>{
        e.preventDefault();  
        
      dispatch(addItemsToCart())
         dispatch(addCartItems({ name, image, price, description ,_id}))
    }}
          >+</button>
          {cartCount}
          <button onClick={(e)=>{
        e.preventDefault();  
        
      dispatch(removeItemToCart())
    }}>-</button>
    </div>}
    
  
  </div>
</Link>
  );
};

export default ProductCard;
