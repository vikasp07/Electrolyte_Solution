import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UseCasesSlider.css";

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

// Resolve image URL
const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${getImageOrigin()}${url}`;
};

const UseCasesSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch blogs from API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const API_BASE = getApiBase();
        const res = await fetch(`${API_BASE}/blogs`, {
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          // Filter published blogs, deduplicate, sort by date, take latest 5
          const seenSlugs = new Set();
          const filteredBlogs = [];

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

          // Transform to slider format - latest 5 blogs
          const sliderBlogs = filteredBlogs.slice(0, 5).map((blog) => ({
            id: blog._id || blog.id,
            title: blog.title,
            description: blog.excerpt,
            image: resolveImageUrl(blog.featuredImage?.url || blog.image),
            link: `/blog/${blog.slug}`,
            tagline: blog.category,
          }));

          setBlogPosts(sliderBlogs);
        }
      } catch (e) {
        console.error("Failed to load blogs:", e);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Fallback to empty array while loading or on error
  const displayPosts = useMemo(() => {
    if (loading || blogPosts.length === 0) {
      return [
        {
          id: 1,
          title: "Loading blogs...",
          description: "Please wait while we load the latest articles.",
          image: "",
          link: "/blog",
          tagline: "",
        },
      ];
    }
    return blogPosts;
  }, [blogPosts, loading]);

  // Auto-play functionality - only if we have posts
  useEffect(() => {
    if (displayPosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayPosts.length);
    }, 6000); // autoplay stays 6 seconds

    return () => clearInterval(interval);
  }, [displayPosts.length]);

  const handleBlogClick = (link) => {
    navigate(link);
  };

  return (
    <section id="blog-section" className="bt_bb_section usecases-section">
      <div
        className="usecases-bg-image"
        style={{
          backgroundImage: "url('/images/Home/Industry-based-Use-Cases.jpg')",
        }}
      />

      <div className="usecases-content">
        <div className="usecases-header">
          <h3 className="usecases-title">Latest from Our Blog</h3>
          <Link to="/blog" className="view-all-blogs-btn">
            View All Blogs <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="usecases-slider-wrapper">
          {/* Left Arrow Navigation */}
          <button
            className="usecase-nav-btn usecase-nav-prev"
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + displayPosts.length) % displayPosts.length
              )
            }
            aria-label="Previous slide"
          >
            <img src="/images/Home/left_array.png" alt="Previous" />
          </button>

          {/* Right Arrow Navigation */}
          <button
            className="usecase-nav-btn usecase-nav-next"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % displayPosts.length)
            }
            aria-label="Next slide"
          >
            <img src="/images/Home/right_array.png" alt="Next" />
          </button>

          <div className="usecases-slider" ref={sliderRef}>
            {displayPosts.map((post, index) => (
              <div
                key={post.id}
                className={`usecase-slide ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{
                  opacity: index === currentSlide ? 1 : 0,
                  transform:
                    index === currentSlide
                      ? "translateX(0)"
                      : "translateX(100%)",
                  transition: "all 2s ease-in-out",
                  position: index === currentSlide ? "relative" : "absolute",
                }}
              >
                <div className="usecase-slide-content">
                  <div
                    className="usecase-image"
                    onClick={() => handleBlogClick(post.link)}
                  >
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="usecase-info animate-bottom">
                    {post.tagline && (
                      <p className="usecase-tagline">{post.tagline}</p>
                    )}
                    <h2 className="usecase-title">{post.title}</h2>
                    <p className="usecase-description">{post.description}</p>
                    <Link to={post.link} className="btn-usecase">
                      Read More <i className="ri-arrow-right-long-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bottom-arrow">
            <a
              href="#our-services-section"
              className="arrow-link"
              aria-label="Scroll to services"
            >
              <img
                src="/images/Home/bottom_array.png"
                alt="Scroll down"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSlider;
