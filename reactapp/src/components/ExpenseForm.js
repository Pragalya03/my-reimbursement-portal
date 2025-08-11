import React, { useState } from "react";
import "./ExpenseForm.css";
import { createExpense } from "../utils/api";

function ExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    amount: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense(formData);
    onAdd();
    setFormData({ employeeId: "", date: "", amount: "", description: "" });
  };

  return (
    <div className="expense-form">
      <h2>Submit Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee ID</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="submit-btn">
          Submit Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
