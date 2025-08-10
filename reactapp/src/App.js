import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";

function App() {
  return (
    <Router>
      <nav>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            marginRight: "15px",
            color: isActive ? "white" : "#d1d5db",
            backgroundColor: isActive ? "#312e81" : "transparent",
            padding: "8px 15px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
          })}
        >
          Add Expense
        </NavLink>
        <NavLink
          to="/expenses"
          style={({ isActive }) => ({
            color: isActive ? "white" : "#d1d5db",
            backgroundColor: isActive ? "#312e81" : "transparent",
            padding: "8px 15px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
          })}
        >
          Expense List
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<ExpenseForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
