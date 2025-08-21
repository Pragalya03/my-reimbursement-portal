import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPolicies } from "../utils/api.js";
import "../styles/ExpensePolicies.css";

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
    <div className="expense-policies">
      <button className="back-btn" onClick={() => navigate("/finance-dashboard")}>
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Policy Name</th>
              <th>Limit</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.id}</td>
                <td>{policy.policyName}</td>
                <td>{policy.spendingLimit ?? "-"}</td>
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
