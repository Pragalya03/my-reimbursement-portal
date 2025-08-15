// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import TableView from "../components/TableView";
import ModalForm from "../components/ModalForm";
import * as api from "../utils/api.js";
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  // Table data states
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);

  // Modal states
  const [modalData, setModalData] = useState(null);
  const [modalFields, setModalFields] = useState([]);
  const [modalSubmit, setModalSubmit] = useState(() => {});
  const [showModal, setShowModal] = useState(false);

  // Fetch functions
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

  // Modal helpers
  const openModal = (fields, submitCallback, initialData = null) => {
    setModalFields(fields);
    setModalSubmit(() => submitCallback);
    setModalData(initialData);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // ---------------- Departments ----------------
  const handleDepartmentAdd = () => openModal(
    [
      { name: "departmentName", label: "Name", type: "text" },
      { name: "departmentCode", label: "Code", type: "text" },
      { name: "budgetLimit", label: "Budget Limit", type: "number" },
      { name: "costCenter", label: "Cost Center", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
    ],
    async (data) => { await api.createDepartment(data); closeModal(); fetchDepartments(); }
  );
  const handleDepartmentEdit = (row) => openModal(
    [
      { name: "departmentName", label: "Name", type: "text" },
      { name: "departmentCode", label: "Code", type: "text" },
      { name: "budgetLimit", label: "Budget Limit", type: "number" },
      { name: "costCenter", label: "Cost Center", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    async (data) => { await api.updateDepartment(row.id, data); closeModal(); fetchDepartments(); },
    row
  );
  const handleDepartmentDelete = async (id) => { await api.deleteDepartment(id); fetchDepartments(); };

  // ---------------- Users ----------------
  const handleUserAdd = () => openModal(
    [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "passwordHash", label: "Password", type: "password" },
      { name: "role", label: "Role", type: "select", options: ["EMPLOYEE","MANAGER","FINANCE_MANAGER","ADMIN","AUDITOR"] },
      { name: "employeeId", label: "Employee ID", type: "text" },
      { name: "department", label: "Department ID", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
    ],
    async (data) => { await api.createUser(data); closeModal(); fetchUsers(); }
  );
  const handleUserEdit = (row) => openModal(
    [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "passwordHash", label: "Password", type: "password" },
      { name: "role", label: "Role", type: "select", options: ["EMPLOYEE","MANAGER","FINANCE_MANAGER","ADMIN","AUDITOR"] },
      { name: "employeeId", label: "Employee ID", type: "text" },
      { name: "department", label: "Department ID", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    async (data) => { await api.updateUser(row.id, data); closeModal(); fetchUsers(); },
    row
  );
  const handleUserDelete = async (id) => { await api.deleteUser(id); fetchUsers(); };

  // ---------------- Policies ----------------
  const handlePolicyAdd = () => openModal(
    [
      { name: "policyName", label: "Policy Name", type: "text" },
      { name: "category", label: "Category ID", type: "number" },
      { name: "spendingLimit", label: "Spending Limit", type: "number" },
      { name: "approvalRequired", label: "Approval Required", type: "checkbox" },
      { name: "receiptRequired", label: "Receipt Required", type: "checkbox" },
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
    ],
    async (data) => { await api.createPolicy(data); closeModal(); fetchPolicies(); }
  );
  const handlePolicyEdit = (row) => openModal(
    [
      { name: "policyName", label: "Policy Name", type: "text" },
      { name: "category", label: "Category ID", type: "number" },
      { name: "spendingLimit", label: "Spending Limit", type: "number" },
      { name: "approvalRequired", label: "Approval Required", type: "checkbox" },
      { name: "receiptRequired", label: "Receipt Required", type: "checkbox" },
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    async (data) => { await api.updatePolicy(row.id, data); closeModal(); fetchPolicies(); },
    row
  );
  const handlePolicyDelete = async (id) => { await api.deletePolicy(id); fetchPolicies(); };

  // ---------------- Categories ----------------
  const handleCategoryAdd = () => openModal(
    [
      { name: "categoryName", label: "Name", type: "text" },
      { name: "categoryCode", label: "Code", type: "text" },
      { name: "policyLimit", label: "Policy Limit", type: "number" },
      { name: "requiresReceipt", label: "Requires Receipt", type: "checkbox" },
      { name: "requiresBusinessPurpose", label: "Requires Business Purpose", type: "checkbox" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
      { name: "parentCategory", label: "Parent Category ID", type: "number" }
    ],
    async (data) => { await api.createCategory(data); closeModal(); fetchCategories(); }
  );
  const handleCategoryEdit = (row) => openModal(
    [
      { name: "categoryName", label: "Name", type: "text" },
      { name: "categoryCode", label: "Code", type: "text" },
      { name: "policyLimit", label: "Policy Limit", type: "number" },
      { name: "requiresReceipt", label: "Requires Receipt", type: "checkbox" },
      { name: "requiresBusinessPurpose", label: "Requires Business Purpose", type: "checkbox" },
      { name: "isActive", label: "Active", type: "checkbox" },
      { name: "parentCategory", label: "Parent Category ID", type: "number" }
    ],
    async (data) => { await api.updateCategory(row.id, data); closeModal(); fetchCategories(); },
    row
  );
  const handleCategoryDelete = async (id) => { await api.deleteCategory(id); fetchCategories(); };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <section>
        <h3>Departments</h3>
        <button onClick={handleDepartmentAdd}>Add Department</button>
        <TableView
          columns={["id", "departmentName", "departmentCode", "budgetLimit", "costCenter", "isActive"]}
          data={departments}
          onEdit={handleDepartmentEdit}
          onDelete={handleDepartmentDelete}
        />
      </section>

      <section>
        <h3>Users</h3>
        <button onClick={handleUserAdd}>Add User</button>
        <TableView
          columns={["id", "username", "email", "role", "employeeId", "department", "isActive"]}
          data={users}
          onEdit={handleUserEdit}
          onDelete={handleUserDelete}
        />
      </section>

      <section>
        <h3>Expense Policies</h3>
        <button onClick={handlePolicyAdd}>Add Policy</button>
        <TableView
          columns={["id", "policyName", "category", "spendingLimit", "approvalRequired", "receiptRequired", "effectiveDate", "expiryDate", "isActive"]}
          data={policies}
          onEdit={handlePolicyEdit}
          onDelete={handlePolicyDelete}
        />
      </section>

      <section>
        <h3>Expense Categories</h3>
        <button onClick={handleCategoryAdd}>Add Category</button>
        <TableView
          columns={["id", "categoryName", "categoryCode", "policyLimit", "requiresReceipt", "requiresBusinessPurpose", "isActive", "parentCategory"]}
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
