import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPolicies } from "../utils/api.js";

function ExpensePolicies() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getPolicies();
        setPolicies(data);
      } catch (err) {
        console.error("Failed to fetch policies:", err);
        setError("Could not load policies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

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

      {loading ? (
        <p>Loading policies...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : policies.length === 0 ? (
        <p>No policies found.</p>
      ) : (
        <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Policy Name</th>
              <th>Description</th>
              <th>Limit</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.id}</td>
                <td>{policy.policyName}</td>
                <td>{policy.description}</td>
                <td>{policy.limit ?? "-"}</td>
                <td>{policy.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpensePolicies;
