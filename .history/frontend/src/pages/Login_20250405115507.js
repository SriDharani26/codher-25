import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      if (res.status === "success") {
        login(res.role);

        // Redirect based on role
        if (res.role === "admin") navigate("/dashboard");
        else if (res.role === "manufacturer") navigate("/products");
        else navigate("/nfc");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
