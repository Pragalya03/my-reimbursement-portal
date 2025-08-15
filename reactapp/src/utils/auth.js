// src/utils/auth.js
export const login = async (username, password) => {
  const res = await fetch(
    "https://8080-faedbbbbecaaddcbcedcecbaebefef.premiumproject.examly.io/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail: username, password }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Login failed");
  }

  const data = await res.json();
  // Store JWT token and current user info
  localStorage.setItem("jwtToken", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("currentUser");
};

export const getToken = () => localStorage.getItem("jwtToken");

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));
