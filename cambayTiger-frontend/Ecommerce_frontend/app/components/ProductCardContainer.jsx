import ProductCard from "./ProductCard"

const ProductCardContainer = ({products, lastProductRef}) => {
   console.log("inside product card container11")
  if(!products?.length){
    return <div className="flex justify-center items-center">No Products</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
    {products?.map((product,index)=>(
      <div key={product._id}  ref={index===products.length-1 && lastProductRef?lastProductRef:null}>
       <ProductCard {...product}  />
       </div>
    ))}
        </div>
 
  )
}

export default ProductCardContainer