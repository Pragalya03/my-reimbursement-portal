import { useState, useEffect } from "react";

export default function RegistrationPage() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordHash: "",
    role: "EMPLOYEE",
    employeeId: "",
    department: { id: 0 },
    manager: "",
    createdDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isActive: true
  });

  useEffect(() => {
    fetch("http://localhost:8080/departments")
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "departmentId") {
      setFormData(prev => ({ ...prev, department: { id: Number(value) } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if(res.ok) alert("User registered!");
    else alert("Error registering user.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="passwordHash" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="employeeId" placeholder="Employee ID" onChange={handleChange} required />
      <select name="departmentId" onChange={handleChange} required>
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d.id} value={d.id}>{d.departmentName}</option>
        ))}
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
