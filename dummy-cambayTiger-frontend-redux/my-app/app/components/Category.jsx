"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(null);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:7000/categories");
      console.log("res", res);
      if (!res.ok) {
        throw new Error("Categories api failed ");
      }
      const data = await res.json();
     setCategories(data?.data || []);
    } catch (error) {
      console.log("Error in getting Categories", error);
       setError("Failed to load categories")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <div className="">Loading....</div>;
  }
    if (error) return <div>{error}</div>;
   if (categories.length === 0) {
    return <div>No categories found</div>;
  }
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-red-300 text-xl font-bold mt-16 mb-4">Categories</h2>
      {categories.map((cat) => (
        <Link  href={`/category/${cat._id}`}  className="cursor-pointer bg-amber-300 px-3 py-2 mb-3 rounded hover:bg-amber-400 transition" key={cat._id}>
        {cat.name}
        </Link>
      ))}
    </div>
  )
};

export default Category;
