import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { product } from "../services/api";
import "../styles/Products.css"; // Make sure to create this file

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await product();
      setProducts(res);
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="products-card">
        <h2 className="products-title">Product List</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((prod) => (
                <tr key={prod.product_id}>
                  <td>{prod.product_id}</td>
                  <td>{prod.product_name}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(`/addtoblockchain/${prod.product_id}`)
                      }
                    >
                      View Product
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="add-button"
          onClick={() => navigate("/addproduct")}
        >
          + Add New Product
        </button>
      </div>
    </div>
  );
};

export default Products;
