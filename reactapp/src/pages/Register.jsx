// import { useState, useEffect } from "react";

// export default function Register() {
//   const [departments, setDepartments] = useState([]);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     passwordHash: "",
//     role: "EMPLOYEE",   // default role
//     employeeId: "",
//     department: null,
//     manager: null,
//     createdDate: "",
//     lastLogin: "",
//     isActive: true
//   });

//   // Fetch departments
//   useEffect(() => {
//     fetch("https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/departments")
//       .then(res => res.json())
//       .then(data => {
//         setDepartments(data);
//         if (data.length === 0) {
//           setFormData(prev => ({ ...prev, department: null }));
//         }
//       })
//       .catch(err => {
//         console.error("Failed to fetch departments:", err);
//         setFormData(prev => ({ ...prev, department: null }));
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "departmentId") {
//       setFormData(prev => ({
//         ...prev,
//         department: value ? { id: Number(value) } : null
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         alert("User registered!");
//         setFormData({
//           username: "",
//           email: "",
//           passwordHash: "",
//           role: "EMPLOYEE",
//           employeeId: "",
//           department: null,
//           manager: null,
//           createdDate: "",
//           lastLogin: "",
//           isActive: true
//         });
//       } else {
//         const errorText = await res.text();
//         alert("Error registering user: " + errorText);
//       }
//     } catch (err) {
//       console.error("Failed to submit registration:", err);
//       alert("Failed to connect to server.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="passwordHash"
//         type="password"
//         placeholder="Password"
//         value={formData.passwordHash}
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="employeeId"
//         placeholder="Employee ID"
//         value={formData.employeeId}
//         onChange={handleChange}
//         required
//       />

//       {/* Role dropdown */}
//       <select name="role" value={formData.role} onChange={handleChange} required>
//         <option value="EMPLOYEE">EMPLOYEE</option>
//         <option value="MANAGER">MANAGER</option>
//       </select>

//       {/* Department dropdown or fallback */}
//       {departments.length > 0 ? (
//         <select name="departmentId" onChange={handleChange}>
//           <option value="">Select Department</option>
//           {departments.map(d => (
//             <option key={d.id} value={d.id}>{d.departmentName}</option>
//           ))}
//         </select>
//       ) : (
//         <input type="text" value="No departments available" disabled />
//       )}

//       <button type="submit">Register</button>
//     </form>
//   );
// }



// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utils/api.js";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE", // default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser(formData);

      // Navigate based on role
      if (user.role === "EMPLOYEE") {
        navigate("/employee-dashboard"); // new route for EmployeeDashboard
      } else if (user.role === "MANAGER") {
        navigate("/manager"); // or wherever managers go
      } else {
        navigate("/"); // fallback
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed, try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="EMPLOYEE">Employee</option>
        <option value="MANAGER">Manager</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
