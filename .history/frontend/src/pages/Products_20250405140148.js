import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { product } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    product()
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Product List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Add to Blockchain</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.product_id}>
              <td>{prod.product_id}</td>
              <td>{prod.product_name}</td>
              <td>
                <button onClick={() => navigate(`/add-to-blockchain/${prod.product_id}`)}>
                  Add to Blockchain
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={() => navigate("/add-product")}>Add New Product</button>
    </div>
  );
};

export default ProductList;
