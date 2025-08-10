import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";

function App() {
  return (
    <Router>
      <nav className="top-right-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Add Expense
        </NavLink>
        <NavLink to="/expenses" className={({ isActive }) => (isActive ? "active" : "")}>
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
