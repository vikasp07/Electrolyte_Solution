import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UseCasesSlider.css";

const UseCasesSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch real blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://electrolyte-website.onrender.com/api";
        const res = await fetch(`${API_BASE}/blogs`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        
        const data = await res.json();
        const blogs = Array.isArray(data) ? data : [];
        
        // Take only the latest 5 blogs
        const latestBlogs = blogs.slice(0, 5).map(blog => ({
          id: blog._id || blog.id,
          title: blog.title,
          description: blog.excerpt,
          image: (blog.featuredImage && blog.featuredImage.url) || blog.image || "/images/Home/Industry-based-Use-Cases.jpg",
          link: `/blog/${blog.slug}`,
          tagline: blog.category || "Blog",
        }));
        
        setBlogPosts(latestBlogs);
      } catch (e) {
        console.error("Failed to load blogs:", e);
        // Set empty array if fetch fails
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (blogPosts.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 6000); // autoplay stays 6 seconds

    return () => clearInterval(interval);
  }, [blogPosts.length]);

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

        {loading ? (
          <div className="usecases-loading">
            <p>Loading blogs...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="usecases-no-blogs">
            <p>No blogs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="usecases-slider-wrapper">
            {/* Left Arrow Navigation */}
            <button
              className="usecase-nav-btn usecase-nav-prev"
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + blogPosts.length) % blogPosts.length
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
                setCurrentSlide((prev) => (prev + 1) % blogPosts.length)
              }
              aria-label="Next slide"
            >
              <img src="/images/Home/right_array.png" alt="Next" />
            </button>

            <div className="usecases-slider" ref={sliderRef}>
              {blogPosts.map((post, index) => (
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
                    transition: "all 2s ease-in-out", // UPDATED TO 2 SECONDS
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
                href="#explore-services-section"
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
        )}
      </div>
    </section>
  );
};

export default UseCasesSlider;
