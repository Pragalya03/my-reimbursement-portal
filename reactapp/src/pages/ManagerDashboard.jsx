import React from "react";
import ExpenseList from "../components/ExpenseList";

function ManagerDashboard() {
  return (
    <div className="manager-dashboard">
      <h2>Manager Dashboard</h2>
      <ExpenseList />
    </div>
  );
}

export default ManagerDashboard;
