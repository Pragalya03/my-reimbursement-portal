/*import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="full-width-navbar">
        <NavLink to="/employee" className="user-type-btn">
          Employee
        </NavLink>
        <NavLink to="/manager" className="user-type-btn">
          Manager
        </NavLink>
      </nav>

      <div className="App">
        <Routes>
          <Route
             path="/"
                element={
                    <div className="page-container">
                        <ExpenseForm />
                    </div>
              }
          />
          <Route
             path="/employee"
                element={
                    <div className="page-container">
                        <ExpenseForm />
                    </div>
              }
          />

          <Route path="/manager" element={<ExpenseList />} />
          <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
*/
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import AuditorDashboard from "./pages/AuditorDashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <nav className="full-width-navbar">
        <h1 className="brand-name">ClaimEase</h1>
        <div className="nav-right">
        <NavLink to="/admin" className="user-type-btn">Admin</NavLink>
        </div>
      </nav>

      <div className="App">

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin" element={<AdminPanel />} />
  <Route path="/expenses/new" element={<ExpenseForm />} />
  <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> 
  <Route path="/manager-dashboard" element={<ExpenseList />} /> 
  <Route path="/finance-dashboard" element={<FinanceDashboard />} /> 
  <Route path="/auditor-dashboard" element={<AuditorDashboard />} /> 
  
</Routes>

      </div>
    </Router>
  );
}

export default App;
