// src/components/FinanceDashboard.jsx
import React, { useEffect, useState } from "react";
import { getExpenses } from "../utils/api.js";
import ExpenseStatusUpdate from "./ExpenseStatusUpdate";
import "../styles/ExpenseList.css";

function FinanceDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // optional filter by status

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      // Only keep approved expenses
      const approvedExpenses = data.filter(exp => exp.status === "APPROVED");
      setExpenses(approvedExpenses);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
    }
  };

  const filteredExpenses = statusFilter
    ? expenses.filter((expense) => expense.status === statusFilter)
    : expenses;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="expense-list">
      {/* Back button */}
      <div style={{ display: "flex", justifyContent:"flex-end", marginBottom:"15px" }}>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "6px 12px",
            backgroundColor: "#f87171",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      <h2>Approved Expenses (Finance Dashboard)</h2>

      <label htmlFor="status-filter" style={{ marginRight: "8px" }}>
        Status Filter (Optional):
      </label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: "12px" }}
      >
        <option value="">All</option>
        <option value="APPROVED">Approved</option>
        <option value="PENDING">Pending</option>
        <option value="REJECTED">Rejected</option>
      </select>

      {filteredExpenses.length === 0 ? (
        <p>No approved expenses found</p>
      ) : (
        <table
          data-testid="expenses-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.employeeId}</td>
                <td>${Number(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.status}</td>
                <td>{expense.remarks || ""}</td>
                <td>
                  <ExpenseStatusUpdate
                    expense={expense}
                    onStatusUpdate={fetchExpenses}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FinanceDashboard;
