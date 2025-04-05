import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addproduct } from "../services/api";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  const generateProductId = () => {
    return "PID" + Math.floor(Math.random() * 1000000);
  };

  const handleAdd = async () => {
    const newProduct = {
      product_id: generateProductId(),
      product_name: productName,
    };

    const res = await addproduct(newProduct);
    if (res.success) {
      alert("Product added!");
      navigate("/products");
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>
      <label>Product Name: </label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleAdd}>Submit</button>
    </div>
  );
};

export default AddProduct;
