import React, { useState } from "react";
import { updateExpenseStatus } from "../utils/api";

function ExpenseStatusUpdate({ expenseId, onStatusUpdated }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");

  const handleApprove = async () => {
    await updateExpenseStatus(expenseId, { status: "APPROVED", remarks: "Approved" });
    onStatusUpdated();
  };

  const handleReject = async () => {
    if (!remarks) {
      alert("Remarks required for rejection");
      return;
    }
    await updateExpenseStatus(expenseId, { status: "REJECTED", remarks });
    setShowRejectModal(false);
    setRemarks("");
    onStatusUpdated();
  };

  return (
    <>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={() => setShowRejectModal(true)}>Reject</button>

      {showRejectModal && (
        <div className="modal">
          <textarea
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <button onClick={handleReject}>Submit</button>
          <button onClick={() => setShowRejectModal(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default ExpenseStatusUpdate;
