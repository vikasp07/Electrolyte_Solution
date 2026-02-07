import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LatestBlogs.css";

/* ================= HELPERS ================= */

// Date formatter
const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

// Get current origin for images (dynamic based on environment)
const getImageOrigin = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://electrolyte-website.onrender.com";
  }
  return window.location.origin;
};

// Get API base URL
const getApiBase = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://electrolyte-website.onrender.com/api";
  }

  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  return "/api";
};

// Resolve relative image URLs safely
const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${getImageOrigin()}${url}`;
};

/* ================= LATEST BLOGS SECTION ================= */

const LatestBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const API_BASE = getApiBase();
        const res = await fetch(`${API_BASE}/blogs`, {
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          // Only show published blogs, deduplicate by slug, sort by date, latest 3
          const seenSlugs = new Set();
          const filteredBlogs = [];
          
          // First filter for published blogs and deduplicate
          if (Array.isArray(data)) {
            data.forEach((blog) => {
              if (blog.status === "published" && !seenSlugs.has(blog.slug)) {
                seenSlugs.add(blog.slug);
                filteredBlogs.push(blog);
              }
            });
          }
          
          // Sort by date (newest first)
          filteredBlogs.sort(
            (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
          );
          
          // Take only latest 3
          setBlogs(filteredBlogs.slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to load blogs:", e);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="latest-blogs-section">
        <div className="container">
          <div className="loading-blogs">Loading...</div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="latest-blogs-section">
      <div className="container">
        <div className="latest-blogs-header">
          <h2 className="section-title">Latest from Our Blog</h2>
          <button
            className="view-all-blogs-btn"
            onClick={() => navigate("/blog")}
          >
            View All Blogs
          </button>
        </div>

        <div className="latest-blogs-grid">
          {blogs.map((blog) => (
            <article
              key={blog._id || blog.id}
              className="latest-blog-card"
              onClick={() => navigate(`/blog/${blog.slug}`)}
            >
              <div className="latest-blog-card-image">
                <img
                  src={resolveImageUrl(
                    blog.featuredImage?.url || blog.image
                  )}
                  alt={blog.title}
                  loading="lazy"
                />
                <span className="latest-blog-category-badge">
                  {blog.category}
                </span>
              </div>

              <div className="latest-blog-card-content">
                <div className="latest-blog-meta">
                  <span className="latest-blog-date">
                    {formatDate(blog.createdAt || blog.date)}
                  </span>
                  <span className="latest-blog-category">
                    {blog.category}
                  </span>
                </div>

                <h3 className="latest-blog-card-title">{blog.title}</h3>
                <p className="latest-blog-card-excerpt">{blog.excerpt}</p>

                <span className="read-more-link">Read More →</span>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="latest-blogs-nav">
          <button className="blog-nav-btn prev" id="blog-prev">
            <i className="ri-arrow-left-line"></i>
          </button>
          <button className="blog-nav-btn next" id="blog-next">
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
