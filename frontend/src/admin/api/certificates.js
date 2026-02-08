// admin/api/certificates.js
import client from "./client";

export const getCertificates = async () => {
  const res = await client.get("/certificates");
  return res.data;
};

export const getCertificate = async (id) => {
  const res = await client.get(`/certificates/${id}`);
  return res.data;
};

export const createCertificate = async (formData) => {
  const res = await client.post("/certificates", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCertificate = async (id, formData) => {
  const res = await client.put(`/certificates/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteCertificate = async (id) => {
  const res = await client.delete(`/certificates/${id}`);
  return res.data;
};
