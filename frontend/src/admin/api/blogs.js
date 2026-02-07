// admin/api/blogs.js
import { apiClient } from "./client";

export const blogsApi = {
  // Admin endpoints
  listAdmin: (status) => apiClient.get(`/blogs/admin${status ? `?status=${encodeURIComponent(status)}` : ""}`),
  create: (formData) => apiClient.post(`/blogs`, formData),
  update: (id, formData) => apiClient.put(`/blogs/${id}`, formData),
  setStatus: (id, status) => apiClient.patch(`/blogs/${id}/status`, { status }),
  remove: (id) => apiClient.delete(`/blogs/${id}`),

  // Public endpoints (not used in admin but available)
  listPublished: () => apiClient.get(`/blogs`),
  getBySlug: (slug) => apiClient.get(`/blogs/${encodeURIComponent(slug)}`),
};
