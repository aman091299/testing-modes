import { createCart } from "../utils/constants";
import SmallLoader from "./SmallLoader";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsInAddToCart } from "../store/cartSlice";

const CartCard = ({name,combo,price,actualPrice,itemQuantity,_id}) => {
    const [loading,setLoading]=useState(false)
     const [disableDelete,setDisableDelete]=useState(false);
     const dispatch=useDispatch();
     
// useEffect(()=>{
// setDisableDelete(false);
// },[cartItems])

   const handleCartUpdate =async (type,quantityInCart,name,price,_id) => {
    let newQuantity=quantityInCart;
          
       if (type === "add") {
    console.log("inside add quantity before adding 1",newQuantity)

      newQuantity +=1;
    }
    if (type === 'remove' && quantityInCart <= 0) return;
    if (quantityInCart > 1 &&  type === "remove") {
    console.log("inside removquantity before remove 1",newQuantity)

                 newQuantity -=1;
    }
     if (newQuantity < 0) newQuantity = 0
     if(type==='delete'){
    console.log("inside delete quantity before delete after it would 0",newQuantity)
       setDisableDelete(true)
      newQuantity=0;
     }
    //  if(type !== 'delete'){
    //       console.log("inside not inside delete",newQuantity)

    //  setLoading(true);
    //  }


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

  return (
 
           <div className="px-4 py-6 " key={_id}>
                  <div className={" shadow-lg px-4 border-1 border-[#ececec] rounded  " + (disableDelete ? " opacity-35 ":" opacity-100 ")}
                  >
                    <div className="flex justify-between mt-4">
                      <div className="text-black  font-semibold text-sm">
                        {name}
                      </div>
                      <div
                        className="px-4 cursor-pointer"
                      onClick={()=>{
                        handleCartUpdate('delete',itemQuantity,name,price,_id)}}
                        disabled={disableDelete}

                      >
                        <svg
                          width="14"
                          height="17"
                          viewBox="0 0 14 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.5 2.93423H10.9062L9.84375 1.19165C9.59375 0.787118 9.03125 0.444824 8.5625 0.444824H5.40625C4.9375 0.444824 4.375 0.787118 4.125 1.19165L3.0625 2.93423H0.5C0.21875 2.93423 0 3.18317 0 3.43211V3.92999C0 4.21005 0.21875 4.42788 0.5 4.42788H1L1.65625 14.9767C1.6875 15.7547 2.375 16.377 3.15625 16.377H10.8125C11.5938 16.377 12.2812 15.7547 12.3125 14.9767L13 4.42788H13.5C13.75 4.42788 14 4.21005 14 3.92999V3.43211C14 3.18317 13.75 2.93423 13.5 2.93423ZM5.40625 1.93847H8.5625L9.15625 2.93423H4.8125L5.40625 1.93847ZM10.8125 14.8834H3.15625L2.5 4.42788H11.4688L10.8125 14.8834Z"
                            fill="#BEBEBE"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="flex mt-4  justify-between items-center py-4">
                      <div className="bg-blue-100 text-blue-400 text-sm px-1 flex items-center">
                        Combo of {combo ? combo : "3"}
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="ml-2  text-[12px] text-[#a9a9a9] line-through"
                          style={{ textDecorationThickness: "1px" }}
                        >
                          ₹{actualPrice?.toFixed(2)}
                        </span>
                        <span className="font-bold text-[14px]">
                          ₹{price?.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 rounded border-1 border-[#e7e7e7] px-1  ">
                        <button
                          className={
                            "text-2xl " +
                            (itemQuantity == "1"
                              ? "text-[#dedede]"
                              : "text-orange-600 cursor-pointer")
                          }
                          disabled={itemQuantity=='1'|| loading}
                      onClick={()=>handleCartUpdate('remove',itemQuantity,name,price,_id)}
                        >
                          -
                        </button>
                        <div>{loading?<SmallLoader/>:itemQuantity}</div>
                        <button
                        disabled={loading}
                          className=" text-orange-600 text-xl cursor-pointer"
                        onClick={()=>handleCartUpdate('add',itemQuantity,name,price,_id)}

                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
 
  )
}

export default CartCard