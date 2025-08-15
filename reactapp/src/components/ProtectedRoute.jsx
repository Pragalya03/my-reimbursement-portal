// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) return <Navigate to="/login" />;

  // Optional: decode token to check roles if needed

  return <Element />;
};

export default ProtectedRoute;
