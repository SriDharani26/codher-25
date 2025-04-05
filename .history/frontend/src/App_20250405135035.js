import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Whitelist from "./pages/Whitelist";
import NFC from "./pages/NFC";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute allowedRoles={["admin", "manufacturer"]}>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/whitelist"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Whitelist />
              </PrivateRoute>
            }
          />
          <Route
            path="/nfc"
            element={
              <PrivateRoute allowedRoles={["admin", "manufacturer", "user"]}>
                <NFC />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
