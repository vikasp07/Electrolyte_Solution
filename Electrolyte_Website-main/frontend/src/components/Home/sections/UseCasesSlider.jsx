import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UseCasesSlider.css";

const UseCasesSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Blog posts data - keeping the same UI structure
  const blogPosts = useMemo(() => [
    {
      id: 1,
      title:
        "The Future of Cybersecurity: Data Diodes and Zero Trust Architecture",
      description:
        "Explore how data diodes are becoming essential components in modern zero trust security frameworks, providing unidirectional data transfer for critical infrastructure...",
      image:
        "/images/Home/Secure-File-Transfer-and-Syslog-Replication-Using-Owl-Data-Diodes.jpg",
      link: "/blog/1",
      tagline: "Cybersecurity",
    },
    {
      id: 2,
      title:
        "Securing Industrial Control Systems: Best Practices for OT Security",
      description:
        "Learn about the critical importance of securing operational technology environments and the best practices for protecting industrial control systems from cyber threats...",
      image:
        "/images/Home/OSI-PI-Historian-Replication-Using-OWL-Data-Diodes.jpg",
      link: "/blog/2",
      tagline: "Industrial Security",
    },
    {
      id: 3,
      title: "OPC UA Security: Protecting Industrial Communications",
      description:
        "Discover how to secure OPC UA communications in industrial environments using hardware-based security solutions and best practices...",
      image:
        "/images/Home/Secure-OPC-Data-Replication-Using-Owl-Data-Diodes.jpg",
      link: "/blog/3",
      tagline: "Industrial Protocols",
    },
    {
      id: 4,
      title:
        "Database Replication Security: Ensuring Data Integrity Across Networks",
      description:
        "Learn how to implement secure database replication across network boundaries while maintaining data integrity and protecting sensitive information...",
      image: "/images/Home/Database-Replication-Using-Data-Diodes.jpg",
      link: "/blog/4",
      tagline: "Data Security",
    },
    {
      id: 5,
      title:
        "CCTV Network Security: Protecting Surveillance Systems from Cyber Threats",
      description:
        "Explore the critical importance of securing CCTV networks and learn how to protect surveillance systems from cyber attacks while maintaining operational effectiveness...",
      image: "/images/Home/Securing-Critical-CCTV-Networks-and-Enterprise.jpg",
      link: "/blog/5",
      tagline: "Physical Security",
    },
  ], []);

  // Auto-play functionality
  useEffect(() => {
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

      <div className="section-bottom-coverage">
        <img
          src="/images/Home/bottom_black_02-1.png"
          alt="wave"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default UseCasesSlider;
