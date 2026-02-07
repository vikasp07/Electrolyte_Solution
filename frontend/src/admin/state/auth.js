// admin/state/auth.js
// Lightweight auth helpers for token persistence

export function getToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch (_) {
    return "";
  }
}

export function setToken(token) {
  try {
    localStorage.setItem("token", token || "");
  } catch (_) {}
}

export function clearToken() {
  try {
    localStorage.removeItem("token");
  } catch (_) {}
}

export function isAuthenticated() {
  return !!getToken();
}
