
import ProductPageContainer from '@/app/components/ProductPageContainer';
import ProductRecipes from '@/app/components/ProductRecipes';
import { BASE_URL } from '@/app/utils/constants';

import Loader from '@/app/components/Loader';

  const productData=async(slug)=>{

      try {
         const res=await fetch(BASE_URL+"/product/view/"+slug);
    
         const data=await res.json();
        
            return data.product ;
      } catch (error) {
        console.log("Error while fetching a particular product : ",error);
        return {};
      }
       
     }
const Product=async({params})=>{
 const { slug } =await params;
const product=await productData(slug);
 
     if (!product) {
    return <div className="relative w-screen h-150"><Loader/></div>;
  }
      if (Object.keys(product).length === 0) {
    return <div className="flex justify-center items-center pt-34">No Products</div>;
  }
     
  return (
    <div className="px-6 pt-30 w-full">
     <ProductPageContainer {...product}/>
     <ProductRecipes {...product}/>
    </div>
  )

}

export default Product;