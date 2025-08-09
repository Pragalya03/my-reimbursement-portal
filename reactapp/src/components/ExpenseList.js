import React, { useEffect, useState } from "react";
import "./ExpenseList.css";
import { getExpenses, updateExpenseStatus } from "../utils/api";
import { useNavigate } from "react-router-dom";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

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
    filter === "ALL"
      ? expenses
      : expenses.filter((e) => e.status === filter);

  const handleApprove = async (id) => {
    try {
      await updateExpenseStatus(id, { status: "APPROVED", remarks: "Approved" });
      fetchExpenses();
    } catch (e) {
      alert("Failed to approve expense");
    }
  };

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="ALL">All</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

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
                    <>
                      <button onClick={() => handleApprove(expense.id)}>
                        Approve
                      </button>
                      <button
                        onClick={() => navigate(`/expenses/${expense.id}/update`)}
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
