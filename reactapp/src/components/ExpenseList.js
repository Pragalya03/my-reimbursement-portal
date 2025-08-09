import React, { useEffect, useState } from "react";
import "./ExpenseList.css";
import { getExpenses } from "../utils/api";
import ExpenseStatusUpdate from "./ExpenseStatusUpdate";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses =
    filter === "ALL" ? expenses : expenses.filter((e) => e.status === filter);

  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      <label htmlFor="status-filter">Status</label>
      <select
        id="status-filter"
        data-testid="status-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Status"
      >
        <option value="ALL">All</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <table data-testid="expenses-table">
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
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{expense.status}</td>
                <td>{expense.remarks || "-"}</td>
                <td>
                  {expense.status === "PENDING" && (
                    <ExpenseStatusUpdate
                      expense={expense}
                      onStatusUpdate={fetchExpenses}
                    />
                  )}
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
