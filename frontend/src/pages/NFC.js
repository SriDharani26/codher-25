<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductVerification from '../ProductVerification.json';
=======
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ProductVerification from "../ProductVerification.json";
>>>>>>> Stashed changes
import QRCode from "react-qr-code";

const TransferOwnership = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [prodId, setProdId] = useState("");
  const [location, setLocation] = useState("");
  const [oldHash, setOldHash] = useState("");
  const [newHash, setNewHash] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [status, setStatus] = useState("");
  const [web3, setWeb3] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Load web3
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProductVerification.networks[networkId];
      const instance = new web3.eth.Contract(
        ProductVerification.abi,
        deployedNetwork && deployedNetwork.address
      );

      setWeb3(web3);
      setContract(instance);
      setAccounts(accounts);
    };

    init();
  }, []);

  useEffect(() => {
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
    getLocation();
  }, []);

  const handleTransfer = async () => {
    try {
        const newHash =  Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
        console.log("New Hash:", newHash);
        const newOwner = accounts[0];
        console.log("New Owner:", newOwner);
        console.log("Old Hash:", oldHash);
        console.log("Location:", location);
        console.log("Product ID:", prodId);
        console.log("Timestamp:", timestamp);
      await contract.methods
        .transferOwnership(
          prodId,
          JSON.stringify(location),
          newHash,
          oldHash,
          newOwner
        )
        .send({ from: accounts[0] });
      setStatus("✅ Ownership transferred");
    } catch (err) {
      setStatus("❌ Transfer failed");
    }
  };

  const handleVerify = async () => {
    const data = await contract.methods.getProduct(prodId).call();
    // console.log();
    console.log("Product data:", data);
    setProductInfo(data);
  };

  // const productJSON = productInfo && productInfo.length >= 5
  // ? JSON.stringify({
  //     prodId: productInfo[0],
  //     location: productInfo[1],
  //     timestamp: new Date(Number(productInfo[2]) * 1000).toLocaleString(),
  //     nfcHash: productInfo[3],
  //     owner: productInfo[4],
  //   })
  // : "";

  const productQRString =
  productInfo && prodId
    ? `PID: ${productInfo[0]}, Location: ${productInfo[1]}, Time: ${new Date(Number(productInfo[2]) * 1000).toLocaleString()}, NFC: ${productInfo[3]}, Owner: ${productInfo[4]}`
    : "";


=======
  const productJSON = productInfo
    ? JSON.stringify({
        prodId: productInfo[0],
        location: productInfo[1],
        timestamp: productInfo[2].toString(), // ensure it's string
        nfcHash: productInfo[3],
        owner: productInfo[4],
      })
    : null;
>>>>>>> Stashed changes

  return (
    <>
      <div>
        <h2>Transfer Ownership</h2>
        <input
          placeholder="Product ID"
          value={prodId}
          onChange={(e) => setProdId(e.target.value)}
        />
        {/* <input placeholder="New Location" value={location} onChange={(e) => setLocation(e.target.value)} /> */}
        <input
          placeholder="Previous NFC Hash"
          value={oldHash}
          onChange={(e) => setOldHash(e.target.value)}
        />
        {/* <input placeholder="New NFC Hash" value={newHash} onChange={(e) => setNewHash(e.target.value)} /> */}
        {/* <input placeholder="New Owner Wallet" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} /> */}
        <button onClick={handleTransfer}>Transfer</button>
        <p>{status}</p>
      </div>
      <div>
        <h2>Verify Product Info</h2>
        <input
          placeholder="Product ID"
          value={prodId}
          onChange={(e) => setProdId(e.target.value)}
        />
        <button onClick={handleVerify}>Check</button>

        {productInfo && (
  <div style={{ marginTop: 10 }}>
    <p><strong>Prod ID:</strong> {productInfo[0]}</p>
    <p><strong>Location:</strong> {productInfo[1]}</p>
    <p><strong>Timestamp:</strong> {new Date(Number(productInfo[2]) * 1000).toLocaleString()}</p>
    <p><strong>NFC Hash:</strong> {productInfo[3]}</p>
    <p><strong>Owner:</strong> {productInfo[4]}</p>
  </div>
)}

{productInfo && prodId && (
  <div style={{ marginTop: 20 }}>
    <h4>QR Code for NFC Storage</h4>
    {/* <QRCode value={productJSON} size={256} />
    <pre style={{ marginTop: 10, backgroundColor: "#f0f0f0", padding: 10 }}>
      {productJSON}
    </pre> */}
<QRCode value={productQRString} size={256} />
<pre style={{ marginTop: 10, backgroundColor: "#f0f0f0", padding: 10 }}>
  {productQRString}
</pre>

  </div>
)}
        </div>

      </>
=======
      </div>
      <div style={{ marginTop: 20 }}>
        <h4>QR Code for NFC Storage</h4>
        <QRCode value={productJSON} size={256} />
        <pre style={{ marginTop: 10, backgroundColor: "#f0f0f0", padding: 10 }}>
          {productJSON}
        </pre>
      </div>
    </>
>>>>>>> Stashed changes
  );
};

export default TransferOwnership;