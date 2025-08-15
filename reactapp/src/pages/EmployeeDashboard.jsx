import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function EmployeeDashboard() {
  const [refresh, setRefresh] = React.useState(false);

  const handleAddExpense = () => setRefresh(!refresh);

  return (
    <div className="employee-dashboard">
      <h2>Employee Dashboard</h2>
      <ExpenseForm onAdd={handleAddExpense} />
      <ExpenseList key={refresh} />
    </div>
  );
}

export default EmployeeDashboard;
