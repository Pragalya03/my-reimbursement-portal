import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayments, createPayment, updatePayment } from "../utils/api.js";
import "../styles/PaymentList.css";

function PaymentsDashboard() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paymentDate: "",
    status: "PENDING",
    paymentMethod: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPayments([]);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePayment = () => {
    setEditingPayment(null);
    setFormData({
      paymentAmount: "",
      paymentDate: "",
      status: "PENDING",
      paymentMethod: "",
    });
    setShowModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setFormData({
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate ? payment.paymentDate.split("T")[0] : "",
      status: payment.status,
      paymentMethod: payment.paymentMethod,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPayment) {
        await updatePayment(editingPayment.id, formData);
        alert("Payment updated successfully!");
      } else {
        await createPayment(formData);
        alert("Payment created successfully!");
      }
      setShowModal(false);
      setEditingPayment(null);
      fetchPayments();
    } catch (error) {
      console.error("Failed to save payment:", error);
      alert("Failed to save payment");
    }
  };

  return (
    <div className="payment-list">
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <button
          onClick={() => navigate("/finance")}
          className="cancel-btn"
        >
          Back
        </button>
        <button
          onClick={handleCreatePayment}
          className="create-btn"
        >
          Create Payment
        </button>
      </div>

      <h2>Payments Dashboard</h2>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>${Number(payment.paymentAmount).toFixed(2)}</td>
                <td>{formatDate(payment.paymentDate)}</td>
                <td>{payment.status}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="make-payment-btn"
                      onClick={() => alert(`Making payment for ID ${payment.id}`)}
                    >
                      Make Payment
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditPayment(payment)}
                    >
                      Edit
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => alert(`Cancel payment ID ${payment.id}`)}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Create / Update */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingPayment ? "Update Payment" : "Create Payment"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Amount:
                <input
                  type="text"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FAILED">Failed</option>
                </select>
              </label>
              <label>
                Method:
                <input
                  type="text"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="action-buttons">
                <button
                  type="submit"
                  className={editingPayment ? "update-btn" : "create-btn"}
                >
                  {editingPayment ? "Update Payment" : "Create Payment"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsDashboard;
