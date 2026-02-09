// admin/api/certificates.js
import { apiClient } from "./client";

export const getCertificates = async () => {
  return await apiClient.get("/certificates");
};

export const getCertificate = async (id) => {
  return await apiClient.get(`/certificates/${id}`);
};

export const createCertificate = async (formData) => {
  return await apiClient.post("/certificates", formData);
};

export const updateCertificate = async (id, formData) => {
  return await apiClient.put(`/certificates/${id}`, formData);
};

export const deleteCertificate = async (id) => {
  return await apiClient.delete(`/certificates/${id}`);
};
