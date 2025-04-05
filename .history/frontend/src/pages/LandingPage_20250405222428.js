// src/pages/LandingPage.js
import React from "react";
import Navbar from "../components/Navbar";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="sections">
        {/* Hero Section */}
        <div className="section section-1">
          <Navbar />
          <div className="hero-container">
            <div className="hero-text">
              <h1>
                Secure your <span className="highlight">supply chain</span> with
                <br />
                blockchain-powered product
                <br />
                tracking and verification
              </h1>
              <p>Secure, track, and verify products in real time</p>
              <button className="get-started-btn">Get Started</button>
            </div>
            <div className="hero-graphic">
              {/* Illustration or graphic */}
              <img src="/assets/images/illustration.png" alt="Analytics" />
            </div>
          </div>
        </div>

        {/* Other sections */}
        <div className="section section-2">Section 2</div>
        <div className="section section-3">Section 3</div>
        <div className="section section-4">Section 4</div>
      </div>
    </div>
  );
}

export default LandingPage;
