// src/pages/PaymentsDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses, getPayments, createPayment, updatePayment } from "../utils/api.js";
import "../styles/PaymentsDashboard.css";
function PaymentsDashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [formData, setFormData] = useState({
    paymentId: null,
    expenseId: "",
    paymentAmount: "",
    paymentDate: new Date().toISOString(),
    paymentMethod: "DIRECT_DEPOSIT",
    status: "PENDING",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [paymentData, expenseData] = await Promise.all([getPayments(), getExpenses()]);
      setPayments(paymentData);

      // Only show expenses with status "APPROVED"
      const approvedExpenses = expenseData.filter(exp => exp.status === "APPROVED");

      // Exclude expenses that already have a payment
      const unpaidExpenses = approvedExpenses.filter(
        exp => !paymentData.some(p => p.expense.id === exp.id)
      );

      setExpenses(unpaidExpenses);
    } catch (err) {
      console.error("Failed to load data:", err);
      setExpenses([]);
      setPayments([]);
    }
  };

  const openPaymentModal = (expenseOrPayment, isPayment = false) => {
    if (isPayment) {
      // Editing an existing payment
      setFormData({
        paymentId: expenseOrPayment.id,
        expenseId: expenseOrPayment.expense.id,
        paymentAmount: expenseOrPayment.paymentAmount,
        paymentDate: expenseOrPayment.paymentDate,
        paymentMethod: expenseOrPayment.paymentMethod,
        status: expenseOrPayment.status,
      });
      setSelectedExpense(expenseOrPayment.expense);
    } else {
      // New payment from approved expense
      setFormData({
        paymentId: null,
        expenseId: expenseOrPayment.id,
        paymentAmount: expenseOrPayment.amount,
        paymentDate: new Date().toISOString(),
        paymentMethod: "DIRECT_DEPOSIT",
        status: "PENDING",
      });
      setSelectedExpense(expenseOrPayment);
    }

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      expense: { id: formData.expenseId },
      paymentAmount: Number(formData.paymentAmount),
      paymentDate: new Date().toISOString().slice(0,19),
      paymentMethod: formData.paymentMethod,
      status: formData.status,
    };

    try {
      if (formData.paymentId) {
        await updatePayment(formData.paymentId, payload);
        alert("Payment updated successfully");
      } else {
        await createPayment(payload);
        alert("Payment created successfully");
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to save payment");
    }
  };

  return (
    <div className="payment-list" style={{ padding: "20px" }}>
      <h2>Payments Dashboard</h2>
      <button
        onClick={() => navigate("/finance-dashboard")}
        className="cancel-btn"
        style={{
          marginBottom: "15px",
          padding: "6px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Back to Finance Dashboard
      </button>
      {/*<button 
      // className="back-btn"
      // style={{
      //   position: "absolute",
      //   padding: "6px 12px",
      //   backgroundColor: "#f87171",
      //   color: "white",
      //   border: "none",
      //   borderRadius: "8px",
      //   cursor: "pointer",
    
      // }}
      //  onClick={() => winavigate("/finance-dashboard")}>
      //   Back
      // </button> */}
      <h3>Approved Expenses</h3>
      {expenses.length === 0 ? (
        <p>No approved expenses</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.id}</td>
                <td>{exp.employeeId}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td>{exp.description}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="make-payment-btn"
                    onClick={() => openPaymentModal(exp)}
                  >
                    Make Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: "30px" }}>All Payments</h3>
      {payments.length === 0 ? (
        <p>No payments</p>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.expense.id}</td>
                <td>${Number(p.paymentAmount).toFixed(2)}</td>
                <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                <td>{p.paymentMethod}</td>
                <td>{p.status}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openPaymentModal(p, true)}
                  >
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedExpense && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{formData.paymentId ? "Edit Payment" : "Make Payment"} for Expense</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Payment Amount:
                <input type="number" name="paymentAmount" value={formData.paymentAmount} readOnly />
              </label>

              <label>
                Payment Date:
                <input type="text" value={formData.paymentDate} readOnly />
              </label>

              <label>
                Method:
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="DIRECT_DEPOSIT">Direct Deposit</option>
                  <option value="CHECK">Cheque</option>
                  <option value="PAYROLL">Payroll</option>
                </select>
              </label>

              <label>
                Status:
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSED">Processed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FAILED">Failed</option>
                </select>
              </label>

              <div style={{ marginTop: "15px" }}>
                <button
                  type="submit"
                  className={formData.paymentId ? "update-btn" : "create-btn"}
                >
                  {formData.paymentId ? "Update Payment" : "Create Payment"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
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
    </div>
  );
}

export default PaymentsDashboard;
