// src/utils/api.js
import { getToken } from "./auth";

const BASE_URL = "https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/api/expenses";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export async function createExpense(expense) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(expense),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create expense");
  }
  return res.json();
}

export async function getExpenses() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch expenses");
  }
  return res.json();
}

export async function updateExpenseStatus(id, updateData) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update expense status");
  }
  return res.json();
}
