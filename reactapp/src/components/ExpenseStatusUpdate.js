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
//modal displaying yes. but last 2 frontend test failing
/*
import React, { useState } from "react";
import { updateExpenseStatus } from "../utils/api.js";
import "./ExpenseStatusUpdate.css";

function ExpenseStatusUpdate({ expense, onStatusUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");
  const [actionType, setActionType] = useState(""); // APPROVED or REJECTED

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (actionType === "REJECTED" && !remarks.trim()) {
      setModalError("Remarks are required");
      return;
    }

    try {
      await updateExpenseStatus(expense.id, {
        status: actionType,
        remarks: remarks.trim() || null,
      });

      closeModal();
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error(`${actionType} failed`, error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setRemarks("");
    setModalError("");
    setActionType("");
  };

  if (expense.status !== "PENDING") return null;

  return (
    <div>
      <button
        data-testid={`approve-btn-${expense.id}`}
        onClick={() => openModal("APPROVED")}
      >
        Approve
      </button>
      <button
        data-testid={`reject-btn-${expense.id}`}
        onClick={() => openModal("REJECTED")}
      >
        Reject
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {actionType === "APPROVED" ? "Approve Expense" : "Reject Expense"}
            </h3>
            <textarea
              data-testid="remarks-input"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={
                actionType === "APPROVED"
                  ? "Enter optional remarks"
                  : "Enter remarks (required)"
              }
            />
            {modalError && (
              <p data-testid="modal-error" className="modal-error">
                {modalError}
              </p>
            )}
            <div className="modal-buttons">
              <button
                data-testid="confirm-action"
                onClick={confirmAction}
                className="confirm-btn"
              >
                Confirm {actionType === "APPROVED" ? "Approve" : "Reject"}
              </button>
              <button onClick={closeModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseStatusUpdate;
*/
import React, { useState } from "react";
import './ExpenseStatusUpdate.css';

function ExpenseStatusUpdate({ expense, onStatusUpdate }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  if (expense.status !== "PENDING") return null;

  // Approve directly, no modal
  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/expenses/${expense.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED", remarks: null }),
      });

      if (res.ok && onStatusUpdate) {
        onStatusUpdate();
      } else {
        setModalError("Failed to approve expense");
      }
    } catch (error) {
      console.error("Approve failed", error);
      setModalError("Failed to approve expense");
    }
  };

  // Open modal for reject
  const handleReject = () => {
    setShowRejectModal(true);
  };

  // Confirm reject
  const confirmReject = async () => {
    if (!remarks.trim()) {
      setModalError("Remarks are required");
      return;
    }

    try {
      const res = await fetch(`/api/expenses/${expense.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED", remarks: remarks.trim() }),
      });

      if (res.ok && onStatusUpdate) {
        setShowRejectModal(false);
        setRemarks("");
        setModalError("");
        onStatusUpdate();
      } else {
        setModalError("Failed to reject expense");
      }
    } catch (error) {
      console.error("Reject failed", error);
      setModalError("Failed to reject expense");
    }
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRemarks("");
    setModalError("");
  };

  return (
    <div className="expense-status-update">
      <button
        data-testid={`approve-btn-${expense.id}`}
        className="approve-btn"
        onClick={handleApprove}
      >
        Approve
      </button>
      <button
        data-testid={`reject-btn-${expense.id}`}
        className="reject-btn"
        onClick={handleReject}
      >
        Reject
      </button>

      {showRejectModal && (
        <div className="modal-overlay" data-testid="reject-modal">
          <div className="modal-content">
            <h3>Confirm Rejection</h3>
            <textarea
              data-testid="remarks-input"
              placeholder="Remarks (required)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            {modalError && <p data-testid="modal-error">{modalError}</p>}
            <div className="modal-buttons">
              <button
                data-testid="confirm-reject"
                className="confirm-btn"
                onClick={confirmReject}
              >
                Confirm Reject
              </button>
              <button className="cancel-btn" onClick={closeRejectModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseStatusUpdate;
