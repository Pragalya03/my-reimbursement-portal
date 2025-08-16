// src/components/EmployeeDashboard.jsx
import React, { useEffect, useState } from "react";
import { getExpenses } from "../utils/api.js";
import "../styles/ExpenseList.css";

function EmployeeDashboard() {
  const [expenses, setExpenses] = useState([]);

  // Get the logged-in user's employeeId from localStorage
  const loggedInEmployeeId = localStorage.getItem("loggedInEmployeeId");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();

        // Filter expenses only for the logged-in employee
        const filteredByEmployee = data.filter(
          (exp) => String(exp.employeeId) === String(loggedInEmployeeId)
        );

        setExpenses(filteredByEmployee);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, [loggedInEmployeeId]);

  const handleAddExpense = () => {
    window.location.href = "/expense/new";
  };

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h2>My Expenses</h2>
        <button
          onClick={handleAddExpense}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Expense
        </button>
      </div>

      {expenses.length === 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
              >
                <td>{expense.employeeId}</td>
                <td>${Number(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.status}</td>
                <td>{expense.remarks || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeDashboard;
