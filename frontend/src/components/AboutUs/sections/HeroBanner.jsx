import React from "react";
import "../styles/HeroBanner.css";

const HeroBanner = ({ scrollY }) => {
  const parallaxOffset = scrollY * 0.6;

  return (
    <section
      className="about-hero-banner"
      style={{
        backgroundPosition: `center ${parallaxOffset}px`,
        backgroundImage: 'url("/images/AboutUs/about-banner.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-banner-overlay">
        <div className="hero-banner-content">
          <h1 className="hero-banner-title">
            About Electrolyte Solutions
          </h1>
          <p className="hero-banner-subtitle">
            Electronics Repair & Refurbishment Solutions
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
