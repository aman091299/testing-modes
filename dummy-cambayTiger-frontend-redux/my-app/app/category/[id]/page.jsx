import ProductCard from "../../components/ProductCard";
const page = async ({ params }) => {
  const { id } = await params;
  const getAllProducts = async () => {
    const res = await fetch(`http://localhost:7000/product/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.products;
  };

  const products = (await getAllProducts()) || [];
  console.log("products", products);
  return (
    <div className="grid grid-cols-3 gap-7 mx-4 mt-8">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default page;
