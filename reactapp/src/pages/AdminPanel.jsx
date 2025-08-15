// src/pages/AdminPanel.jsx
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

  const fetchAll = async () => {
    setDepartments(await api.getDepartments());
    setUsers(await api.getUsers());
    setPolicies(await api.getPolicies());
    setCategories(await api.getCategories());
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openModal = (fields, submitCallback, initialData = null) => {
    setModalFields(fields);
    setModalSubmit(() => submitCallback);
    setModalData(initialData);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // Handlers for add/edit
  const handleDepartmentEdit = (row) => openModal([
    { name: "departmentName", label: "Name" },
    { name: "departmentCode", label: "Code" },
  ], async (data) => {
    await api.updateDepartment(row.id, data);
    closeModal();
    fetchAll();
  }, row);

  const handleDepartmentAdd = () => openModal([
    { name: "departmentName", label: "Name" },
    { name: "departmentCode", label: "Code" },
  ], async (data) => {
    await api.createDepartment(data);
    closeModal();
    fetchAll();
  });

  const handleDepartmentDelete = async (id) => {
    await api.deleteDepartment(id);
    fetchAll();
  };

  // Similarly, add handlers for Users, Policies, Categories (same pattern)
  const handleUserEdit = (row) => openModal([
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
  ], async (data) => {
    await api.updateUser(row.id, data);
    closeModal();
    fetchAll();
  }, row);

  const handleUserAdd = () => openModal([
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
  ], async (data) => {
    await api.createUser(data);
    closeModal();
    fetchAll();
  });

  const handleUserDelete = async (id) => {
    await api.deleteUser(id);
    fetchAll();
  };

  // Expense Policies
  const handlePolicyEdit = (row) => openModal([
    { name: "policyName", label: "Name" },
  ], async (data) => {
    await api.updatePolicy(row.id, data);
    closeModal();
    fetchAll();
  }, row);

  const handlePolicyAdd = () => openModal([{ name: "policyName", label: "Name" }], async (data) => {
    await api.createPolicy(data);
    closeModal();
    fetchAll();
  });

  const handlePolicyDelete = async (id) => {
    await api.deletePolicy(id);
    fetchAll();
  };

  // Expense Categories
  const handleCategoryEdit = (row) => openModal([
    { name: "categoryName", label: "Name" },
  ], async (data) => {
    await api.updateCategory(row.id, data);
    closeModal();
    fetchAll();
  }, row);

  const handleCategoryAdd = () => openModal([{ name: "categoryName", label: "Name" }], async (data) => {
    await api.createCategory(data);
    closeModal();
    fetchAll();
  });

  const handleCategoryDelete = async (id) => {
    await api.deleteCategory(id);
    fetchAll();
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <section>
        <h3>Departments</h3>
        <button onClick={handleDepartmentAdd}>Add Department</button>
        <TableView
          columns={["id", "departmentName", "departmentCode"]}
          data={departments}
          onEdit={handleDepartmentEdit}
          onDelete={handleDepartmentDelete}
        />
      </section>

      <section>
        <h3>Users</h3>
        <button onClick={handleUserAdd}>Add User</button>
        <TableView
          columns={["id", "username", "email"]}
          data={users}
          onEdit={handleUserEdit}
          onDelete={handleUserDelete}
        />
      </section>

      <section>
        <h3>Expense Policies</h3>
        <button onClick={handlePolicyAdd}>Add Policy</button>
        <TableView
          columns={["id", "policyName"]}
          data={policies}
          onEdit={handlePolicyEdit}
          onDelete={handlePolicyDelete}
        />
      </section>

      <section>
        <h3>Expense Categories</h3>
        <button onClick={handleCategoryAdd}>Add Category</button>
        <TableView
          columns={["id", "categoryName"]}
          data={categories}
          onEdit={handleCategoryEdit}
          onDelete={handleCategoryDelete}
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
