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
  setDepartments(data.map(d => ({
    ...d,
    isActive: d.isActive ? "Yes" : "No"   // only for display
  })));
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
  async (data) => {
    // 🔥 Ensure boolean, not "Yes"/"No"
    const payload = {
      ...data,
      isActive: !!data.isActive
    };

    await api.updateDepartment(row.id, payload);
    closeModal();
    fetchDepartments();
  },
  {
    ...row,
    // 🔥 convert "Yes"/"No" back to boolean for modal form
    isActive: row.isActive === "Yes"
  }
);


  const handleDepartmentDelete = async (id) => { await api.deleteDepartment(id); fetchDepartments(); };

  // ---------------- Users ----------------
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
    { name: "passwordHash", label: "Password", type: "password" },  // user enters 'password'
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "role", label: "Role", type: "select", options: roleOptions },
    { name: "departmentId", label: "Department", type: "select", options: departments.map(d => ({ label: d.departmentName, value: d.id })) },
    { name: "isActive", label: "Active", type: "checkbox", default: true }
  ],
  async (data) => {
    const payload = {
      ...data,
      passwordHash: data.password || "default123",
      department: data.departmentId ? { id: data.departmentId } : null,
    };
    delete payload.password;
    delete payload.departmentId;

    console.log("Creating user with payload:", payload); // ✅ debug
    await api.createUser(payload);
    closeModal();
    fetchUsers();
  }
);


const handleUserEdit = (row) => openModal(
  [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "employeeId", label: "Employee ID", type: "text" },
    { name: "role", label: "Role", type: "select", options: roleOptions },
    { name: "departmentId", label: "Department", type: "select", options: departments.map(d => ({ label: d.departmentName, value: d.id })) },
    { name: "isActive", label: "Active", type: "checkbox" }
  ],
  async (data) => {
    // If password entered, send it as passwordHash
    if (data.password) data.passwordHash = data.password;
    delete data.password;

    // Only send departmentId
    if (!data.departmentId) delete data.departmentId;

    await api.updateUser(row.id, data);
    closeModal();
    fetchUsers();
  },
  { ...row, departmentId: row.department?.id }
);

const handleUserDelete = async (id) => {
  await api.deleteUser(id);
  fetchUsers();
};


  // ---------------- Expense Policies ----------------
  // ---------------- Expense Policies ----------------
// ---------------- Expense Policies ----------------
const handlePolicyAdd = () =>
  openModal(
    [
      { name: "policyName", label: "Name", type: "text" },
      { name: "spendingLimit", label: "Spending Limit", type: "number" },
      { name: "approvalRequired", label: "Approval Required", type: "checkbox", default: true },
      { name: "receiptRequired", label: "Receipt Required", type: "checkbox", default: true },
      { name: "effectiveDate", label: "Effective Date", type: "date", default: new Date().toISOString().split("T")[0] },
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
      {
        name: "categoryId",
        label: "Category",
        type: "select",
        options: categories.map(c => ({ label: c.categoryName, value: c.id }))
      }
    ],
    async (data) => {
      const payload = {
        policyName: data.policyName || "Untitled Policy",
        category: data.categoryId?{id:Number(data.categoryId)} : null,
        spendingLimit: data.spendingLimit? Number(data.spendingLimit) :  0,
        approvalRequired: !!data.approvalRequired,
        receiptRequired: !!data.receiptRequired,
        effectiveDate: data.effectiveDate,
        expiryDate: data.expiryDate || null,
        isActive: data.isActive
      };
      console.log("Policy payload:", payload);
      await api.createPolicy(payload);
      closeModal();
      fetchPolicies();
    }
  );

const handlePolicyEdit = (row) =>
  openModal(
    [
      { name: "policyName", label: "Name", type: "text" },
      { name: "categoryId", label: "Category", type: "select", options: categories.map(c => ({ label: c.categoryName, value: c.id })) },
      { name: "spendingLimit", label: "Spending Limit", type: "number" },
      { name: "approvalRequired", label: "Approval Required", type: "checkbox" },
      { name: "receiptRequired", label: "Receipt Required", type: "checkbox" },
      { name: "effectiveDate", label: "Effective Date", type: "date" },
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
    async (data) => {
      const payload = {
        policyName: data.policyName || "Untitled Policy",
        category: data.categoryId ? { id: Number(data.categoryId) } : null,
        spendingLimit: data.spendingLimit ? Number(data.spendingLimit) : 0,
        approvalRequired: !!data.approvalRequired,
        receiptRequired: !!data.receiptRequired,
        effectiveDate: data.effectiveDate,
        expiryDate: data.expiryDate || null,
        isActive: !!data.isActive
      };

      console.log("Policy payload for update:", payload);
      await api.updatePolicy(row.id, payload);
      closeModal();
      fetchPolicies();
    },
    {
      ...row,
      categoryId: row.category?.id || "",
      spendingLimit: row.spendingLimit || 0
    }
  );

  const handlePolicyDelete = async (id) => { await api.deletePolicy(id); fetchPolicies(); };

  // ---------------- Expense Categories ----------------
  const handleCategoryAdd = () => openModal(
    [
      { name: "categoryName", label: "Name", type: "text" },
      { name: "categoryCode", label: "Code", type: "text" },
      { name: "policyLimit", label: "Policy Limit", type: "number" },
      { name: "requiresReceipt", label: "Requires Receipt", type: "checkbox", default: true },
      { name: "requiresBusinessPurpose", label: "Requires Business Purpose", type: "checkbox", default: true },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
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
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    async (data) => { await api.updateCategory(row.id, data); closeModal(); fetchCategories(); },
    row
  );

  const handleCategoryDelete = async (id) => { await api.deleteCategory(id); fetchCategories(); };

  return (
  <div className="admin-panel">
    <h2>Admin Panel</h2>

    {/* Departments */}
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

    {/* Users */}
    <section>
      <h3>Users</h3>
      <button onClick={handleUserAdd}>Add User</button>
      <TableView
  columns={["id", "username", "email", "role", "employeeId", "department", "isActive"]}
  data={users.map(u => {
    const dept = departments.find(d => d.id === u.department?.id || u.departmentId);
    return {
      ...u,
      department: dept ? dept.departmentName : "",
      departmentId: dept?.id||null,
      isActive: u.isActive ? "true" : "false"
    };
  })}
  onEdit={handleUserEdit}
  onDelete={handleUserDelete}
/>

    </section>

    {/* Expense Policies */}
    <section>
      <h3>Expense Policies</h3>
      <button onClick={handlePolicyAdd}>Add Policy</button>
      <TableView
        columns={["id", "policyName", "spendingLimit", "approvalRequired", "receiptRequired", "isActive"]}
        data={policies.map(p => ({
          ...p,
          approvalRequired: p.approvalRequired ? "true" : "false",
          receiptRequired: p.receiptRequired ? "true" : "false",
          isActive: p.isActive ? "true" : "false"
        }))}
        onEdit={handlePolicyEdit}
        onDelete={handlePolicyDelete}
      />
    </section>

    {/* Expense Categories */}
    <section>
      <h3>Expense Categories</h3>
      <button onClick={handleCategoryAdd}>Add Category</button>
      <TableView
        columns={["id", "categoryName", "categoryCode", "policyLimit", "requiresReceipt", "requiresBusinessPurpose", "isActive"]}
        data={categories.map(c => ({
          ...c,
          requiresReceipt: c.requiresReceipt ? "true" : "false",
          requiresBusinessPurpose: c.requiresBusinessPurpose ? "true" : "false",
          isActive: c.isActive ? "true" : "false"
        }))}
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








