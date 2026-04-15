"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../components/utils/api";
const MainContent = () => {
  console.log("insdie main");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/product/delete/${productId}`, {
        method: "DELETE",
      });
      console.log("res", res);
      if (!res.ok) {
        console.log("Delete failed");
        return;
      }
      const data = await res.json();
      console.log("data", data);
      if (data?.success) {
        const updateProducts = products.filter((product) =>  product._id !== productId );
        setProducts(updateProducts);
      }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/product`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.log("failed in product api");
        setProducts(null);
      }

      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.log("error1", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <span className="text">Download Report</span>
        </a>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-cart"></i>
          <span className="text">
            <h3>298</h3>
            <p>New Orders</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-user-check"></i>
          <span className="text">
            <h3>389</h3>
            <p>Customers</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar"></i>
          <span className="text">
            <h3>$43,570</h3>
            <p>Total Revenue</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Products </h3>

            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index}</td>
                  <td>{product.name}</td>
                  <td>{product.categoryId?.name}</td>
                  <td>
                    <div className="action-btns">
                      <button
                        onClick={() => {
                          if (confirm("Edit?")) {
                            router.push(`/product/${product._id}/edit`);
                          }
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => handleDeleteProduct(product._id)}>
                        delete
                      </button>

                      <button>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="most-sold">
          <div className="head">
            <h3>Most Sold Products</h3>
            <i className="bx bx-plus"></i>
            <i className="bx bx-filter"></i>
          </div>
          <ul className="product-list">
            <li>
              <div className="product-info">
                <h4>Cargo Pant </h4>
                <p>Total Sales: 100</p>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li>
              <div className="product-info">
                <h4>GFG bagpack</h4>
                <p>Total Sales: 95</p>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li>
              <div className="product-info">
                <h4>Hoodie 3</h4>
                <p>Total Sales: 85</p>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li>
              <div className="product-info">
                <h4>GFG Black Tshirt 4</h4>
                <p>Total Sales: 75</p>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
            <li>
              <div className="product-info">
                <h4>Adidas shoes</h4>
                <p>Total Sales: 70</p>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
