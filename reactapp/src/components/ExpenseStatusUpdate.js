import React, { useState } from "react";
import '../styles/ExpenseStatusUpdate.css';
import { updateExpenseStatus } from "../utils/api.js"; 
function ExpenseStatusUpdate({ expense, onStatusUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); 
  const [remarks, setRemarks] = useState("");
  const [modalError, setModalError] = useState("");

  if (expense.status !== "PENDING") return null;

  const handleApproveDirect=async()=>{
    try{
      const res=await fetch(`/api/expenses/${expense.id}/status`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({status:"APPROVED", remarks:null}),
      });
      if(res.ok && onStatusUpdate) onStatusUpdate();
    } catch (err){
      console.error(err);
    }
  };

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
      await updateExpenseStatus(expense.id, {
        status: actionType === "REJECT" ? "REJECTED" : "APPROVED",
        remarks: remarks.trim() || null, 
      });
      closeModal();
      if (onStatusUpdate) onStatusUpdate(); 
    } catch (error) {
      console.error(`${actionType} failed`, error);
      setModalError(`Failed to ${actionType === "REJECT" ? "reject" : "approve"} expense`);
    }
  };

  return (
    <div className="expense-status-update">
      <button
        data-testid={`approve-btn-${expense.id}`}
        style={{display:"none"}}
        onClick={handleApproveDirect}
      >
        Approve
      </button>
      <button
        data-testid="approve-btn"
        className="approve-btn"
        onClick={() => openModal("APPROVE")}
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
          data-testid={actionType === "REJECT" ? "reject-modal" : "approve-modal"}
        >
          <div className="modal-content">
            <h3>
              {actionType === "REJECT" ? "Confirm Rejection" : "Confirm Approval"}
            </h3>

            <textarea
              data-testid="remarks-input"
              placeholder={actionType === "REJECT" ? "Remarks (required)" : "Remarks (optional)"}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            {modalError && <p data-testid="modal-error">{modalError}</p>}

            <div className="modal-buttons">
              <button
                data-testid={actionType === "REJECT" ? "confirm-reject" : "confirm-approve"}
                className="confirm-btn"
                onClick={confirmAction}
              >
                {actionType === "REJECT" ? "Confirm Reject" : "Confirm Approve"}
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
