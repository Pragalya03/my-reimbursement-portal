import React from "react";
import { useNavigate } from "react-router-dom";

function ExpensePolicies() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/finance-dashboard")}
        style={{
          padding: "6px 12px",
          backgroundColor: "#f87171",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Back
      </button>

      <h2>Expense Policies</h2>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Policy Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Replace with API data */}
          <tr>
            <td>1</td>
            <td>Travel Policy</td>
            <td>Max $100 per day for travel</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Food Policy</td>
            <td>Max $50 per day for food</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpensePolicies;
