import React, { useState } from "react";
import "./ExpenseForm.css";
import { createExpense } from "../utils/api";
import { useNavigate } from "react-router-dom";


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
    <button className="back-btn" onClick={() => navigate("/")}>
         Back
      </button>
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      {error && (
        <p data-testid="error-message" className="error">
          {error}
        </p>
      )}
      {success && (
        <p data-testid="success-message" className="success">
          {success}
        </p>
      )}

      
      <label>Employee ID
      <input
        type="number"
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
      />
      </label>

      <label >Amount
      <input
        type="number"
        step="0.01"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      </label>

      <label >Description
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      </label>

      <label>Date
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      </label>

      <button data-testid="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ExpenseForm;
