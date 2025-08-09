import React, { useState } from "react";
import "./ExpenseForm.css";
import { createExpense } from "../utils/api";

function ExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    amount: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.employeeId) return "Employee ID is required";
    if (Number(formData.amount) <= 0) return "Amount must be greater than 0";
    if (
      !formData.description ||
      formData.description.length < 5 ||
      formData.description.length > 200
    )
      return "Description must be 5-200 characters";
    if (!formData.date) return "Date is required";
    if (new Date(formData.date) > new Date()) return "Date cannot be in the future";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    try {
      const response = await createExpense({
        employeeId: Number(formData.employeeId),
        amount: Number(formData.amount),
        description: formData.description,
        date: formData.date,
      });
      setSuccess("Expense submitted successfully!");
      setError("");
      setFormData({ employeeId: "", amount: "", description: "", date: "" });
      if (onAdd) onAdd(response);
    } catch (err) {
      setError(err.message || "Error submitting expense");
      setSuccess("");
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      {error && <p data-testid="error-message" className="error">{error}</p>}
      {success && <p data-testid="success-message" className="success">{success}</p>}

      <label htmlFor="employeeId">Employee ID</label>
      <input
        id="employeeId"
        type="number"
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
        aria-label="Employee ID"
      />

      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        step="0.01"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        aria-label="Amount"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        aria-label="Description"
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        aria-label="Date"
      />

      <button data-testid="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ExpenseForm;
