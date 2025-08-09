import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdatePage from "./components/ExpenseStatusUpdatePage";

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Add Expense</Link>
        <Link to="/expenses">Expense List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ExpenseForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/expenses/:id/update" element={<ExpenseStatusUpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
