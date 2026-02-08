import React, { useState, useEffect, useMemo } from "react";
import "../styles/HeroBanner.css";

const HeroBanner = ({ scrollY }) => {
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);

  // Three rotating words with 4.08 seconds display time each
  const rotatingWords = useMemo(() => [
    "LED Video Walls",
    "Consumer Electronics",
    "Device Refurbishment",
  ], []);

  useEffect(() => {
    const displayDuration = 4000; // 4.08 seconds display time

    const timer = setInterval(() => {
      setRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, displayDuration);

    return () => clearInterval(timer);
  }, [rotatingWords]);

  const handleParallax = () => {
    return {
      transform: `translateY(0)`,
    };
  };

  return (
    <section
      id="home_banner_section_text"
      className="bt_bb_section hero-banner"
      style={handleParallax()}
    >
      {/* Background Video */}
      <video 
        className="hero-banner-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/vedio/video-banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Background Overlay */}
      <div className="hero-banner-bg" />

      <div className="hero-banner-content">
        <div className="hero-banner-container">
          <div className="hero-banner-main">
            {/* Main Headline */}
            <h1 className="hero-banner-title animate-in">
              ISO & ZED Certified L3/L4 Repair Service for OEMs
            </h1>

            {/* Rotating Words Section */}
            <div className="hero-banner-rotating-section">
              <h2 className="hero-banner-subtitle">
                <span className="subtitle-label">Specializing in</span>
                <span key={rotatingWordIndex} className="rotating-word fade-in">
                  {rotatingWords[rotatingWordIndex]}
                </span>
              </h2>
            </div>

            {/* CTA Button */}
            <a href="/contact" className="btn-primary animate-in">
              <span className="btn-text">REQUEST TECHNICAL DISCUSSION</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>

          {/* Statistics/Counters Section */}
          <div className="hero-banner-stats">
            <StatCounter
              label="PCB REFURBISHMENT CAPACITY / MONTH"
              value="15,000+"
            />
            <StatCounter
              label="AVERAGE RECOVERY RATE"
              value="85%"
            />
            <StatCounter
              label="COST SAVING VS NEW PCB PURCHASE"
              value="75%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Counter Component
const StatCounter = ({ label, value }) => {
  return (
    <div className="stat-counter animate-in">
      <div className="stat-counter-value">{value}</div>
      <div className="stat-counter-divider"></div>
      <h4 className="stat-counter-label">{label}</h4>
    </div>
  );
};

export default HeroBanner;
