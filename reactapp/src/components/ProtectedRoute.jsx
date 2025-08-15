import React from "react";
import { Navigate } from "react-router-dom";

// Only renders the component if user role matches
function ProtectedRoute({ user, roles, children }) {
  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
