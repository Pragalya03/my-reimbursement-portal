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
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "APPROVE" or "REJECT"
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  if (expense.status !== "PENDING") return null;

  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
    setRemarks("");
    setModalError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setActionType("");
    setRemarks("");
    setModalError("");
  };

  const confirmAction = async () => {
    if (actionType === "REJECT" && !remarks.trim()) {
      setModalError("Remarks are required for rejection");
      return;
    }

    try {
      const res = await fetch(`/api/expenses/${expense.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: actionType, remarks: remarks.trim() || null }),
      });

      if (res.ok) {
        closeModal();
        if (onStatusUpdate) onStatusUpdate(); // refresh parent
      } else {
        setModalError(`Failed to ${actionType.toLowerCase()} expense`);
      }
    } catch (error) {
      console.error(`${actionType} failed`, error);
      setModalError(`Failed to ${actionType.toLowerCase()} expense`);
    }
  };

  const handleApproveDirect=async()=>{
    try{
      const res=await fetch(`/api/expenses/${expense.id}/status`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
      body:JSON.stringify({status:"APPROVED", remarks:null}),
      });
      if(res.ok && onStatusUpdate) onStatusUpdate();
    } catch(err){
      console.error(err);
    }
  }
  return (
    <div className="expense-status-update">
      <button
        data-testid={`approve-btn-${expense.id}`}
        className="approve-btn"
        onClick={handleApproveDirect}
      >
        Approve
      </button>
      <button
        data-testid={`reject-btn-${expense.id}`}
        className="reject-btn"
        onClick={() => openModal("REJECT")}
      >
        Reject
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          data-testid={actionType === "APPROVE" ? "approve-modal" : "reject-modal"}
        >
          <div className="modal-content">
            <h3>
              {actionType === "APPROVE" ? "Confirm Approval" : "Confirm Rejection"}
            </h3>

            {/* Remarks input: optional for approve, required for reject */}
            <textarea
              data-testid="remarks-input"
              placeholder={actionType === "APPROVE" ? "Remarks (optional)" : "Remarks (required)"}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            {modalError && <p data-testid="modal-error">{modalError}</p>}

            <div className="modal-buttons">
              <button
                data-testid={actionType === "APPROVE" ? "confirm-approve" : "confirm-reject"}
                className="confirm-btn"
                onClick={confirmAction}
              >
                {actionType === "APPROVE" ? "Confirm Approve" : "Confirm Reject"}
              </button>
              <button className="cancel-btn" onClick={closeModal}>
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
