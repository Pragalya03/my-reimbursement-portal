import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordHash: "",
    role: "EMPLOYEE",
    employeeId: "",
    department: null,
    manager: null,
    createdDate: "",
    lastLogin: "",
    isActive: true
  });

  useEffect(() => {
    fetch("https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/departments")
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error("Failed to fetch departments:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "departmentId") {
      setFormData(prev => ({
        ...prev,
        department: value ? { id: Number(value) } : null
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const data = await res.json();
        alert("User registered!");

         if (data.employeeId) {
            localStorage.setItem("loggedInEmployeeId", data.employeeId);
          }
        
        const role = data.role?.toUpperCase();
        switch (role) {
          case "EMPLOYEE":
            navigate("/employee-dashboard");
            break;
          case "MANAGER":
            navigate("/manager-dashboard");
            break;
          case "FINANCE_MANAGER":
            navigate("/finance-dashboard");
            break;
          case "AUDITOR":
            navigate("/auditor-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        const errorText = await res.text();
        alert("Error registering user: " + errorText);
      }
    } catch (err) {
      console.error("Failed to submit registration:", err);
      alert("Failed to connect to server.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="passwordHash"
        type="password"
        placeholder="Password"
        value={formData.passwordHash}
        onChange={handleChange}
        required
      />
      <input
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
        required
      />

      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="EMPLOYEE">EMPLOYEE</option>
        <option value="MANAGER">MANAGER</option>
        <option value="FINANCE_MANAGER">FINANCE_MANAGER</option>
        <option value="AUDITOR">AUDITOR</option>
      </select>

      {departments.length > 0 ? (
        <select name="departmentId" onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.departmentName}</option>
          ))}
        </select>
      ) : (
        <input type="text" value="No departments available" disabled />
      )}

      <button type="submit">Register</button>
    </form>
  );
}


