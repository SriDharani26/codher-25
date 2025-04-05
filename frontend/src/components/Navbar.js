import React from "react";
import "../styles/Navbar.css";
import Logo from "../assets/images/Logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Secure delivery illustration" />
        <h1>PharmaChain</h1>
      </div>

      <ul className="nav-links">
        <li className="active">Hero</li>
        <li>Footer</li>
        <li>CTA</li>
        <li>Faq</li>
        <li>Contact</li>
      </ul>

      <button className="signin-btn">Sign in</button>
    </div>
  );
}

export default Navbar;
