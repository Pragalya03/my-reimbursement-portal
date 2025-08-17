import React, { useEffect, useState } from "react";
import { getExpenses } from "../utils/api.js";
import ExpenseStatusUpdate from "./ExpenseStatusUpdate";
import "../styles/ExpenseList.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [searchEmployeeId, setSearchEmployeeId] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
    }
  };

  const handleGoClick = () => {
    const foundExpense = expenses.find(
      (exp) => String(exp.employeeId) === searchEmployeeId.trim()
    );
    if (foundExpense) {
      setHighlightedId(foundExpense.id);
    } else {
      alert("Employee ID not found.");
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
      <div style={{display: "flex", justifyContent:"flex-end", marginBottom:"15px"}}>
      <button
      onClick={()=>window.history.back()}
      style={{
        padding: "6px 12px",
        backgroundColor: "#f87171",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >Back</button>
    </div>
      <h2>All Expenses</h2>

      <label htmlFor="status-filter" style={{ marginRight: "8px" }}>
        Status:
      </label>
      <select
        id="status-filter"
        data-testid="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: "12px" }}
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <div style={{ marginBottom: "15px", marginTop: "10px" }}>
        <label style={{ marginRight: "8px", fontWeight: "bold" }}>
          Or Select by Employee ID:
        </label>
        <input
          type="text"
          value={searchEmployeeId}
          onChange={(e) => setSearchEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          style={{ marginRight: "8px", padding: "5px" }}
        />
        <button
          onClick={handleGoClick}
          style={{
            padding: "6px 12px",
            background: "#fde68a",
            color: "#d97706",
            border: "2px solid #d97706",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          GO
        </button>
      </div>

      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
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
              <tr
                key={expense.id}
                style={{
                  backgroundColor:
                    highlightedId === expense.id ? "#fde68a" : "transparent",
                }}
              >
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

export default ExpenseList;

