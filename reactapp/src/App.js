import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";
import './App.css';

function Navbar() {
  return (
    <nav className="full-width-navbar">
      <NavLink to="/employee" className="user-type-btn">
        Employee
      </NavLink>
      <NavLink to="/manager" className="user-type-btn">
        Manager
      </NavLink>
    </nav>
  );
}


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<ExpenseForm />} />
        <Route path="/employee" element={<ExpenseForm />} />
        <Route path="/manager" element={<ExpenseList />} />
        <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
