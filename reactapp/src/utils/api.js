const BASE_URL = "https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io";

export async function createExpense(expense) {
  const res = await fetch(`${BASE_URL}/api/expenses`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(expense),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create expense");
  }
  return res.json();
}

export async function getExpenses() {
  const res = await fetch(`${BASE_URL}/api/expenses`, {
    method: "GET",
    headers: {"Content-Type" : "application/json"},
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch expenses");
  }
  return res.json();
}


export async function updateExpenseStatus(id, updateData) {
  const res = await fetch(`${BASE_URL}/api/expenses/${id}/status`, {
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update expense status");
  }
  return res.json();
}

// ---------- Departments ----------
export const getDepartments = async () => {
  try {
    const res = await fetch(`${BASE_URL}/departments`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch departments:", err);
    return [];
  }
};

export const createDepartment = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/departments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to create department:", err);
    return null;
  }
};

export const updateDepartment = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to update department:", err);
    return null;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/departments/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  } catch (err) {
    console.error("Failed to delete department:", err);
  }
};

// ---------- Users ----------
export const getUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
};

export const createUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to create user:", err);
    return null;
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to update user:", err);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  } catch (err) {
    console.error("Failed to delete user:", err);
  }
};

// ---------- Policies ----------
export const getPolicies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/policies`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch policies:", err);
    return [];
  }
};

export const createPolicy = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/policies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to create policy:", err);
    return null;
  }
};

export const updatePolicy = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/policies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to update policy:", err);
    return null;
  }
};

export const deletePolicy = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/policies/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  } catch (err) {
    console.error("Failed to delete policy:", err);
  }
};

// ---------- Categories ----------
export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};

export const createCategory = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to create category:", err);
    return null;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to update category:", err);
    return null;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  } catch (err) {
    console.error("Failed to delete category:", err);
  }
};
