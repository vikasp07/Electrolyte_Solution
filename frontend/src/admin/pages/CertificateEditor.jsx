// admin/pages/CertificateEditor.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCertificate,
  createCertificate,
  updateCertificate,
} from "../api/certificates";

export default function CertificateEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState({
    name: "",
    description: "",
    order: 0,
    active: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCertificate = useCallback(async () => {
    try {
      const data = await getCertificate(id);
      setForm({
        name: data.name || "",
        description: data.description || "",
        order: data.order || 0,
        active: data.active !== false,
      });
      if (data.image && data.image.url) {
        setImagePreview(data.image.url);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load certificate");
    }
  }, [id]);

  useEffect(() => {
    if (!isNew) {
      loadCertificate();
    }
  }, [isNew, loadCertificate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNew && !imageFile) {
      alert("Please select a certificate image");
      return;
    }

    if (!form.name.trim()) {
      alert("Please enter a certificate name");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("order", form.order);
      formData.append("active", form.active);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isNew) {
        await createCertificate(formData);
        alert("Certificate created successfully");
      } else {
        await updateCertificate(id, formData);
        alert("Certificate updated successfully");
      }

      navigate("/admin/certificates");
    } catch (err) {
      console.error(err);
      alert("Failed to save certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>{isNew ? "Add New Certificate" : "Edit Certificate"}</h1>
        <button
          onClick={() => navigate("/admin/certificates")}
          className="btn-secondary"
        >
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">
            Certificate Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., ISO 9001:2015"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">
            Certificate Image {isNew && <span className="required">*</span>}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*,.pdf"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="order">Display Order</label>
            <input
              type="number"
              id="order"
              name="order"
              value={form.order}
              onChange={handleChange}
              min="0"
            />
            <small>Lower numbers appear first</small>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              <span>Active (visible on website)</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? "Saving..."
              : isNew
                ? "Create Certificate"
                : "Update Certificate"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/certificates")}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
