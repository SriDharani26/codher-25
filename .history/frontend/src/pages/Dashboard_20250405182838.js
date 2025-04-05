import React, { useState, useEffect } from "react";
import { createUser, getProducts, addRoute } from "../services/api"; // Importing the function from api.js

const Dashboard = () => {
  // Create User States
  const [email, setEmail] = useState("");
  const [private_key, setPrivateKey] = useState("");
  const [role, setRole] = useState("other");
  const [password, setPassword] = useState("");

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
    getProducts()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        alert("Error fetching products: " + error.message);
      });
  }, []);

  // Handle Add Route Form Submission
  const handleAddRoute = (productId) => {
    const route = {};

    // Create route data based on selected users
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

      {/* Create User Form */}
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

      {/* Add Route Form */}
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

      {/* Display Products and Add Route Button */}
      <div>
        <h3>Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.productName}
              <button
                onClick={() => {
                  handleAddRoute(product.productId);
                }}
              >
                Add Route
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
