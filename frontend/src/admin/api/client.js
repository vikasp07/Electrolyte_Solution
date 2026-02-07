// admin/api/client.js
// Minimal fetch wrapper that injects JWT token from localStorage

const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://electrolyte-website.onrender.com/api";

function getToken() {
  try {
    return localStorage.getItem("token") || "";
  } catch (_) {
    return "";
  }
}

async function request(method, url, { headers = {}, body } = {}) {
  const token = getToken();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const finalHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers: finalHeaders,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    credentials: "include", // Include credentials (cookies, authorization headers)
    mode: "cors", // Explicitly set CORS mode
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export const apiClient = {
  get: (url) => request("GET", url),
  post: (url, payload) => request("POST", url, { body: payload }),
  put: (url, payload) => request("PUT", url, { body: payload }),
  patch: (url, payload) => request("PATCH", url, { body: payload }),
  delete: (url) => request("DELETE", url),
};
