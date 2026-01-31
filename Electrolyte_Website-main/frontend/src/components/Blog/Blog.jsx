import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Blog.css";
import SeoHead from "../SEO/SeoHead";

// Helper to format date
const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  } catch (_) {
    return "";
  }
};

// Blog List Component - Shows all blogs
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
        const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://electrolyte-website.onrender.com/api";
        const res = await fetch(`${API_BASE}/blogs`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
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

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
  const filteredBlogs = selectedCategory === "All" ? blogs : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="blog-page">
      <section className="blog-hero-section">
        <div className="blog-hero-bg" style={{ backgroundImage: "url('/images/Home/Industry-based-Use-Cases.jpg')" }} />
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Our Blog</h1>
          <p className="blog-hero-subtitle">
            Insights, updates, and expert perspectives on cybersecurity, industrial protection, and data diode technology
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
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-grid">
            {filteredBlogs.length === 0 && !loading && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 20px", color: "rgba(255, 255, 255, 0.7)" }}>
                <p style={{ fontSize: "1.1em" }}>No blogs published yet</p>
              </div>
            )}
            {filteredBlogs.map((blog) => (
              <article 
                key={blog._id || blog.id} 
                className="blog-card"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <div className="blog-card-image">
                  <img src={(blog.featuredImage && blog.featuredImage.url) || blog.image || ""} alt={blog.title} loading="lazy" />
                  <span className="blog-category-badge">{blog.category}</span>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-date">{formatDate(blog.createdAt || blog.date)}</span>
                    <span className="blog-author">By {blog.author || "Electrolyte Team"}</span>
                  </div>
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-tags">
                      {blog.metaKeywords && blog.metaKeywords.split(',').slice(0, 2).map((tag, index) => (
                        <span key={index} className="blog-tag hashtag">#{tag.trim()}</span>
                      ))}
                    </div>
                    <Link to={`/blog/${blog.slug}`} className="read-more-btn">
                      Read More <i className="ri-arrow-right-line"></i>
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

// Single Blog Post Component
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://electrolyte-website.onrender.com/api";
        const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`);
        if (res.status === 404) {
          setBlog(null);
        } else if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        } else {
          const data = await res.json();
          setBlog(data);
        }
        const listRes = await fetch(`${API_BASE}/blogs`);
        if (!listRes.ok) {
          throw new Error(`HTTP ${listRes.status}`);
        }
        const listData = await listRes.json();
        setAllBlogs(Array.isArray(listData) ? listData : []);
      } catch (e) {
        console.error("Failed to load blog:", e);
      }
      window.scrollTo(0, 0);
    };
    load();
  }, [slug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Blog post not found or unpublished</h2>
        <button onClick={() => navigate('/blog')} className="btn-back">
          Back to Blog
        </button>
      </div>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allBlogs
    .filter(b => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <div className="blog-post-page">
      <SeoHead
        title={blog.metaTitle}
        description={blog.metaDescription}
        keywords={blog.metaKeywords}
        ogTitle={blog.ogTitle || blog.title}
        ogDescription={blog.ogDescription || blog.excerpt}
        ogImage={(blog.ogImage) || (blog.featuredImage && blog.featuredImage.url)}
        canonical={typeof window !== "undefined" ? window.location.href : undefined}
      />
      <section className="blog-post-hero">
        <div className="blog-post-hero-bg" style={{ backgroundImage: `url('${(blog.featuredImage && blog.featuredImage.url) || blog.image || ''}')` }} />
        <div className="blog-post-hero-overlay" />
        <div className="blog-post-hero-content">
          <span className="blog-category-badge">{blog.category}</span>
          <h1 className="blog-post-title">{blog.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-author">
              <i className="ri-user-line"></i> {blog.author || "Electrolyte Team"}
            </span>
            <span className="blog-post-date">
              <i className="ri-calendar-line"></i> {formatDate(blog.createdAt || blog.date)}
            </span>
          </div>
        </div>
      </section>

      <section className="blog-post-content-section">
        <div className="blog-post-container">
          <button onClick={() => navigate('/blog')} className="btn-back-to-blog">
            <i className="ri-arrow-left-line"></i> Back to Blog
          </button>
          
          <article className="blog-post-article">
            {/* Featured Image */}
            {(blog.featuredImage && blog.featuredImage.url) && (
              <div className="blog-featured-image">
                <img src={blog.featuredImage.url} alt={blog.title} />
              </div>
            )}
            
            <div 
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            {blog.metaKeywords && (
              <div className="blog-post-tags">
                <span className="tags-label">Tags:</span>
                {blog.metaKeywords.split(',').map((tag, index) => (
                  <span key={index} className="blog-tag hashtag">#{tag.trim()}</span>
                ))}
              </div>
            )}
          </article>

          <div className="blog-post-share">
            <span className="share-label">Share this article:</span>
            <div className="share-buttons">
              <button 
                onClick={copyToClipboard}
                className="share-btn copy"
                title="Copy link"
              >
                <img src="/images/admin/copy_link_logo.png" alt="Copy link" />
              </button>
              
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' - ' + window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-btn whatsapp"
                title="Share on WhatsApp"
              >
                <img src="/images/admin/whatsapp_logo.png" alt="WhatsApp" />
              </a>
              
              <a 
                href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent('Check out this article: ' + window.location.href)}`}
                className="share-btn gmail"
                title="Share via Email"
              >
                <img src="/images/admin/gmail_logo.png" alt="Gmail" />
              </a>
              
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-btn linkedin"
                title="Share on LinkedIn"
              >
                <img src="/images/admin/linkdin_logo.png" alt="LinkedIn" />
              </a>
              
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-btn twitter"
                title="Share on Twitter/X"
              >
                <img src="/images/admin/twitter_logo.png" alt="Twitter" />
              </a>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="related-posts">
              <h3 className="related-posts-title">Related Articles</h3>
              <div className="related-posts-grid">
                {relatedPosts.map(post => (
                  <article 
                    key={post._id || post.id} 
                    className="related-post-card"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <div className="related-post-image">
                      <img src={(post.featuredImage && post.featuredImage.url) || post.image || ""} alt={post.title} loading="lazy" />
                    </div>
                    <div className="related-post-content">
                      <h4 className="related-post-title">{post.title}</h4>
                      <span className="related-post-date">{formatDate(post.createdAt || post.date)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Main Blog Component with routing
const Blog = () => {
  const { slug } = useParams();
  if (slug) {
    return <BlogPost />;
  }
  return <BlogList />;
};
export default Blog;
export { BlogList, BlogPost };
