import React, { useEffect, useState } from "react";
import "./ExpenseList.css";
import { getExpenses, updateExpenseStatus } from "../utils/api";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleStatusChange = async (id, status) => {
    await updateExpenseStatus(id, status, remarks[id] || "");
    setRemarks({ ...remarks, [id]: "" });
    loadExpenses();
  };

  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((e) => e.status.toLowerCase() === filter);

  return (
    <div className="expense-list">
      <h2>Expense Management</h2>

      <div className="filter-container">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredExpenses.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Expense Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.employeeId}</td>
                <td>{expense.date}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                  <span className={`badge ${expense.status.toLowerCase()}`}>
                    {expense.status}
                  </span>
                </td>
                <td>
                  <div className="remarks-section">
                    <input
                      type="text"
                      placeholder="Enter remarks"
                      value={remarks[expense.id] || ""}
                      onChange={(e) =>
                        setRemarks({ ...remarks, [expense.id]: e.target.value })
                      }
                    />
                  </div>
                </td>
                <td className="remarks-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleStatusChange(expense.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleStatusChange(expense.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-text">No expenses found.</p>
      )}
    </div>
  );
}

export default ExpenseList;
