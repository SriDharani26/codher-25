import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { product } from "../services/api"; // Fetches product list

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

  console.log("Products:", products);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <table border="1" cellPadding="10">
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
                    <button onClick={() => navigate(`/addtoblockchain/${prod.product_id}`)}>
                        Add to Blockchain
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

      <br />
      <button onClick={() => navigate("/addproduct")}>View Product Details</button>
    </div>
  );
};

export default Products;
