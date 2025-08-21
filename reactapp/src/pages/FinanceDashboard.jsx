// import React, { useEffect, useState } from "react";
// import { getExpenses, createApproval } from "../utils/api.js"; // make sure this exists
// import "../styles/ExpenseList.css";

// function FinanceDashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedExpense, setSelectedExpense] = useState(null);
//   const [formData, setFormData] = useState({
//     approvalStatus: "PENDING",
//     comments: "",
//     isFinalApproval: false,
//   });

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

//   const handleRowClick = (expense) => {
//     setSelectedExpense(expense);
//     setFormData({
//       approvalStatus: "PENDING",
//       comments: "",
//       isFinalApproval: false,
//     });
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       expenseId: selectedExpense.id,
//       approvalStatus: formData.approvalStatus,
//       approvalDate: new Date().toISOString(), // auto-generate
//       comments: formData.comments,
//       isFinalApproval: formData.isFinalApproval
//     };

//     try {
//       await createApproval(payload); // POST to Approvals table
//       alert("Approval submitted successfully!");
//       setShowModal(false);
//       setSelectedExpense(null);
//       fetchExpenses();
//     } catch (err) {
//       console.error("Failed to submit approval:", err);
//       alert("Failed to submit approval");
//     }
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
//               <tr 
//                 key={expense.id} 
//                 onClick={() => handleRowClick(expense)} 
//                 style={{ cursor: "pointer" }}
//               >
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

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Approval for Expense #{selectedExpense.id}</h3>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Approval Status:
//                 <select
//                   name="approvalStatus"
//                   value={formData.approvalStatus}
//                   onChange={handleChange}
//                 >
//                   <option value="PENDING">Pending</option>
//                   <option value="APPROVED">Approved</option>
//                   <option value="REJECTED">Rejected</option>
//                 </select>
//               </label>

//               <label>
//                 Comments:
//                 <textarea
//                   name="comments"
//                   value={formData.comments}
//                   onChange={handleChange}
//                 />
//               </label>

//               <label>
//                 Final Approval:
//                 <input
//                   type="checkbox"
//                   name="isFinalApproval"
//                   checked={formData.isFinalApproval}
//                   onChange={handleChange}
//                 />
//               </label>

//               <div style={{ marginTop: "15px" }}>
//                 <button type="submit">Submit</button>
//                 <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: "10px" }}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FinanceDashboard;

// src/pages/FinanceDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses, createApproval, getPayments, getReceiptsByExpense } from "../utils/api.js";
import "../styles/ExpenseList.css";

function FinanceDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [receipts, setReceipts]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [formData, setFormData] = useState({
    approvalStatus: "PENDING",
    comments: "",
    isFinalApproval: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  // const fetchExpenses = async () => {
  //   try {
  //     const data = await getExpenses();
  //     const approvedExpenses = data.filter((exp) => exp.status === "APPROVED");
  //     setExpenses(approvedExpenses);
  //   } catch (error) {
  //     console.error("Failed to fetch expenses:", error);
  //     setExpenses([]);
  //   }
  // };
  const fetchExpenses = async () => {
    try{
      const [expenseData, paymentData]=await Promise.all([getExpenses(), getPayments()]);
      const approvedExpense = expenseData.filter((exp)=>exp.status==="APPROVED");
const [receiptBlobs, setReceiptBlobs] = useState({});

      const unpaidExpenses=approvedExpense.filter(
        (exp)=>!paymentData.some((p)=>p.expense.id===exp.id)
      );

      setExpenses(unpaidExpenses);
    } catch (error){
      console.error("Failed to fetch expenses or payments: ", error);
      setExpenses([]);
    }
  };
  const fetchReceipt = async (fileName) => {
    try {
      const res = await fetch(`/receipts/download/${fileName}`);
      if (!res.ok) throw new Error("File not found");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
  
      setReceiptBlobs(prev => ({ ...prev, [fileName]: url }));
    } catch (err) {
      console.error(err);
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

  const handleRowClick = async (expense) => {
    setSelectedExpense(expense);
    setFormData({
      approvalStatus: "PENDING",
      comments: "",
      isFinalApproval: false,
    });
    setShowModal(true);
    
    try{
      const expenseReceipts=await getReceiptsByExpense(expense.id);
      setReceipts(expenseReceipts);
    } catch (err) {
      console.error("Failed to fetch receipt: ",err);
      setReceipts([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      expenseId: selectedExpense.id,
      approvalStatus: formData.approvalStatus,
      approvalDate: new Date().toISOString(),
      comments: formData.comments,
      isFinalApproval: formData.isFinalApproval,
    };

    try {
      await createApproval(payload);

        alert("Approval submitted successfully!");
        setShowModal(false);
        setSelectedExpense(null);
        fetchExpenses();
    } catch (err) {
      console.error("Failed to submit approval:", err);
      alert("Failed to submit approval");
    }
  };

  return (
    <div className="expense-list">
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <button
          onClick={() => navigate("/")}
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

        <div>
        <button
            onClick={() => navigate("/payments")}
            style={{
              padding: "6px 12px",
              backgroundColor: "#34d399",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Check Payments
          </button>
          <button
            onClick={() => navigate("/categories")}
            style={{
              padding: "6px 12px",
              backgroundColor: "#34d399",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            View Expense Categories
          </button>
          <button
            onClick={() => navigate("/policies")}
            style={{
              padding: "6px 12px",
              backgroundColor: "#60a5fa",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View Expense Policies
          </button>
        </div>
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
              <tr
                key={expense.id}
                onClick={() => handleRowClick(expense)}
                style={{ cursor: "pointer" }}
              >
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Approval for Expense #{selectedExpense.id}</h3>
              <div className="receipts-section">
                <h4>Receipts</h4>
                <ul>
{/*                   {receipts.map((receipt)=>(
                    <li key={receipt.id}>
                      <a href={`https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/receipts/download/${receipt.fileName}`} target="_blank" rel="noopener noreferrer">
                        {receipt.fileName}({(receipt.fileSize/1024).toFixed(2)} KB)
                      </a>
                      <span> | Uploaded in: {new Date(receipt.uploadDate).toLocaleDateString()}</span>
                    </li>
                  ))} */}
                  {receipts.map(receipt => (
                    <div key={receipt.id}>
                      <p>{receipt.fileName}</p>
                      {receiptBlobs[receipt.fileName] && receipt.fileName.endsWith(".png") && (
                        <img src={receiptBlobs[receipt.fileName]} alt={receipt.fileName} style={{ maxWidth: "300px" }} />
                      )}
                      {receiptBlobs[receipt.fileName] && receipt.fileName.endsWith(".pdf") && (
                        <iframe src={receiptBlobs[receipt.fileName]} width="400" height="500" title={receipt.fileName}></iframe>
                      )}
                    </div>
                  ))}

                </ul>
              </div>
            <form onSubmit={handleSubmit}>
              <label>
                Approval Status:
                <select
                  name="approvalStatus"
                  value={formData.approvalStatus}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </label>

              <label>
                Comments:
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </label>

              <label>
                Final Approval:
                <input
                  type="checkbox"
                  name="isFinalApproval"
                  checked={formData.isFinalApproval}
                  onChange={handleChange}
                />
              </label>

              <div style={{ marginTop: "15px" }}>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinanceDashboard;






