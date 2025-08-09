import React, { useState } from "react";
import "./ExpenseForm.css";
import { createExpense } from "../utils/api";

function ExpenseForm({ onExpenseAdded }) {
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
    if (formData.amount <= 0) return "Amount must be greater than 0";
    if (
      !formData.description ||
      formData.description.length < 5 ||
      formData.description.length > 200
    )
      return "Description must be 5-200 characters";
    if (!formData.date) return "Date is required";
    if (new Date(formData.date) > new Date())
      return "Date cannot be in the future";
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
      const response = await createExpense(formData);
      setSuccess("Expense submitted successfully!");
      setError("");
      setFormData({ employeeId: "", amount: "", description: "", date: "" });
      onExpenseAdded(response);
    } catch (err) {
      setError(err.message || "Error submitting expense");
      setSuccess("");
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <input
        type="number"
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ExpenseForm;
