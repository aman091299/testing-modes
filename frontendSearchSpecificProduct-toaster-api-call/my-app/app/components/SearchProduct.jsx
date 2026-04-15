"use client"
import toast from "react-hot-toast";
import {useState,useEffect,useRef} from 'react'
import {products} from '../utils/constant';
import ProductCard from './ProductCard';
import {BASE_URL}  from "../utils/constant";
import SkeletonCard from "./SkeletonCard";

const SearchProduct = () => {
   const [searchText,setSearchText]=useState('');
   const [filteredProducts,setFilteredProducts]=useState(products);
   const refCount=useRef(0);
   const [loading, setLoading] = useState(false);

 const handleSearch=(e)=>{
   setSearchText(e.target.value);
   console.log(e.target.value);
  const searchProducts=products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
  console.log("searchProduct",searchProducts)
  setFilteredProducts(searchProducts);

 }
  
  const getSearchQueryProducts=async()=>{

    try{
       setLoading(true);
    const res=await fetch(BASE_URL +"/product/search?searchText="+searchText+"&page="+1+"&limit="+5);
      console.log("res in api call",res);
    if(!res.ok){
       toast.error("Failed to fetch products ❌");
      console.log("error in api call",res);
      return;
    }
         const data=await res.json();
           console.log("data",data.products);
          setFilteredProducts(data.products);
    }
    catch(error){
       console.log("Error while get search text products",error);
    toast.error("Something went wrong ⚠️");
  } finally {
    setLoading(false); 
  }
     
  }

   useEffect(()=>{
    let timer;
    if(searchText){
     setLoading(true);
    timer=   setTimeout(()=>{
   getSearchQueryProducts();
     console.log("count",refCount.current++)
      },9000)
      
    }
    return ()=>clearTimeout(timer);
   },[searchText])

    if(loading){
      return <SkeletonCard/>
    }
  return (
    <>
        <input type="text" placeholder="Search Products" value={searchText} className="mt-4 rounded border border-black px-2 py-1 mx-auto block mb-3" onChange={(e)=>handleSearch(e)}/>
        <div className="flex gap-3 flex-wrap">
       {filteredProducts?.map((product,index)=> <ProductCard product={product} key={index}/>)} 
       </div>
    </>
  )
}

export default SearchProduct