

const NewAddressInput = ({pinCode,setPinCode,address,setAddress,landmark,setLandmark,selectedLabel,setSelectedLabel,addressInputError}) => {

  return (
    <div className="text-[#616161] w-full mb-4 mt-2 ">
        <div className="mb-3">Add new address</div>
        <input type="number" placeholder='Pin Code*' 
        value={pinCode}
        onChange={(e)=>{setPinCode(e.target.value)}}
        className="border-1 border-[#ebebeb] rounded w-full py-2 px-4 outline-none mb-1 mt-2" />
          {addressInputError.pinCode&&
    <div className="text-red-600 ">{addressInputError.pinCode}</div>
    }
        <input type="text"
         placeholder='Address (House, Street, Area)*' 
          value={address }
        onChange={(e)=>{setAddress (e.target.value)}}
         className="border-1 border-[#ebebeb] rounded w-full py-2 px-4 outline-none mb-1 mt-2" />
       {addressInputError.address&&
    <div className="text-red-600">{addressInputError.address}</div>
    }
        <input type="text" 
         value={landmark}
        onChange={(e)=>{setLandmark(e.target.value)}}
        placeholder='Location/Landmark' 
        className="border-1 border-[#ebebeb] rounded w-full py-2 px-4 outline-none mb-1 mt-2" />
       {addressInputError.landmark&&
    <div className="text-red-600">{addressInputError.landmark}</div>
    }
        <div className="flex flex-col gap-7">
            <div className="text-neutral font-semibold">Save As</div>
            <div className="flex items-center gap-10">
            <div 
            className={`flex items-center gap-2 rounded-full border-1 border-[#ebebeb]  px-4 py-2   font-semibold ${selectedLabel==='Home'?"bg-orange-600 text-base-100":""}`}
            onClick={()=>setSelectedLabel('Home')}
            >
            <svg 
            width="25" 
            height="25" 
            viewBox="0 0 25 25" 
            fill="ffffff" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4157 19.7917V14.5833H14.5824V19.7917C14.5824 20.3646 15.0511 20.8333 15.6241 20.8333H18.7491C19.322 20.8333 19.7907 20.3646 19.7907 19.7917V12.5H21.5616C22.0407 12.5 22.2699 11.9062 21.9053 11.5938L13.197 3.75C12.8011 3.39583 12.197 3.39583 11.8011 3.75L3.09281 11.5938C2.73865 11.9062 2.9574 12.5 3.43656 12.5H5.2074V19.7917C5.2074 20.3646 5.67615 20.8333 6.24906 20.8333H9.37406C9.94698 20.8333 10.4157 20.3646 10.4157 19.7917Z"
                fill={` ${selectedLabel==='Home'?"rgb(255, 255, 255)":"rgba(97, 97, 97, 1)"}`}>
           </path>
            </svg>
            <div> Home</div>
           </div>
            <div 
            className={`flex items-center gap-2 rounded-full border-1 border-[#ebebeb]  px-4 py-2   font-semibold ${selectedLabel==='Office'?"bg-orange-600 text-base-100":""}`}
            onClick={()=>setSelectedLabel('Office')}

            >
               <svg 
               width="22" 
               height="22" 
               viewBox="0 0 22 22" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg">
               <path d="M17.4 6.15789H14.2V4.57895C14.2 3.70263 13.488 3 12.6 3H9.4C8.512 3 7.8 3.70263 7.8 4.57895V6.15789H4.6C3.712 6.15789 3.008 6.86053 3.008 7.73684L3 16.4211C3 17.2974 3.712 18 4.6 18H17.4C18.288 18 19 17.2974 19 16.4211V7.73684C19 6.86053 18.288 6.15789 17.4 6.15789ZM12.6 6.15789H9.4V4.57895H12.6V6.15789Z" 
                fill={` ${selectedLabel==='Office'?"rgb(255, 255, 255)":"rgba(97, 97, 97, 1)"}`}>
               </path>
               </svg>
               <div>Office</div>
               </div>
            <div 
            className={`flex items-center gap-2 rounded-full border-1 border-[#ebebeb]  px-4 py-2   font-semibold ${selectedLabel==='Others'?"bg-orange-600 text-base-100":""}`}
            onClick={()=>setSelectedLabel('Others')}
                  >
               <svg 
               width="22" 
               height="22" 
               viewBox="0 0 22 22" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg">
               <path 
               d="M11.0007 10.5423C10.3929 10.5423 9.80997 10.3009 9.3802 9.8711C8.95043 9.44133 8.70898 8.85844 8.70898 8.25065C8.70898 7.64286 8.95043 7.05997 9.3802 6.6302C9.80997 6.20043 10.3929 5.95898 11.0007 5.95898C11.6084 5.95898 12.1913 6.20043 12.6211 6.6302C13.0509 7.05997 13.2923 7.64286 13.2923 8.25065C13.2923 8.5516 13.233 8.8496 13.1179 9.12763C13.0027 9.40567 12.8339 9.6583 12.6211 9.8711C12.4083 10.0839 12.1557 10.2527 11.8776 10.3679C11.5996 10.483 11.3016 10.5423 11.0007 10.5423ZM11.0007 1.83398C9.29884 1.83398 7.66674 2.51002 6.46338 3.71338C5.26002 4.91674 4.58398 6.54885 4.58398 8.25065C4.58398 13.0632 11.0007 20.1673 11.0007 20.1673C11.0007 20.1673 17.4173 13.0632 17.4173 8.25065C17.4173 6.54885 16.7413 4.91674 15.5379 3.71338C14.3346 2.51002 12.7025 1.83398 11.0007 1.83398Z" 
                fill={` ${selectedLabel==='Others'?"rgb(255, 255, 255)":"rgba(97, 97, 97, 1)"}`}>

               </path>
               </svg>
                 <div>Others</div>
               </div>
                 </div>
                         {addressInputError.label&&
    <div className="text-red-600 ">{addressInputError.label}</div>
    }
  
        </div>
    </div>
  )
}

export default NewAddressInput