import React, { useEffect, useState } from "react";
import { getExpenses, updateExpenseStatus } from "../utils/api.js";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [activeAction, setActiveAction] = useState(null); // { id, type }
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
        remarks: remarksInput.trim() || null
      });
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === id
            ? { ...exp, status: newStatus, remarks: remarksInput.trim() || null }
            : exp
        )
      );
      // Reset
      setActiveAction(null);
      setRemarksInput("");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const filteredExpenses = statusFilter
    ? expenses.filter((expense) => expense.status === statusFilter)
    : expenses;

  return (
    <div className="expense-list">
    <button className="back-btn" onClick={() => navigate("/")}>
        Back
      </button>
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
                  {expense.status === "PENDING" && activeAction?.id !== expense.id && (
                    <>
                      <button
                      
                        onClick={() =>
                          setActiveAction({ id: expense.id, type: "APPROVED" })
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          setActiveAction({ id: expense.id, type: "REJECTED" })
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* Input for remarks when action is active */}
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
                          onClick={() =>
                            submitStatusChange(expense.id, activeAction.type)
                          }
                        >
                          Submit
                        </button>
                        <button
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
