const BASE_URL = "http://localhost:8080/api/expenses";

export async function createExpense(expense) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to create expense");
  return res.json();
}

export async function getExpenses() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function updateExpenseStatus(id, updateData) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) throw new Error("Failed to update expense status");
  return res.json();
}
