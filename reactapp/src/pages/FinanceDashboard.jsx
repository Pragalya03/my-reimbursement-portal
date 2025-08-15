import React from "react";
import ExpenseList from "../components/ExpenseList";

function FinanceDashboard() {
  return (
    <div className="finance-dashboard">
      <h2>Finance Dashboard</h2>
      <ExpenseList />
    </div>
  );
}

export default FinanceDashboard;
