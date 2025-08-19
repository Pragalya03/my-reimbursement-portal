import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api.js";
import "../styles/ExpenseCategories.css";

function ExpenseCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Could not load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="expense-categories">
      <button
        className="back-btn" onClick={() => navigate("/finance-dashboard")}
      >
        Back
      </button>

      <h2>Expense Categories</h2>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Category Code</th>
              <th>Policy Limit</th>
              <th>Requires Receipt</th>
              <th>Requires Business Purpose</th>
              <th>Active</th>
              <th>Parent Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.categoryName}</td>
                <td>{cat.categoryCode}</td>
                <td>{cat.policyLimit ?? "-"}</td>
                <td>{cat.requiresReceipt ? "Yes" : "No"}</td>
                <td>{cat.requiresBusinessPurpose ? "Yes" : "No"}</td>
                <td>{cat.isActive ? "Yes" : "No"}</td>
                <td>{cat.parentCategory ? cat.parentCategory.categoryName : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseCategories;
