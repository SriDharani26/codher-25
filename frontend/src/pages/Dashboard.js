import React, { useState, useEffect, use } from "react";
import { createUser, product, addRoute, getUsers } from "../services/api"; // Importing the function from api.js
import {getPISensorHistory } from "../services/api";

const Dashboard = () => {
  // Create User States
  const [email, setEmail] = useState("");
  const [private_key, setPrivateKey] = useState("");
  const [role, setRole] = useState("other");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  //Coldchain track 
  const [sensorHistory, setSensorHistory] = useState([]);

  // Add Route States
  const [routeLocations, setRouteLocations] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // Generate password function (random 8 character string)
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  // Handle Create User Form Submission
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const generatedPassword = generatePassword();
    setPassword(generatedPassword);

    const userData = {
      email,
      password: generatedPassword,
      private_key,
      role,
    };

    try {
      const response = await createUser(userData);
      if (response.status === "success") {
        alert("User created successfully!");
        setEmail("");
        setPrivateKey("");
        setRole("other");
      } else {
        alert("Error: " + response.message);
      }
    } catch (error) {
      alert("Error creating user: " + error.message);
    }
  };

  // Fetch Products
  useEffect(() => {
    product()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        alert("Error fetching products: " + error.message);
      });
  }, []);
  console.log("Products:", products);

  useEffect(() => {
    const fetchSensorHistory = async () => {
      try {
        const data = await getPISensorHistory();
        setSensorHistory(data);
      } catch (error) {
        console.error("Error fetching sensor history:", error.message);
      }
    };
  
    fetchSensorHistory();
    const interval = setInterval(fetchSensorHistory, 1000); 
    return () => clearInterval(interval); 
  }, []);

  
  useEffect(() => {

    getUsers()
      .then((response) => {
        setUsers(response);
      })    
      .catch((error) => {
        alert("Error fetching users: " + error.message);
      });
  }, []);
  
  


  const handleAddRoute = (productId) => {
    const route = {};

    selectedUsers.forEach((userId, index) => {
      route[userId] = {
        nfc: false,
        sent: false,
      };
    });

    const routeData = {
      productId,
      route,
    };

    addRoute(routeData)
      .then((response) => {
        alert("Route added successfully!");
      })
      .catch((error) => {
        alert("Error adding route: " + error.message);
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user's email"
            required
          />
        </div>
        <div>
          <label>Private Key:</label>
          <input
            type="text"
            value={private_key}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter private key"
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="manufacturer">Manufacturer</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Create User</button>
        </div>
      </form>

      {password && (
        <div>
          <h3>Generated Password: {password}</h3>
        </div>
      )}

      <h2>Add Route to Products</h2>
      <div>
        <label>Number of Locations:</label>
        <input
          type="number"
          value={routeLocations}
          onChange={(e) => setRouteLocations(Number(e.target.value))}
          min="1"
          max="10"
        />
      </div>

      {routeLocations > 0 && (
        <div>
          <h3>Select Users for Route</h3>
          {Array.from({ length: routeLocations }).map((_, index) => (
            <div key={index}>
              <label>Select User {index + 1}:</label>
              <select
                onChange={(e) => {
                  const newSelectedUsers = [...selectedUsers];
                  newSelectedUsers[index] = e.target.value;
                  setSelectedUsers(newSelectedUsers);
                }}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3>Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>
              {product.product_name}
              <button
                onClick={() => {
                  handleAddRoute(product.product_id);
                }}
              >
                Add Route
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "5px" }}>
  <h3>📡 Realtime Temperature & Humidity - PIxxx</h3>
  {sensorHistory.length > 0 ? (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ddd" }}>Timestamp</th>
          <th style={{ borderBottom: "1px solid #ddd" }}> Temperature (°C)</th>
          <th style={{ borderBottom: "1px solid #ddd" }}> Humidity (%)</th>
        </tr>
      </thead>
      <tbody>
        {sensorHistory.map((entry, index) => {
          const tempExceeded = entry.temperature > 30;
          const humidityExceeded = entry.humidity > 70;
          const isAlert = tempExceeded || humidityExceeded;

          return (
            <tr
              key={index}
              style={{
                backgroundColor: isAlert ? "#ffdddd" : "transparent", // red tint if alert
                color: isAlert ? "#b30000" : "inherit",
                fontWeight: isAlert ? "bold" : "normal"
              }}
            >
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {new Date(entry.timestamp).toLocaleTimeString()}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {entry.temperature}
                {tempExceeded && <span> ⚠️</span>}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {entry.humidity}
                {humidityExceeded && <span> ⚠️</span>}
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  ) : (
    <p>Loading latest sensor data...</p>
  )}
</div>

    </div>
  );
};

export default Dashboard;
