import Heading from "./Heading";
import { BASE_URL } from "../utils/constants";
import SpotLightClientButton from "./SpotLightClientButton";



const getAllProduct = async () => {
  try {

    const res = await fetch(BASE_URL + "/product/allProductDetails",{credentials: "include"});
    const data = await res.json();
   
    return data.products;
  } catch (error) {
    console.log(
      "Error in spotLightContainer page while getting products : ",
      error
    );
    return null;
  }
};


const SpotLightContainer = async () => {
  console.log("inside spot light container")
  const products = await getAllProduct();


  if (!products) {
    return (
      <div className="flex justify-center items-center my-10">
        Something went wrong
      </div>
    );
  }
  if (products?.length === 0) {
    return <div className="flex justify-between items-center">No Products</div>;
  }
  return (
    <div>
      <Heading headingContent={"In the Spotlight"} />
      <SpotLightClientButton products={products} />
    </div>
  );
};

export default SpotLightContainer;
