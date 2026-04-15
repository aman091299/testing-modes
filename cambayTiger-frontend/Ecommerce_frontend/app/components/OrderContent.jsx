import dayjs from "dayjs";

const OrderContent = ({orderDate,orderId,totalPrice,firstName,lastName,items}) => {
    const formattedDate = dayjs(orderDate).format("D MMMM, YYYY");
  return (
        <div className="min-w-[27%] border-[#d8d8d8] border-1 rounded-l-lg">
                <div className="bg-orange-600 px-4 py-2 rounded-tl-lg text-base-100 font-bold text-xl">
                {items?.length} items |
                </div>
                <div className="flex flex-col gap-10 px-6 my-4">
                    <div>
                        <div className="text-gray-400">Order Placed On</div>
                        <div className="font-bold opacity-98">{formattedDate}</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Ship to</div>
                        <div className="font-bold opacity-98">{firstName} {lastName}</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Order ID</div>
                        <div className="font-bold opacity-98">{orderId}</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Total</div>
                        <div className="font-bold opacity-98">₹{totalPrice}.00</div>
                    </div>
                     <button className="bg-orange-600  px-4 py-2 rounded-lg text-base-100 font-bold">
                        REPEAT ORDER
                     </button>

                </div>
            </div>
  )
}

export default OrderContent