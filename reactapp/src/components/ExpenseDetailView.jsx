import React from "react";
import ExpenseStatusUpdate from "./ExpenseStatusUpdate";
import "./ExpenseDetailView.css";

function ExpenseDetailView({ expense, onStatusUpdate }) {
  if (!expense) return <p>No expense selected.</p>;

  return (
    <div className="expense-detail">
      <h2>Expense Detail</h2>
      <p><strong>Employee ID:</strong> {expense.employeeId}</p>
      <p><strong>Amount:</strong> ${expense.amount.toFixed(2)}</p>
      <p><strong>Description:</strong> {expense.description}</p>
      <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {expense.status}</p>
      <p><strong>Remarks:</strong> {expense.remarks || "-"}</p>

      {/* Only managers/finance can update status */}
      <ExpenseStatusUpdate expense={expense} onStatusUpdate={onStatusUpdate} />
    </div>
  );
}

export default ExpenseDetailView;
