import React, { useState } from "react";
import { updateExpenseStatus } from "../utils/api";

function ExpenseStatusUpdate({ expense, onStatusUpdate }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  if (expense.status !== "PENDING") return null;

  const handleApprove = async () => {
    try {
      await updateExpenseStatus(expense.id, { status: "APPROVED", remarks: "Approved" });
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      alert("Failed to approve expense");
    }
  };

  const handleReject = async () => {
    if (!remarks.trim()) {
      setModalError("Remarks required for rejection");
      return;
    }
    try {
      await updateExpenseStatus(expense.id, { status: "REJECTED", remarks: remarks.trim() });
      setShowRejectModal(false);
      setRemarks("");
      setModalError("");
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      alert("Failed to reject expense");
    }
  };

  return (
    <>
      <button
        data-testid={`approve-btn-${expense.id}`}
        onClick={handleApprove}
      >
        Approve
      </button>
      <button
        data-testid={`reject-btn-${expense.id}`}
        onClick={() => setShowRejectModal(true)}
      >
        Reject
      </button>

      {showRejectModal && (
        <div data-testid="reject-modal" className="modal">
          <textarea
            data-testid="remarks-input"
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          {modalError && (
            <p data-testid="modal-error" style={{ color: "red" }}>{modalError}</p>
          )}
          <button data-testid="confirm-reject" onClick={handleReject}>Submit</button>
          <button onClick={() => {
            setShowRejectModal(false);
            setRemarks("");
            setModalError("");
          }}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default ExpenseStatusUpdate;
