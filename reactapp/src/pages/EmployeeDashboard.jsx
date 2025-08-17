// import React, { useEffect, useState } from "react";
// import { getExpenses } from "../utils/api.js";
// import "../styles/EmployeeDashboard.css";

// function EmployeeDashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const loggedInEmployeeId = localStorage.getItem("loggedInEmployeeId");

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const data = await getExpenses();

//         // Filter only expenses for the logged-in user
//         const filtered = data.filter(
//           (exp) => String(exp.employeeId) === String(loggedInEmployeeId)
//         );
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
//       {/* Back Button Top Right */}
//       <button
//         className="back-btn"
//         onClick={() => window.history.back()}
//       >
//         Back
//       </button>

//       <div className="expense-list">
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
//           <h2>My Expenses</h2>
//           <button
//             onClick={handleAddExpense}
//             className="add-expense-btn"
//           >
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
import { getExpenses } from "../utils/api.js";
import "../styles/EmployeeDashboard.css";

function EmployeeDashboard() {
  const [expenses, setExpenses] = useState([]);
  const loggedInEmployeeId = localStorage.getItem("loggedInEmployeeId");

  useEffect(() => {
    if (!loggedInEmployeeId) {
      console.warn("No logged-in employee ID found in localStorage");
      setExpenses([]);
      return;
    }

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();

        // Debug: check what the API returned
        console.log("All expenses from API:", data);

        // Filter only expenses for the logged-in user
        const filtered = data.filter((exp) => {
          if (!exp.employeeId) {
            console.warn("Expense without employeeId found:", exp);
            return false;
          }
          return String(exp.employeeId) === String(loggedInEmployeeId);
        });

        console.log(`Filtered expenses for employee ${loggedInEmployeeId}:`, filtered);

        setExpenses(filtered);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, [loggedInEmployeeId]);

  const handleAddExpense = () => {
    window.location.href = "/expenses/new";
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
    <>
      {/* Back Button */}
      <button className="back-btn" onClick={() => window.history.back()}>
        Back
      </button>

      <div className="expense-list">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
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
                <tr key={expense.id}>
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
      </div>
    </>
  );
}

export default EmployeeDashboard;


