import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2>Welcome to Our Landing Page</h2>
      <div className="rectangles-container">
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
