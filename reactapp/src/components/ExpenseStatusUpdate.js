import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateExpenseStatus } from "../utils/api";

function ExpenseStatusUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleReject = async () => {
    if (!remarks.trim()) {
      setError("Remarks are required for rejection");
      return;
    }
    try {
      await updateExpenseStatus(id, { status: "REJECTED", remarks });
      navigate("/expenses");
    } catch (e) {
      setError("Failed to update expense status");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "30px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 6,
        background: "#f9f9f9",
      }}
    >
      <h2>Reject Expense #{id}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <textarea
        placeholder="Enter remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button
        onClick={handleReject}
        style={{
          marginRight: 10,
          backgroundColor: "#f44336",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Submit
      </button>
      <button
        onClick={() => navigate("/expenses")}
        style={{
          padding: "8px 16px",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default ExpenseStatusUpdatePage;
