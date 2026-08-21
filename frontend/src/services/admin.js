import { apiFetch } from "./api";

// Login
export async function adminLogin(username, password) {
  return apiFetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

// Logout
export function adminLogout() {
  localStorage.removeItem("adminToken");
}