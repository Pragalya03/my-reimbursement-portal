/*import React, { useState } from "react";

function ExpenseStatusUpdate({ expense, onStatusUpdate }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/expenses/${expense.id}/approve`, {
        method: "POST",
      });
      if (res.ok && onStatusUpdate) {
        onStatusUpdate();
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
      const res = await fetch(`/api/expenses/${expense.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remarks }),
      });
      if (res.ok && onStatusUpdate) {
        setShowRejectModal(false);
        setRemarks("");
        setModalError("");
        onStatusUpdate();
      }
    } catch (error) {
      console.error("Reject failed", error);
    }
  };

  if (expense.status !== "PENDING") {
    return null;
  }

  return (
    <div>
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
*/
import React, { useState } from "react";
import { updateExpenseStatus } from "../utils/api.js";

function ExpenseStatusUpdate({ expense, onStatusUpdate }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  // Approve handler
  const handleApprove = async () => {
    try {
      await updateExpenseStatus(expense.id, { status: "APPROVED", remarks: null });
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  // Reject button click
  const handleReject = () => {
    setShowRejectModal(true);
  };

  // Confirm reject handler
  const confirmReject = async () => {
    if (!remarks.trim()) {
      setModalError("Remarks are required");
      return;
    }
    try {
      await updateExpenseStatus(expense.id, { status: "REJECTED", remarks: remarks.trim() });
      setShowRejectModal(false);
      setRemarks("");
      setModalError("");
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error("Reject failed", error);
    }
  };

  // Only show for pending expenses
  if (expense.status !== "PENDING") {
    return null;
  }

  return (
    <div>
      <button data-testid={`approve-btn-${expense.id}`} onClick={handleApprove}>
        Approve
      </button>
      <button data-testid={`reject-btn-${expense.id}`} onClick={handleReject}>
        Reject
      </button>

      {showRejectModal && (
        <div
          data-testid="reject-modal"
          style={{
            background: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            marginTop: "8px",
            borderRadius: "4px",
          }}
        >
          <textarea
            data-testid="remarks-input"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks"
            style={{ width: "100%", height: "60px", marginBottom: "6px" }}
          />
          {modalError && (
            <p data-testid="modal-error" style={{ color: "red", marginBottom: "6px" }}>
              {modalError}
            </p>
          )}
          <div>
            <button data-testid="confirm-reject" onClick={confirmReject}>
              Confirm Reject
            </button>
            <button onClick={() => setShowRejectModal(false)} style={{ marginLeft: "8px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseStatusUpdate;
