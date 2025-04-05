// src/pages/LandingPage.js

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="section section-navbar">
        <Navbar /> {/* Navbar section */}
      </div>
      <div className="section section-content">
        <h2>Welcome to Our Landing Page</h2>
      </div>
      <div className="section section-links">
        <div className="rectangle">
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="rectangle">
          <Link to="/users">Users</Link>
        </div>
        <div className="rectangle">
          <Link to="/products">Products</Link>
        </div>
        <div className="rectangle">
          <Link to="/whitelist">Whitelist</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
