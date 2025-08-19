import React from "react";
import { useNavigate } from "react-router-dom";

function ExpenseCategories() {
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

      <h2>Expense Categories</h2>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Replace with API data */}
          <tr>
            <td>1</td>
            <td>Travel</td>
            <td>Travel-related expenses</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Food</td>
            <td>Meals and refreshments</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseCategories;
