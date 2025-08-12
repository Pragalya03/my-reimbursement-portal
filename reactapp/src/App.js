import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";
import './App.css';

function App() {
  return (
    <Router>
      {/* Full-width navbar */}
      <nav className="full-width-navbar">
        <NavLink to="/employee" className="user-type-btn">
          Employee
        </NavLink>
        <NavLink to="/manager" className="user-type-btn">
          Manager
        </NavLink>
      </nav>

      {/* Rest of the page */}
      <div className="App">
        <Routes>
          <Route path="/" element={<ExpenseForm />} />

          <Route
            path="/employee"
            element={
              <div className="page-container">
                <ExpenseForm />
              </div>
            }
          />

          {/* Manager page where GO button lives */}
          <Route path="/manager" element={<ExpenseList />} />

          {/* Expense status update with dynamic ID */}
          <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
