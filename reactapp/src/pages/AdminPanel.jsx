import React, { useEffect, useState } from "react";
import TableView from "../components/TableView";
import ModalForm from "../components/ModalForm";
import * as api from "../utils/api.js";
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalFields, setModalFields] = useState([]);
  const [modalSubmit, setModalSubmit] = useState(() => {});
  const [showModal, setShowModal] = useState(false);

  // ---------------- Fetch functions ----------------
  const fetchDepartments = async () => {
    const data = await api.getDepartments();
    setDepartments(data.map(d => ({ ...d, isActive: d.isActive ? "Yes" : "No" })));
  };
  const fetchUsers = async () => setUsers(await api.getUsers());
  const fetchPolicies = async () => setPolicies(await api.getPolicies());
  const fetchCategories = async () => setCategories(await api.getCategories());

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
    fetchPolicies();
    fetchCategories();
  }, []);

  // ---------------- Modal helpers ----------------
  const openModal = (fields, submitCallback, initialData = null) => {
    setModalFields(fields);
    setModalSubmit(() => submitCallback);
    setModalData(initialData);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // ---------------- Users ----------------
  const roleOptions = [
    { label: "EMPLOYEE", value: "EMPLOYEE" },
    { label: "MANAGER", value: "MANAGER" },
    { label: "FINANCE_MANAGER", value: "FINANCE_MANAGER" },
    { label: "ADMIN", value: "ADMIN" },
    { label: "AUDITOR", value: "AUDITOR" }
  ];

  const handleUserAdd = () => openModal(
    [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "passwordHash", label: "Password", type: "password" },
      { name: "employeeId", label: "Employee ID", type: "text" },
      { name: "role", label: "Role", type: "select", options: roleOptions },
      { name: "departmentId", label: "Department", type: "select", options: departments.map(d => ({ label: d.departmentName, value: d.id })) },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
    ],
    async (data) => {
      // Convert departmentId to department object if exists
      if (data.departmentId) data.department = { id: data.departmentId };
      await api.createUser(data);
      closeModal();
      fetchUsers();
    }
  );

  const handleUserEdit = (row) => openModal(
    [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "passwordHash", label: "Password", type: "password" },
      { name: "employeeId", label: "Employee ID", type: "text" },
      { name: "role", label: "Role", type: "select", options: roleOptions },
      { name: "departmentId", label: "Department", type: "select", options: departments.map(d => ({ label: d.departmentName, value: d.id })) },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    async (data) => {
      if (data.departmentId) data.department = { id: data.departmentId };
      await api.updateUser(row.id, data);
      closeModal();
      fetchUsers();
    },
    {
      ...row,
      departmentId: row.department?.id
    }
  );

  const handleUserDelete = async (id) => { await api.deleteUser(id); fetchUsers(); };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <section>
        <h3>Users</h3>
        <button onClick={handleUserAdd}>Add User</button>
        <TableView
          columns={["id", "username", "email", "role", "employeeId", "department", "isActive"]}
          data={users.map(u => ({
            ...u,
            department: u.department?.departmentName || "",
            isActive: u.isActive ? "Yes" : "No"
          }))}
          onEdit={handleUserEdit}
          onDelete={handleUserDelete}
        />
      </section>

      {showModal && (
        <ModalForm
          fields={modalFields}
          initialData={modalData}
          onSubmit={modalSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AdminPanel;
