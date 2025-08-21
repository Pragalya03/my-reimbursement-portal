// import React, { useEffect, useState } from "react";
// import { getExpenses } from "../utils/api.js";
// import "../styles/EmployeeDashboard.css";

// function EmployeeDashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const loggedInEmployeeId = localStorage.getItem("loggedInEmployeeId");

//   useEffect(() => {
//     if (!loggedInEmployeeId) {
//       console.warn("No logged-in employee ID found in localStorage");
//       setExpenses([]);
//       return;
//     }

//     const fetchExpenses = async () => {
//       try {
//         const data = await getExpenses();

//         console.log("All expenses from API:", data);

//         const filtered = data.filter((exp) => {
//           if (!exp.employeeId) {
//             console.warn("Expense without employeeId found:", exp);
//             return false;
//           }
//           return String(exp.employeeId) === String(loggedInEmployeeId);
//         });

//         console.log(`Filtered expenses for employee ${loggedInEmployeeId}:`, filtered);

//         setExpenses(filtered);
//       } catch (error) {
//         console.error("Failed to fetch expenses:", error);
//         setExpenses([]);
//       }
//     };

//     fetchExpenses();
//   }, [loggedInEmployeeId]);

//   const handleAddExpense = () => {
//     window.location.href = "/expenses/new";
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
//     <>
//       <div className="expense-list">
//       <div style ={{display:"flex", justifyContent:"flex-end", marginBottom:"15px"}}>
//       <button 
//       className="back-btn"
//       style={{
//         position: "absolute",
//         padding: "6px 12px",
//         backgroundColor: "#f87171",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
    
//       }}
//        onClick={() => window.history.back()}>
//         Back
//       </button>
//       </div>

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
//           <h2>My Expenses</h2>
//           <button onClick={handleAddExpense} className="add-expense-btn">
//             Add Expense
//           </button>
//         </div>

//         {expenses.length === 0 ? (
//           <p>No expenses found</p>
//         ) : (
//           <table data-testid="expenses-table">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenses.map((expense) => (
//                 <tr key={expense.id}>
//                   <td>{expense.employeeId}</td>
//                   <td>${Number(expense.amount).toFixed(2)}</td>
//                   <td>{expense.description}</td>
//                   <td>{formatDate(expense.date)}</td>
//                   <td>{expense.status}</td>
//                   <td>{expense.remarks || ""}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

// export default EmployeeDashboard;


import React, { useEffect, useState } from "react";
import { getExpenses, uploadReceipt } from "../utils/api.js";
import "../styles/EmployeeDashboard.css";

function EmployeeDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [file, setFile] = useState(null);

  const loggedInEmployeeId = localStorage.getItem("loggedInEmployeeId");

  useEffect(() => {
    if (!loggedInEmployeeId) return;

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        const filtered = data.filter(
          (exp) => String(exp.employeeId) === String(loggedInEmployeeId)
        );
        setExpenses(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, [loggedInEmployeeId]);

  const handleAddExpense = () => {
    window.location.href = "/expenses/new";
  };

  const handleRowClick = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !selectedExpense) {
      alert("Select a file and an expense first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("expenseId", selectedExpense.id);
    formData.append("fileName", file.name);
    formData.append("fileSize", Number(file.size));
    formData.append("fileType", file.type);
    formData.append("filePath", `/uploads/${file.name}`);
    formData.append("uploadDate", new Date().toISOString().replace("Z",""));

    try {
      const created = await uploadReceipt(formData);
      console.log("Receipt created:", created);
      alert("Receipt uploaded successfully!");
      setShowModal(false);
      setFile(null);
    } catch (err) {
      console.error("Upload error", err);
      alert("Failed to create receipt: " + err.message);
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

  return (
    <div className="expense-list">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
        <button
          className="back-btn"
          style={{
            position: "absolute",
            padding: "6px 12px",
            backgroundColor: "#f87171",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>My Expenses</h2>
        <button onClick={handleAddExpense} className="add-expense-btn">
          Add Expense
        </button>
      </div>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <table data-testid="expenses-table">
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
              <tr key={expense.id} onClick={() => handleRowClick(expense)}>
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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Upload Receipt for Expense #{selectedExpense.id}</h3>
            <input type="file" onChange={handleFileChange} />
            {file && (
              <div>
                <p>File Name: {file.name}</p>
                <p>File Size: {file.size} bytes</p>
                <p>File Type: {file.type}</p>
              </div>
            )}
            <button onClick={handleUpload}>Upload</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;







