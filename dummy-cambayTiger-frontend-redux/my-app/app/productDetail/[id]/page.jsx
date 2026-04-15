"use client";

import { use, useEffect,useState } from "react";
import ProductCard from "../../components/ProductCard";
const Page = ({ params }) => {
  const { id } = use(params);
  const [product,setProduct]=useState(null);
  const [loading,setLoading]=useState(true);

  const getProductDetails = async () => {
    try {
      const res = await fetch(`http://localhost:7000/productDetail/${id}`);
      if (!res.ok) {
        throw new Error("failed  in api of getting product Data");
      }
      const data = await res.json();
      setProduct(data?.product);
    } catch (error) {
      console.log("Error in getting product Data",error)
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);
  if(loading){
    return <div>loading...</div>
  }
  if(!product){
    return <div> product not found</div>
  }
  console.log("product",product)
  return (
    <div>
      <ProductCard product={product}/>
     
    </div>
  );
};

export default Page;
