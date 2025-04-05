import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { product, addtoblockchain } from "../services/api";

const AddToBlockchain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await product();
      const found = products.find((p) => p.product_id === id);
      setProductData(found);
    };

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setTimestamp(new Date().toISOString());
        },
        (err) => alert("Location access denied")
      );
    };

    fetchProduct();
    getLocation();
  }, [id]);

  const handleSubmit = async () => {
    const res = await addtoblockchain({
      product_id: productData.product_id,
      product_name: productData.product_name,
      location,
      timestamp,
    });

    if (res.success) {
      alert("Product added to blockchain!");
      navigate("/products");
    } else {
      alert("Blockchain submission failed");
    }
  };

  if (!productData || !location || !timestamp) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add to Blockchain</h2>
      <p>
        <strong>Product ID:</strong> {productData.product_id}
      </p>
      <p>
        <strong>Product Name:</strong> {productData.product_name}
      </p>
      <p>
        <strong>Location:</strong> {location.lat}, {location.lng}
      </p>
      <p>
        <strong>Timestamp:</strong> {timestamp}
      </p>
      <button onClick={handleSubmit}>Submit to Blockchain</button>
    </div>
  );
};

export default AddToBlockchain;
