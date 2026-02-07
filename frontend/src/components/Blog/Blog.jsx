import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Blog.css";
import SeoHead from "../SEO/SeoHead";

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
  // In production, use the production API origin
  if (process.env.NODE_ENV === 'production') {
    return "https://electrolyte-website.onrender.com";
  }
  
  // In development, use the current page origin
  return window.location.origin;
};

// Get API base URL
const getApiBase = () => {
  // In production build, use the production API
  if (process.env.NODE_ENV === 'production') {
    return "https://electrolyte-website.onrender.com/api";
  }
  
  // In development, check if we have a custom API URL
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Default to local backend
  return "/api";
};

// Resolve relative image URLs safely
const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${getImageOrigin()}${url}`;
};

/* ================= BLOG LIST ================= */

const BlogList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const API_BASE = getApiBase();
        console.log("Blog list API:", `${API_BASE}/blogs`);

        const res = await fetch(`${API_BASE}/blogs`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response:", text.slice(0, 200));
          throw new Error("Response is not JSON");
        }

        const data = await res.json();
        console.log("Successfully loaded blogs:", data.length);
        setBlogs(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load blogs:", e);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="blog-page">
      <section className="blog-hero-section">
        <div
          className="blog-hero-bg"
          style={{
            backgroundImage:
              "url('/images/Home/Industry-based-Use-Cases.jpg')",
          }}
        />
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Our Blog</h1>
          <p className="blog-hero-subtitle">
            Insights, updates, and expert perspectives on cybersecurity,
            industrial protection, and data diode technology
          </p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="blog-container">
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}

          <div className="blog-filter-bar">
            <span className="filter-label">Filter by Category:</span>
            <div className="filter-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id || blog.id}
                className="blog-card"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <div className="blog-card-image">
                  <img
                    src={resolveImageUrl(
                      blog.featuredImage?.url || blog.image
                    )}
                    alt={blog.title}
                    loading="lazy"
                  />
                  <span className="blog-category-badge">
                    {blog.category}
                  </span>
                </div>

                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-date">
                      {formatDate(blog.createdAt || blog.date)}
                    </span>
                    <span className="blog-author">
                      By {blog.author || "Electrolyte Team"}
                    </span>
                  </div>

                  <h2 className="blog-card-title">{blog.title}</h2>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>

                  <div className="blog-card-footer">
                    <div className="blog-tags">
                      {blog.metaKeywords
                        ?.split(",")
                        .slice(0, 2)
                        .map((tag, i) => (
                          <span key={i} className="blog-tag hashtag">
                            #{tag.trim()}
                          </span>
                        ))}
                    </div>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="read-more-btn"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= BLOG POST ================= */

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const API_BASE = getApiBase();
        console.log("Blog post API:", `${API_BASE}/blogs/${slug}`);

        const res = await fetch(
          `${API_BASE}/blogs/${encodeURIComponent(slug)}`,
          { headers: { Accept: "application/json" } }
        );

        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }

        const listRes = await fetch(`${API_BASE}/blogs`, {
          headers: { Accept: "application/json" },
        });
        const listData = await listRes.json();
        setAllBlogs(Array.isArray(listData) ? listData : []);
      } catch (e) {
        console.error("Failed to load blog:", e);
      }
      window.scrollTo(0, 0);
    };
    load();
  }, [slug]);

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Blog post not found or unpublished</h2>
        <button onClick={() => navigate("/blog")} className="btn-back">
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = allBlogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <div className="blog-post-page">
      <SeoHead
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.metaKeywords}
        ogTitle={blog.ogTitle || blog.title}
        ogDescription={blog.ogDescription || blog.excerpt}
        ogImage={resolveImageUrl(blog.featuredImage?.url)}
        canonical={window.location.href}
      />

      <section className="blog-post-hero">
        <div
          className="blog-post-hero-bg"
          style={{
            backgroundImage: `url('${resolveImageUrl(
              blog.featuredImage?.url
            )}')`,
          }}
        />
        <div className="blog-post-hero-overlay" />
        <div className="blog-post-hero-content">
          <span className="blog-category-badge">{blog.category}</span>
          <h1>{blog.title}</h1>
        </div>
      </section>

      <section className="blog-post-content-section">
        <div className="blog-post-container">
          <article className="blog-post-article">
            <img
              src={resolveImageUrl(blog.featuredImage?.url)}
              alt={blog.title}
            />

            <div
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {relatedPosts.length > 0 && (
            <div className="related-posts">
              {relatedPosts.map((post) => (
                <article
                  key={post._id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <img
                    src={resolveImageUrl(
                      post.featuredImage?.url || post.image
                    )}
                    alt={post.title}
                  />
                  <h4>{post.title}</h4>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ================= MAIN ================= */

const Blog = () => {
  const { slug } = useParams();
  return slug ? <BlogPost /> : <BlogList />;
};

export default Blog;
export { BlogList, BlogPost };
