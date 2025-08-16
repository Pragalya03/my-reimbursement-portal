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
    manager: "",           // backend will ignore or fill automatically
    createdDate: "",       // backend will ignore
    lastLogin: "",         // backend will ignore
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
    if(name === "departmentId") {
      setFormData(prev => ({ ...prev, department: { id: Number(value) } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if(res.ok) alert("User registered!");
      else alert("Error registering user.");
    } catch(err) {
      console.error("Failed to submit registration:", err);
      alert("Failed to connect to server.");
    }
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
