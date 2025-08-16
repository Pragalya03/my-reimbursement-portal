// src/pages/LoginPage.jsx
import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE"); // default role

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch all users from API
      const res = await fetch(
        "https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/users"
      );
      const users = await res.json();

      // Find user with matching username, password, and role
      const user = users.find(
        (u) => u.username === username && u.passwordHash === password && u.role === role
      );

      if (user) {
        if (role === "EMPLOYEE") {
          // Save employeeId in localStorage for filtering expenses
          localStorage.setItem("loggedInEmployeeId", user.employeeId);
          window.location.href = "/employee-dashboard";
        } else if (role === "MANAGER") {
          window.location.href = "/manager-dashboard";
        } else if (role === "FINANCE_MANAGER") {
          window.location.href = "/finance-dashboard";
        } else if (role === "AUDITOR") {
          window.location.href = "/auditor-dashboard";
        } else if (role === "ADMIN") {
          window.location.href = "/admin-dashboard";
        } else {
          alert("Role not recognized");
        }
      } else {
        alert("Invalid username, password, or role");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Failed to connect to server");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
          <option value="FINANCE_MANAGER">Finance Manager</option>
          <option value="AUDITOR">Auditor</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

