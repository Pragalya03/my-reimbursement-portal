import React, { useEffect, useState } from "react";
import "./ExpenseList.css";
import { getExpenses, updateExpenseStatus } from "./ExpenseService";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateExpenseStatus(id, { status: newStatus });
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === id ? { ...exp, status: newStatus } : exp
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const filteredExpenses = statusFilter
    ? expenses.filter((expense) => expense.status === statusFilter)
    : expenses;

  return (
    <div className="expense-list">
      <h2>All Expenses</h2>
      <label htmlFor="status-filter" style={{ marginRight: "8px" }}>
        Status:
      </label>
      <select
        id="status-filter"
        data-testid="status-filter"
        aria-label="Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All</option>
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
                <td>${Number(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>{expense.status}</td>
                <td>{expense.remarks || ""}</td>
                <td>
                  {expense.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(expense.id, "APPROVED")}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(expense.id, "REJECTED")}
                      >
                        Reject
                      </button>
                    </>
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
