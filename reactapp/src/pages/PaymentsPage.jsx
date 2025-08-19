import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpenseById, createPayment, getPayments } from "../utils/api.js";

function PaymentsPage() {
  const { expenseId } = useParams();
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

  useEffect(() => {
    fetchPayments();
  }, []);

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
      fetchPayments();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to process payment");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payments Dashboard</h2>
      <button
        onClick={() => navigate("/finance-dashboard")}
        style={{
          marginBottom: "15px",
          padding: "6px 12px",
          backgroundColor: "#f87171",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Back
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

              <button type="submit">Submit Payment</button>
            </form>
          </div>
        </div>
      )}

      {/* Payments Table */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
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
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.expenseId}</td>
              <td>{p.paymentAmount}</td>
              <td>{new Date(p.paymentDate).toLocaleString()}</td>
              <td>{p.paymentMethod}</td>
              <td>{p.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsPage;
