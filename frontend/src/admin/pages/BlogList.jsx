// admin/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { blogsApi } from "../api/blogs";

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${status}`}>
    {status === "published" ? "Published" : "Draft"}
  </span>
);

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await blogsApi.listAdmin();
      setBlogs(data || []);
    } catch (e) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleStatus = async (b) => {
    const next = b.status === "published" ? "draft" : "published";
    try {
      await blogsApi.setStatus(b._id, next);
      await load();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const remove = async (b) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await blogsApi.remove(b._id);
      await load();
    } catch (e) {
      alert("Failed to delete blog");
    }
  };

  return (
    <Layout>
      <div className="blog-list-container">
        <div className="blog-list-header">
          <h1>Blogs</h1>
        </div>
        
        {loading && <div className="admin-loading">Loading...</div>}
        {error && <div className="admin-error">{error}</div>}
        
        {!loading && blogs.length === 0 && (
          <div className="empty-state">
            <p>No blogs yet. Create your first blog!</p>
          </div>
        )}
        
        {!loading && blogs.length > 0 && (
          <div className="table-wrapper">
            <table className="blogs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id}>
                    <td className="title-cell">
                      <div className="title-content">
                        {b.featuredImage?.url && (
                          <img src={b.featuredImage.url} alt={b.title} className="blog-thumb" />
                        )}
                        <span>{b.title}</span>
                      </div>
                    </td>
                    <td className="slug-cell">{b.slug}</td>
                    <td className="status-cell">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="date-cell">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <Link to={`/admin/blogs/${b._id}/edit`} className="btn-action btn-edit">
                          Edit
                        </Link>
                        <button 
                          type="button" 
                          onClick={() => toggleStatus(b)}
                          className={`btn-action ${b.status === "published" ? "btn-unpublish" : "btn-publish"}`}
                        >
                          {b.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => remove(b)}
                          className="btn-action btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogList;
