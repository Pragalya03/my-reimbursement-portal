import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ExpenseStatusUpdate({ onStatusUpdate }) {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  // Fetch expense details on page load
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`/api/expenses/${id}`);
        if (res.ok) {
          const data = await res.json();
          setExpense(data);
        } else {
          console.error("Failed to fetch expense");
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };
    fetchExpense();
  }, [id]);

  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/expenses/${id}/approve`, {
        method: "POST",
      });
      if (res.ok) {
        if (onStatusUpdate) onStatusUpdate();
        setExpense({ ...expense, status: "APPROVED" });
      }
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!remarks.trim()) {
      setModalError("Remarks are required");
      return;
    }
    try {
      const res = await fetch(`/api/expenses/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remarks }),
      });
      if (res.ok) {
        setShowRejectModal(false);
        setRemarks("");
        setModalError("");
        if (onStatusUpdate) onStatusUpdate();
        setExpense({ ...expense, status: "REJECTED" });
      }
    } catch (error) {
      console.error("Reject failed", error);
    }
  };

  // Loading state
  if (!expense) {
    return <p>Loading expense details...</p>;
  }

  // If not pending, no action buttons
  if (expense.status !== "PENDING") {
    return <p>Status: {expense.status}</p>;
  }

  return (
    <div>
      <h2>Expense Status Update</h2>
      <p>
        <strong>ID:</strong> {expense.id}
      </p>
      <p>
        <strong>Amount:</strong> {expense.amount}
      </p>
      <p>
        <strong>Status:</strong> {expense.status}
      </p>

      <button data-testid={`approve-btn-${expense.id}`} onClick={handleApprove}>
        Approve
      </button>
      <button data-testid={`reject-btn-${expense.id}`} onClick={handleReject}>
        Reject
      </button>

      {showRejectModal && (
        <div data-testid="reject-modal">
          <textarea
            data-testid="remarks-input"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks"
          />
          {modalError && <p data-testid="modal-error">{modalError}</p>}
          <button data-testid="confirm-reject" onClick={confirmReject}>
            Confirm Reject
          </button>
          <button onClick={() => setShowRejectModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ExpenseStatusUpdate;
