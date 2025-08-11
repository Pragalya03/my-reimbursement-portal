import React, { useEffect, useState } from "react";
import { getExpenses, updateExpenseStatus } from "../utils/api.js";
import "./ExpenseList.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [activeAction, setActiveAction] = useState(null);
  const [remarksInput, setRemarksInput] = useState("");

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

  async function submitStatusChange(id, newStatus) {
    if (newStatus === "REJECTED" && !remarksInput.trim()) {
      alert("Remarks are required for rejection.");
      return;
    }
    try {
      await updateExpenseStatus(id, {
        status: newStatus,
        remarks: remarksInput.trim() || null,
      });
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === id
            ? { ...exp, status: newStatus, remarks: remarksInput.trim() || null }
            : exp
        )
      );
      setActiveAction(null);
      setRemarksInput("");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const filteredExpenses = statusFilter
    ? expenses.filter((expense) => expense.status === statusFilter)
    : expenses;

  // Badge style generator
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "badge approved";
      case "REJECTED":
        return "badge rejected";
      case "PENDING":
      default:
        return "badge pending";
    }
  };

  return (
    <div className="expense-list">
      <h2>All Expenses</h2>

      <div className="filter-container">
        <label htmlFor="status-filter">Status:</label>
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
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="empty-text">No expenses found</p>
      ) : (
        <table data-testid="expenses-table" className="styled-table">
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
                <td>
                  <span className={getStatusBadgeClass(expense.status)}>
                    {expense.status}
                  </span>
                </td>
                <td>{expense.remarks || ""}</td>
                <td>
                  {expense.status === "PENDING" &&
                    activeAction?.id !== expense.id && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() =>
                            setActiveAction({ id: expense.id, type: "APPROVED" })
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() =>
                            setActiveAction({ id: expense.id, type: "REJECTED" })
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                  {activeAction?.id === expense.id && (
                    <div className="remarks-section">
                      <input
                        type="text"
                        placeholder={
                          activeAction.type === "REJECTED"
                            ? "Enter remarks (required)"
                            : "Enter remarks (optional)"
                        }
                        value={remarksInput}
                        onChange={(e) => setRemarksInput(e.target.value)}
                      />
                      <div className="remarks-actions">
                        <button
                          className="submit-btn"
                          onClick={() =>
                            submitStatusChange(expense.id, activeAction.type)
                          }
                        >
                          Submit
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setActiveAction(null);
                            setRemarksInput("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
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
