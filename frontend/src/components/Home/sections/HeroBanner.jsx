import React, { useState, useEffect, useMemo } from "react";
import "../styles/HeroBanner.css";

const HeroBanner = ({ scrollY }) => {
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Move rotatingWords to useMemo to fix exhaustive-deps warning
  const rotatingWords = useMemo(() => [
    "LED Video Walls",
    "Industrial Electronics",
    "Device Refurbishment",
  ], []);

  useEffect(() => {
    const currentWord = rotatingWords[rotatingWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBetweenWords = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
          setTimeout(() => {
            setRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length);
          }, delayBetweenWords);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting || displayText.length === 0 ? typingSpeed : displayText.length === currentWord.length ? delayBetweenWords : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, rotatingWordIndex, rotatingWords]);

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
            {/* Separator */}
            <div className="separator" />

            {/* Main Title */}
            <h1 className="hero-banner-title animate-in">
            </h1>

            {/* Rotating Words Section */}
            <div className="hero-banner-rotating-section">
              <h2 className="hero-banner-subtitle">
                <span>Specializing in</span>
                <div className="rotating-words-wrapper">
                  <span className="rotating-word active">{displayText}</span>
                  <span className="typing-cursor">|</span>
                </div>
              </h2>
            </div>

            {/* Separator */}
            <div className="separator" />

            {/* Subheadline */}
            <h3 className="hero-banner-description animate-in">
              ISO & ZED certified L3/L4 repair service for OEMs
            </h3>

            {/* Separator */}
            <div className="separator" />

            {/* CTA Button */}
            <a href="/services" className="btn-primary animate-in">
              <span className="btn-text">Request Technical Discussion</span>
              <i className="ri-arrow-right-line"></i>
            </a>

            {/* Separator */}
            <div className="separator" />
          </div>

          {/* Statistics/Counters Section */}
          <div className="hero-banner-stats">
            <StatCounter
              icon="+"
              label="PCB Refurbishment Capacity / Month"
              value="15,000+"
              dataIcon="remixiconsbusiness"
            />
            <StatCounter
              icon="%"
              label="Average Recovery Rate"
              value="85%"
              dataIcon="remixiconsuser"
            />
            <StatCounter
              icon="%"
              label="Cost saving Vs new PCB purchase"
              value="75%"
              dataIcon="remixiconsfinance"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Counter Component
const StatCounter = ({ icon, label, value, dataIcon }) => {
  return (
    <div className="stat-counter animate-in">
      <div className="stat-counter-icon">
        <i className={`ri-${dataIcon}`} style={{ fontSize: "2.5em" }}></i>
      </div>
      <div className="separator separator-small" />
      <div className="stat-counter-value">{value}</div>
      <div className="separator separator-small" />
      <h4 className="stat-counter-label">{label}</h4>
    </div>
  );
};

export default HeroBanner;
