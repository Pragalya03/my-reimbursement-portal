import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";
import './App.css';

function UserTypeSelection(){
  return(
    <div className="user-type-selection">
      <h2>Choose User Type</h2>
      <div className="user-type-buttons">
        <NavLink to="/employee" className="user-type-btn">Employee</NavLink>
        <NavLink to="/manager" className="user-type-btn">Manager</NavLink>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="top-right-nav">
        <NavLink 
  to="/employee" 
  className={({ isActive }) => 
    `user-type-btn ${isActive ? "active" : ""}`
  }
>
  Employee
</NavLink>

<NavLink 
  to="/manager" 
  className={({ isActive }) => 
    `user-type-btn ${isActive ? "active" : ""}`
  }
>
  Manager
</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<UserTypeSelection/>}/>

        <Route path="/employee" element={<ExpenseForm />} />
        <Route path="/manager" element={<ExpenseList />} />
        <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
