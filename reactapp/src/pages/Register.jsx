import { useState, useEffect } from "react";

export default function RegistrationPage() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passwordHash: "",
    role: "EMPLOYEE",
    employeeId: "",
    department: null,   // defaults to null if no departments
    manager: "",        // backend will set automatically
    createdDate: "",    // backend will set automatically
    lastLogin: "",      // backend will set automatically
    isActive: true
  });

  // Fetch departments from backend
  useEffect(() => {
    fetch("https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/departments")
      .then(res => res.json())
      .then(data => {
        setDepartments(data);
        if (data.length === 0) {
          setFormData(prev => ({ ...prev, department: null })); // no departments
        }
      })
      .catch(err => {
        console.error("Failed to fetch departments:", err);
        setFormData(prev => ({ ...prev, department: null })); // fallback null
      });
  }, []);

  // Handle form input changes
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) alert("User registered!");
      else alert("Error registering user.");
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

      {departments.length > 0 ? (
        <select name="departmentId" onChange={handleChange} required>
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
