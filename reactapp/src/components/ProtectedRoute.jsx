// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute wraps a component and ensures that
 * only users with allowed roles can access it.
 *
 * Props:
 *  - element: React component to render
 *  - allowedRoles: Array of allowed roles (e.g., ["EMPLOYEE"])
 *  - currentUser: The currently logged-in user object { role: "EMPLOYEE", ... }
 */
const ProtectedRoute = ({ element: Element, allowedRoles, currentUser }) => {
  // If no allowedRoles provided, render directly (e.g., AdminPanel access)
  if (!allowedRoles) {
    return <Element />;
  }

  // If user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user role is allowed, render the component
  if (allowedRoles.includes(currentUser.role)) {
    return <Element />;
  }

  // If user role not allowed, redirect to home or unauthorized page
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
