import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";
import UserTypeSelection from "./components/UserTypeSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/employee" element={<ExpenseForm />} />
        <Route path="/manager" element={<ExpenseList />} />
        <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
