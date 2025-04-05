import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import RoleContext from "../context/RoleContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { role } = useContext(RoleContext);
  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default PrivateRoute;
