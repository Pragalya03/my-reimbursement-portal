import React from "react";
import { Navigate } from "react-router-dom";

// role is a string, allowedRoles is an array of strings
const ProtectedRoute = ({ element: Component, allowedRoles, currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
