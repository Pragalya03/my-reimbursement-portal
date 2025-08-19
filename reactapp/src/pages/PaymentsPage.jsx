import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpenseById, createPayment } from "../utils/api.js";

function PaymentsPage() {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentDate: new Date().toISOString(),
    paymentMethod: "direct_deposit",
    paymentStatus: "pending",
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data = await getExpenseById(expenseId);
        setExpense(data);
        setFormData((prev) => ({
          ...prev,
          paymentAmount: data.amount,
        }));
      } catch (err) {
        console.error("Failed to fetch expense:", err);
      }
    };
    fetchExpense();
  }, [expenseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      expenseId: expenseId,
      paymentAmount: formData.paymentAmount,
      paymentDate: formData.paymentDate,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentStatus,
    };

    try {
      await createPayment(payload);
      alert("Payment has been made successfully!");
      navigate("/payments-dashboard");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to process payment");
    }
  };

  if (!expense) return <p>Loading expense...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Make Payment for Expense #{expenseId}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        
        <label>
          Expense ID:
          <input type="text" value={expenseId} readOnly />
        </label>

        <label>
          Payment Amount:
          <input type="number" value={formData.paymentAmount} readOnly />
        </label>

        <label>
          Payment Date:
          <input type="text" value={formData.paymentDate} readOnly />
        </label>

        <label>
          Payment Method:
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="direct_deposit">Direct Deposit</option>
            <option value="cheque">Cheque</option>
            <option value="payroll">Payroll</option>
          </select>
        </label>

        <label>
          Payment Status:
          <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="processed">Processed</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </label>

        <button type="submit" style={{ marginTop: "15px", padding: "8px 12px", backgroundColor: "#34d399", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentsPage;
