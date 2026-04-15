import Image from 'next/image';


const OrderCard = ({name,price,actualPrice,itemQuantity,combo,image}) => {
    console.log("image",image)
    
  return (
    
    <div className="bg-base-100 px-4 py-4 rounded-lg flex flex-col w-[33%] max-w-[33%] min-w-[33%]">
    <Image src={image[0]}
        width={200}
        height={200}
        alt="Product Image"
        className="rounded-lg"
    />
    <div className="flex flex-col gap-2 mt-4 mb-4">
<div className="line-clamp-3 font-medium">{name}</div>
<div className="flex gap-4">
        <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 font-medium ">Gross: 500g</div>
    <div className="text-blue-600 text-sm bg-blue-100 px-2 py-1 font-medium">Net: 250g</div>
</div>
    
        <div className="flex gap-3 items-center">
        <span className="font-medium text-xl">
        ₹{price}.00
        </span>
    <span className="text-gray-600 font-medium line-through" >
            ₹{actualPrice}.00
            </span>                           
        </div>
        <div className="flex flex-col">
    <div>quantity <span className="font-bold text-sm">x {itemQuantity}</span> </div>
    <div>item total : <span className="font-bold text-sm">₹ {itemQuantity*price}</span></div>
        </div>

    </div>    
    </div>

  )
}

export default OrderCard