// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/expenses/new" element={<ExpenseForm />} />
        {/* You can add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
