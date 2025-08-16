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
import AdminPanel from "./pages/AdminPanel";
import ExpenseForm from "./components/ExpenseForm";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <nav className="full-width-navbar">
        <NavLink to="/employee" className="user-type-btn">Employee</NavLink>
        <NavLink to="/manager" className="user-type-btn">Manager</NavLink>
        <NavLink to="/finance" className="user-type-btn">Finance</NavLink>
        <NavLink to="/admin" className="user-type-btn">Admin</NavLink>
      </nav>

      <div className="App">
          import EmployeeDashboard from "./components/EmployeeDashboard";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin" element={<AdminPanel />} />
  <Route path="/expenses/new" element={<ExpenseForm />} />
  <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> {/* new */}
</Routes>

      </div>
    </Router>
  );
}

export default App;
