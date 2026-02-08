// admin/pages/CertificateList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCertificates,
  deleteCertificate,
} from "../api/certificates";

export default function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await deleteCertificate(id);
      alert("Certificate deleted");
      loadCertificates();
    } catch (err) {
      console.error(err);
      alert("Failed to delete certificate");
    }
  };

  if (loading) return <div className="admin-container">Loading...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Certificates</h1>
        <Link to="/admin/certificates/new" className="btn-primary">
          Add New Certificate
        </Link>
      </div>

      {certificates.length === 0 ? (
        <p>No certificates yet.</p>
      ) : (
        <div className="admin-grid">
          {certificates.map((cert) => (
            <div key={cert._id} className="admin-card">
              {cert.image && cert.image.url && (
                <img
                  src={cert.image.url}
                  alt={cert.name}
                  className="admin-card-image"
                />
              )}
              <div className="admin-card-content">
                <h3>{cert.name}</h3>
                {cert.description && <p>{cert.description}</p>}
                <div className="admin-card-meta">
                  <span>Order: {cert.order}</span>
                  <span
                    className={`status-badge ${
                      cert.active ? "status-active" : "status-inactive"
                    }`}
                  >
                    {cert.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="admin-card-actions">
                  <Link
                    to={`/admin/certificates/${cert._id}`}
                    className="btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
