import React, { useState } from "react";
import { createUser } from "../services/api"; // Importing the function from api.js

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [role, setRole] = useState("other");
  const [password, setPassword] = useState("");

  // Generate password function (random 8 character string)
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  // Handle the form submission to create a user
  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Generate password
    const generatedPassword = generatePassword();
    setPassword(generatedPassword); // Update state to show the generated password

    // Create user data
    const userData = {
      email,
      password: generatedPassword,
      privateKey,
      role,
    };

    // Call the createUser API function from api.js to send the data to backend
    try {
      const response = await createUser(userData);
      if (response.success) {
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
            value={privateKey}
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
    </div>
  );
};

export default Dashboard;
