import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ExpenseList.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredExpenses =
    statusFilter === "ALL"
      ? expenses
      : expenses.filter((e) => e.status === statusFilter);

  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      {/* Status filter */}
      <label>
        Filter by Status:{" "}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </label>

      {/* Button to go to status update */}
<div style={{ marginTop: "10px", textAlign: "left" }}>
  <button
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px"
    }}
    onClick={() => {
      const enteredId = prompt("Enter Expense ID:");
      if (!enteredId) return; // user canceled

      const found = expenses.find(
        (exp) => exp.id.toString() === enteredId.toString()
      );

      if (found) {
        navigate(`/expenses/${enteredId}/update`);
      } else {
        alert("Expense ID not found.");
      }
    }}
  >
    Go to Status Update
  </button>
</div>


      {/* Expense table */}
      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.employeeId}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td>{exp.description}</td>
                <td>
                  {new Date(exp.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{exp.status}</td>
                <td>{exp.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;
