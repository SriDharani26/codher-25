// src/pages/LandingPage.js
import React from "react";
import Navbar from "../components/Navbar"; 
import '../styles/// Import the Navbar component

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar at the top */}
      <div className="header">
        <Navbar />
      </div>

      {/* Main content sections */}
      <div className="sections">
        <div className="section section-1">Section 1</div>
        <div className="section section-2">Section 2</div>
        <div className="section section-3">Section 3</div>
        <div className="section section-4">Section 4</div>
      </div>
    </div>
  );
}

export default LandingPage;
