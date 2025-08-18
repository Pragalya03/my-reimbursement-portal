// import React, { useEffect, useState } from "react";
// import { getExpenses } from "../utils/api.js";
// import "../styles/ExpenseList.css";

// function FinanceDashboard() {
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const data = await getExpenses();
//       const approvedExpenses = data.filter(exp => exp.status === "APPROVED");
//       setExpenses(approvedExpenses);
//     } catch (error) {
//       console.error("Failed to fetch expenses:", error);
//       setExpenses([]);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="expense-list">
//       <div style={{ display: "flex", justifyContent:"flex-end", marginBottom:"15px" }}>
//         <button
//           onClick={() => window.history.back()}
//           style={{
//             padding: "6px 12px",
//             backgroundColor: "#f87171",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//           }}
//         >
//           Back
//         </button>
//       </div>

//       <h2>Approved Expenses (Finance Dashboard)</h2>

//       {expenses.length === 0 ? (
//         <p>No approved expenses found</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>Amount</th>
//               <th>Description</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((expense) => (
//               <tr key={expense.id}>
//                 <td>{expense.employeeId}</td>
//                 <td>${Number(expense.amount).toFixed(2)}</td>
//                 <td>{expense.description}</td>
//                 <td>{formatDate(expense.date)}</td>
//                 <td>{expense.status}</td>
//                 <td>{expense.remarks || ""}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default FinanceDashboard;


import React, { useEffect, useState } from "react";
import { getExpenses } from "../utils/api.js";
import "../styles/ExpenseList.css";

function FinanceDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Approval form state
  const [approvalLevel, setApprovalLevel] = useState("processing");
  const [finalApproval, setFinalApproval] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [comments, setComments] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      const approvedExpenses = data.filter((exp) => exp.status === "APPROVED");
      setExpenses(approvedExpenses);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleRowClick = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
    // reset form
    setApprovalLevel("processing");
    setFinalApproval(false);
    setApprovalStatus("pending");
    setComments("");
  };

  const handleApprovalSubmit = async () => {
    try {
      const approverId = localStorage.getItem("loggedInEmployeeId");

      // Map approvalLevel string to integer
      const approvalLevelMap = { processing: 1, paid: 2, verifying: 3 };

      const approvalData = {
        expense: { id: selectedExpense.id },
        approver: { employeeId: Number(approverId) },
        approvalLevel: approvalLevelMap[approvalLevel],
        isFinalApproval: finalApproval,
        approvalStatus: approvalStatus.toUpperCase(), // must match enum
        comments,
        approvalDate: new Date().toISOString()
      };

      const res = await fetch(
        "https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/approvals",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(approvalData)
        }
      );

      if (res.ok) {
        alert("Approval submitted!");
        setIsModalOpen(false);
        fetchExpenses();
      } else {
        const errText = await res.text();
        alert("Failed to submit approval: " + errText);
      }
    } catch (err) {
      console.error("Approval submission error:", err);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="expense-list">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "6px 12px",
            backgroundColor: "#f87171",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      <h2>Approved Expenses (Finance Dashboard)</h2>

      {expenses.length === 0 ? (
        <p>No approved expenses found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} onClick={() => handleRowClick(expense)} style={{ cursor: "pointer" }}>
                <td>{expense.employeeId}</td>
                <td>${Number(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.status}</td>
                <td>{expense.remarks || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "400px"
          }}>
            <h3>Approve Expense #{selectedExpense.id}</h3>

            <label>Approval Level:</label>
            <select value={approvalLevel} onChange={e => setApprovalLevel(e.target.value)}>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="verifying">Verifying</option>
            </select>

            <div>
              <input
                type="checkbox"
                checked={finalApproval}
                onChange={e => setFinalApproval(e.target.checked)}
                id="finalApproval"
              />
              <label htmlFor="finalApproval">Final Approval</label>
            </div>

            <label>Approval Status:</label>
            <select value={approvalStatus} onChange={e => setApprovalStatus(e.target.value)}>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>

            <label>Comments:</label>
            <textarea value={comments} onChange={e => setComments(e.target.value)} rows={3} style={{width: "100%"}} />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleApprovalSubmit} style={{ backgroundColor: "#34d399", color: "white" }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinanceDashboard;
