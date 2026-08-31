// Save JWT Token
export function saveToken(token) {
  localStorage.setItem("adminToken", token);
}

// Get JWT Token
export function getToken() {
  return localStorage.getItem("adminToken");
}

// Remove JWT Token
export function clearToken() {
  localStorage.removeItem("adminToken");
}

// Check Login
export function isAuthenticated() {
  return !!getToken();
}