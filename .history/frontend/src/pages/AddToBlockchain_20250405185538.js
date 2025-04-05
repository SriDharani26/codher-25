import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { product, addtoblockchain } from "../services/api";
import Web3 from "web3";
import ProductVerification from '../ProductVerification.json';

const AddToBlockchain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
    const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [productData, setProductData] = useState(null);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [message, setMessage] = useState('');
  const [web3, setWeb3] = useState(null);
  const [button, setButton] = useState(false);

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


    const handleAdd = async () => {
    try {
      console.log("Adding product to blockchain...");
      const prodId= productData.product_id;
      const nfcHash = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
      console.log("after hask");
      await contract.methods.addProduct(prodId, JSON.stringify(location), nfcHash).send({ from: accounts[0] });
      setMessage('Product added to blockchain!');
      setButton(true);
      console.log("Product added to blockchain:", prodId, location, nfcHash);
    } catch (err) {
      setMessage('Error adding product.');
    }
  };
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
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // 🔑 This triggers MetaMask connect popup
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("MetaMask connected");
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          
          console.log("Connected account:", accounts[0]);
  
          const networkId = Number(await web3.eth.net.getId());
          console.log("Current network ID:", networkId);
  
          const deployedNetwork = ProductVerification.networks[networkId];
          console.log("Deployed network:", deployedNetwork);
          if (!deployedNetwork) {
            console.error("Contract not deployed to this network.");
            return;
          }
  
          const instance = new web3.eth.Contract(
            ProductVerification.abi,
            deployedNetwork.address
          );
  
          setContract(instance);
          setAccounts(accounts);
        } catch (error) {
          console.error("MetaMask connection error:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };
  
    init();
  }, []);

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
      {button ? (
        <>
      {/* <button onClick={handleAdd} disabled={true}>Submit to Blockchain</button> */}
      <p>{message}</p>
      </>
    ) : (
      <>
        <button onClick={handleAdd}>Submit to Blockchain</button>
        
      </>
    )}

    </div>
  );
};

export default AddToBlockchain;



// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import ProductVerification from '../ProductVerification.json';

// const AddProduct = () => {
//   const [contract, setContract] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [prodId, setProdId] = useState('');
//   const [location, setLocation] = useState('');
//   const [nfcHash, setNfcHash] = useState('');
//   const [message, setMessage] = useState('');
//   const [web3, setWeb3] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         try {
//           // 🔑 This triggers MetaMask connect popup
//           await window.ethereum.request({ method: 'eth_requestAccounts' });
  
//           const web3 = new Web3(window.ethereum);
//           const accounts = await web3.eth.getAccounts();
          
//           console.log("Connected account:", accounts[0]);
  
//           const networkId = await web3.eth.net.getId();
//           console.log("Current network ID:", networkId);
  
//           const deployedNetwork = ProductVerification.networks[networkId];
//           if (!deployedNetwork) {
//             console.error("Contract not deployed to this network.");
//             return;
//           }
  
//           const instance = new web3.eth.Contract(
//             ProductVerification.abi,
//             deployedNetwork.address
//           );
  
//           setContract(instance);
//           setAccounts(accounts);
//         } catch (error) {
//           console.error("MetaMask connection error:", error);
//         }
//       } else {
//         alert("Please install MetaMask!");
//       }
//     };
  
//     init();
//   }, []);
  

//   const handleAdd = async () => {
//     try {
//       await contract.methods.addProduct(prodId, location, nfcHash).send({ from: accounts[0] });
//       setMessage('✅ Product added to blockchain!');
//     } catch (err) {
//       setMessage('❌ Error adding product.');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Product (Manufacturer)</h2>
//       <input placeholder="Product ID" value={prodId} onChange={(e) => setProdId(e.target.value)} />
//       <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
//       <input placeholder="NFC Hash" value={nfcHash} onChange={(e) => setNfcHash(e.target.value)} />
//       <button onClick={handleAdd}>Add Product</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default AddProduct;