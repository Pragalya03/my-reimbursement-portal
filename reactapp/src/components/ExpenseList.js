import React, { useEffect, useState } from "react";
import { getExpenses, updateExpenseStatus } from "../utils/api.js";
import './ExpenseList.css';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [activeAction, setActiveAction] = useState(null);
  const [remarksInput, setRemarksInput] = useState("");
  const [searchId, setSearchId] = useState(""); // ⬅ Added
  const [highlightedId, setHighlightedId] = useState(null); // ⬅ Added

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
        remarks: remarksInput.trim() || null
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

  function handleGoClick() {
    const found = expenses.find(exp => exp.employeeId.toString() === searchId.trim());
    if (found) {
      setHighlightedId(found.id);
    } else {
      alert("Employee ID not found");
      setHighlightedId(null);
    }
  }

  const filteredExpenses = statusFilter
    ? expenses.filter((expense) => expense.status === statusFilter)
    : expenses;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  return (
    <div className="expense-list">
      <h2>All Expenses</h2>
      
      {/* Status Filter */}
      <label htmlFor="status-filter" style={{ marginRight: "8px" }}>Status:</label>
      <select
        id="status-filter"
        data-testid="status-filter"
        aria-label="Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      {/* Employee ID Search */}
      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <label style={{ marginRight: "8px" }}>Or Select by Employee ID:</label>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Employee ID"
          style={{
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "8px"
          }}
        />
        <button
          onClick={handleGoClick}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            cursor: "pointer"
          }}
        >
          GO
        </button>
      </div>

      {/* Expenses Table */}
      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <table data-testid="expenses-table" style={{ borderCollapse: "collapse", width: "100%" }}>
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
                  backgroundColor: highlightedId === expense.id ? "#fff7b2" : "transparent" // highlight
                }}
              >
                <td>{expense.employeeId}</td>
                <td>${Number(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.status}</td>
                <td>{expense.remarks || ""}</td>
                <td>
                  {expense.status === "PENDING" && activeAction?.id !== expense.id && (
                    <>
                      <button
                        className='approve-btn'
                        onClick={() =>
                          setActiveAction({ id: expense.id, type: "APPROVED" })
                        }
                      >
                        Approve
                      </button>
                      <button
                        className='reject-btn'
                        onClick={() =>
                          setActiveAction({ id: expense.id, type: "REJECTED" })
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {activeAction?.id === expense.id && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
                      <div>
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
