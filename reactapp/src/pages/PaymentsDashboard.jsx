// src/pages/PaymentsDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../utils/api.js";

function PaymentsDashboard() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
      setPayments([]);
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
