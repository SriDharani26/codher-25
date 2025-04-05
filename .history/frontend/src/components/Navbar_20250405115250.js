import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <span>Logged in as: {role}</span> |
      {role === "admin" && (
        <>
          <Link to="/dashboard">Dashboard</Link> |<Link to="/users">Users</Link>{" "}
          |<Link to="/products">Products</Link> |
          <Link to="/whitelist">Whitelist</Link> |
        </>
      )}
      {role === "manufacturer" && (
        <>
          <Link to="/products">Products</Link> |
        </>
      )}
      {(role === "manufacturer" || role === "user" || role === "admin") && (
        <Link to="/nfc">NFC</Link>
      )}
      {" | "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
