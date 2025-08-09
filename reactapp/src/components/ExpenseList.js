import React, { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:8080/api/expenses";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch(BACKEND_URL);
        if (res.ok) {
          const data = await res.json();
          setExpenses(data);
        } else {
          setExpenses([]);
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        setExpenses([]);
      }
    }
    fetchExpenses();
  }, []);

  const filteredExpenses = statusFilter
    ? expenses.filter((expense) => expense.status === statusFilter)
    : expenses;

  return (
    <div>
      <label htmlFor="status-filter">Status</label>
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
        <table
          data-testid="expenses-table"
          border="1"
          cellPadding="5"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.employeeId}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>{expense.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;
