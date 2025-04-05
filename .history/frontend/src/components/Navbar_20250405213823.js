// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>BrandName</h1> {/* You can change this to your website's name */}
      </div>
      <div className="navbar-right">
        <Link to="/login" className="sign-up-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
