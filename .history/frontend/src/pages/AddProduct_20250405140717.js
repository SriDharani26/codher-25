import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addproduct } from "../services/api";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    const product_id = uuidv4(); // auto-generated
    const res = await addproduct({ product_id, product_name: productName });

    if (res.success) {
      alert("Product added!");
      navigate("/products");
    } else {
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        onChange={(e) => setProductName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
};

export default AddProduct;
