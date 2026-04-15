"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../components/utils/api";
const ProductEdit = ({ params }) => {
  console.log("api base url", API_BASE_URL);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { id } = use(params);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const editProduct = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/product/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log("Edit api failed", data);
        return;
      }

      console.log("Updated:", data);
      setEdit(true);
    } catch (error) {
      console.log("Error in updating product", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct();
  };
  const getProductDetail = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/productDetail/${id}`);

      if (!res.ok) {
        console.log("Error in getting product");
        return null;
      }
      const data = await res.json();
      console.log("data", data);
      setName(data?.product?.name);
      setPrice(data?.product?.price);
      setDescription(data?.product?.description);
    } catch (error) {
      console.log("error in getting product deatils", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={handleSubmit} className="form-edit">
      <input
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={description}
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        value={price}
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Update Product</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
      {edit && <p style={{ color: "green" }}>✅ Product Updated</p>}
    </form>
  );
};

export default ProductEdit;
