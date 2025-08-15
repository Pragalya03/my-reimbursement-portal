import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">ExpenseSys</Link>

      <div className="nav-links">
        {user ? (
          <>
            {user.role === "EMPLOYEE" && <Link to="/employee">Dashboard</Link>}
            {user.role === "MANAGER" && <Link to="/manager">Manager</Link>}
            {user.role === "FINANCE_MANAGER" && <Link to="/finance">Finance</Link>}
            {user.role === "ADMIN" && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
