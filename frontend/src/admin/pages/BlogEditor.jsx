// admin/pages/BlogEditor.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import RichTextEditor from "../components/RichTextEditor";
import { blogsApi } from "../api/blogs";

function slugify(text) {
  return (text || "")
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [source, setSource] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [publish, setPublish] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");

  const subtitle = isEdit ? "Edit Blog" : "Create New Blog";

  const loadExisting = useCallback(async () => {
    if (!isEdit) return;
    setLoading(true);
    setError("");
    try {
      const all = await blogsApi.listAdmin();
      const found = (all || []).find((b) => b._id === id);
      if (!found) {
        setError("Blog not found");
        return;
      }
      setTitle(found.title || "");
      setSlug(found.slug || "");
      setSource(found.source || "");
      setExcerpt(found.excerpt || "");
      setContent(found.content || "");
      setMetaTitle(found.metaTitle || "");
      setMetaDescription(found.metaDescription || "");
      setMetaKeywords(found.metaKeywords || "");
      setPublish(found.status === "published");
      const url = found?.featuredImage?.url;
      if (url) setFeaturedImagePreview(url);
    } catch (e) {
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  }, [isEdit, id]);

  useEffect(() => { 
    loadExisting(); 
  }, [id, isEdit, loadExisting]);

  // Auto-generate slug if empty when title changes
  useEffect(() => {
    if (!isEdit && !slug && title) {
      setSlug(slugify(title));
    }
  }, [title, isEdit, slug]);

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    setFeaturedImageFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFeaturedImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFeaturedImagePreview("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    try {
      // Sanitize content to remove any RTL attributes
      let sanitizedContent = content
        .replace(/dir="rtl"/g, "")
        .replace(/direction:\s*rtl/g, "");

      const fd = new FormData();
      fd.append("title", title);
      if (slug) fd.append("slug", slug);
      if (source) fd.append("source", source);
      if (excerpt) fd.append("excerpt", excerpt);
      if (sanitizedContent) fd.append("content", sanitizedContent);
      if (metaTitle) fd.append("metaTitle", metaTitle);
      if (metaDescription) fd.append("metaDescription", metaDescription);
      if (metaKeywords) fd.append("metaKeywords", metaKeywords);
      fd.append("status", publish ? "published" : "draft");
      if (featuredImageFile) fd.append("featuredImage", featuredImageFile);

      if (isEdit) {
        await blogsApi.update(id, fd);
      } else {
        await blogsApi.create(fd);
      }
      navigate("/admin/blogs");
    } catch (e) {
      setError("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <header style={{ marginBottom: 16 }}>
          <h1>Write & Manage Blogs</h1>
          <p>{subtitle}</p>
        </header>

        <form onSubmit={onSubmit}>
          {/* Blog Fields */}
          <section style={{ marginBottom: 16 }}>
            <h2>Blog Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label>Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%" }} />
              </div>
              <div>
                <label>Slug (SEO URL)</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} style={{ width: "100%" }} />
              </div>
              <div>
                <label>Source (optional)</label>
                <input type="text" value={source} onChange={(e) => setSource(e.target.value)} style={{ width: "100%" }} />
              </div>
              <div>
                <label>Excerpt / Summary</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} style={{ width: "100%" }} />
              </div>
            </div>
          </section>

          {/* Content Editor */}
          <section style={{ marginBottom: 16 }}>
            <h2>Content Editor</h2>
            <RichTextEditor value={content} onChange={setContent} />
          </section>

          {/* Media */}
          <section style={{ marginBottom: 16 }}>
            <h2>Media</h2>
            <div>
              <label>Featured Image</label>
              <input type="file" accept="image/*" onChange={onImageChange} />
              {featuredImagePreview && (
                <div style={{ marginTop: 8 }}>
                  <img src={featuredImagePreview} alt="Preview" style={{ maxWidth: 240 }} />
                </div>
              )}
            </div>
          </section>

          {/* SEO Settings */}
          <section style={{ marginBottom: 16 }}>
            <h2>SEO Settings</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label>Meta Title (max 70 chars)</label>
                <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value.slice(0, 70))} style={{ width: "100%" }} />
              </div>
              <div>
                <label>Meta Description (max 160 chars)</label>
                <input type="text" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))} style={{ width: "100%" }} />
              </div>
              <div>
                <label>Meta Keywords (comma separated)</label>
                <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} style={{ width: "100%" }} />
              </div>
            </div>
          </section>

          {/* Publish Controls */}
          <section style={{ marginBottom: 16 }}>
            <h2>Publish</h2>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
              Publish this blog
            </label>
          </section>

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
            {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Blog" : "Create Blog")}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default BlogEditor;
