// src/components/Navbar.js
import React from "react";
import { FaUserPlus } from "react-icons/fa"; 
import ''../styles/Navbar.css; // Import the sign-up icon from react-icons

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>PharmaChain</h1>
      </div>
      <div className="navbar-right">
        <FaUserPlus size={24} />
      </div>
    </div>
  );
}

export default Navbar;
