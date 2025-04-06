// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { addproduct, product } from "../services/api"; // fetch all products too

// const AddProduct = () => {
//   const [productName, setProductName] = useState("");
//   const [newProductId, setNewProductId] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const generateIncrementId = async () => {
//       const allProducts = await product();
//       if (Array.isArray(allProducts) && allProducts.length > 0) {
//         const maxId = allProducts.reduce((max, prod) => {
//           const num = parseInt(prod.product_id.replace("PID", ""), 10);
//           return num > max ? num : max;
//         }, 0);

//         const nextId = `PID${(maxId + 1).toString().padStart(6, "0")}`;
//         setNewProductId(nextId);
//       } else {
//         setNewProductId("PID000001");
//       }
//     };

//     generateIncrementId();
//   }, []);

//   const handleAdd = async () => {
//     const newProduct = {
//       product_id: newProductId,
//       product_name: productName,
//     };

//     const res = await addproduct(newProduct);
//     if (res.status === "success") {
//       alert("Product added!");
//       navigate("/products");
//     } else {
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Add Product</h2>
//       <p>
//         <strong>Product ID:</strong> {newProductId}
//       </p>
//       <label>Product Name: </label>
//       <input
//         type="text"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//       />
//       <br />
//       <br />
//       <button onClick={handleAdd} disabled={!productName || !newProductId}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addproduct, product } from "../services/api";
import "../styles/AddProduct.css"; // Make sure to create and import the CSS file

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [newProductId, setNewProductId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const generateIncrementId = async () => {
      const allProducts = await product();
      if (Array.isArray(allProducts) && allProducts.length > 0) {
        const maxId = allProducts.reduce((max, prod) => {
          const num = parseInt(prod.product_id.replace("PID", ""), 10);
          return num > max ? num : max;
        }, 0);

        const nextId = `PID${(maxId + 1).toString().padStart(6, "0")}`;
        setNewProductId(nextId);
      } else {
        setNewProductId("PID000001");
      }
    };

    generateIncrementId();
  }, []);

  const handleAdd = async () => {
    const newProduct = {
      product_id: newProductId,
      product_name: productName,
    };

    const res = await addproduct(newProduct);
    if (res.status === "success") {
      alert("✅ Product added!");
      navigate("/products");
    } else {
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-card">
        <h2>Add Product</h2>

        <div className="form-group">
          <label>Product ID:</label>
          <input type="text" value={newProductId} readOnly />
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <button
          className="submit-btn"
          onClick={handleAdd}
          disabled={!productName || !newProductId}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
