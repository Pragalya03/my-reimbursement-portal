// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import AdminPanel from "./pages/AdminPanel";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import FinanceDashboard from "./pages/FinanceDashboard";
// import AuditorDashboard from "./pages/AuditorDashboard";
// import ExpenseForm from "./components/ExpenseForm";
// import ExpenseList from "./components/ExpenseList";
// import Home from "./pages/Home";
// function App() {
//   return (
//     <Router>
//       <nav className="full-width-navbar">
//         <h1 className="brand-name">ClaimEase</h1>
//       </nav>

//       <div className="App">

// <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/register" element={<Register />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/admin" element={<AdminPanel />} />
//   <Route path="/expenses/new" element={<ExpenseForm />} />
//   <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> 
//   <Route path="/manager-dashboard" element={<ExpenseList />} /> 
//   <Route path="/finance-dashboard" element={<FinanceDashboard />} /> 
//   <Route path="/auditor-dashboard" element={<AuditorDashboard />} /> 
  
// </Routes>

//       </div>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import AuditorDashboard from "./pages/AuditorDashboard";
import ExpenseCategories from "./pages/ExpenseCategories";
import ExpensePolicies from "./pages/ExpensePolicies";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";   // ✅ Import Navbar

function App() {
  return (
    <Router>
      {/* ✅ Place navbar above routes so it shows on every page */}
      <Navbar />  

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
          <Route path="/categories" element={<ExpenseCategories />} /> 
          <Route path="/policies" element={<ExpensePolicies />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
