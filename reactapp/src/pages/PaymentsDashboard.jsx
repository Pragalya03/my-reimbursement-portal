// src/pages/PaymentsDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpenseById, createPayment, getPayments } from "../utils/api.js";

function PaymentsDashboard() {
  const { expenseId } = useParams(); // comes from /payments/:expenseId
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(!!expenseId);
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentDate: new Date().toISOString(),
    paymentMethod: "direct_deposit",
    paymentStatus: "pending",
  });

  // Fetch all payments always
  useEffect(() => {
    fetchPayments();
  }, []);

  // If expenseId exists, fetch that expense and prefill modal
  useEffect(() => {
    if (expenseId) {
      fetchExpense(expenseId);
    }
  }, [expenseId]);

  const fetchExpense = async (id) => {
    try {
      const data = await getExpenseById(id);
      setExpense(data);
      setFormData((prev) => ({
        ...prev,
        paymentAmount: data.amount,
      }));
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch expense:", err);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
      setPayments([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      expenseId,
      paymentAmount: formData.paymentAmount,
      paymentDate: formData.paymentDate,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentStatus,
    };

    try {
      await createPayment(payload);
      alert("Your payment has been made successfully");
      setShowModal(false);
      fetchPayments(); // refresh payments table
      navigate("/payments"); // stay in payments dashboard but remove expenseId param
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to process payment");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payments Dashboard</h2>

      <button
        onClick={() => navigate("/finance-dashboard")}
        style={{
          marginBottom: "15px",
          padding: "6px 12px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Back to Finance Dashboard
      </button>

      {/* Modal */}
      {showModal && expense && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Make Payment for Expense #{expenseId}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Expense ID:
                <input type="text" value={expenseId} disabled />
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
                Method:
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="direct_deposit">Direct Deposit</option>
                  <option value="cheque">Cheque</option>
                  <option value="payroll">Payroll</option>
                </select>
              </label>

              <label>
                Status:
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </label>

              <div style={{ marginTop: "15px" }}>
                <button type="submit">Submit Payment</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payments Table */}
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Expense ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.expenseId}</td>
                <td>${Number(payment.paymentAmount).toFixed(2)}</td>
                <td>{formatDate(payment.paymentDate)}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentsDashboard;
