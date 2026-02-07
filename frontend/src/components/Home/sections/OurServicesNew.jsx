import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OurServicesNew.css";

const OurServicesNew = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "L3/L4 PCB Repair & Component-Level Rework",
      description:
        "Advanced diagnostics and surgical repairs for complex PCBs — BGA rework, microsoldering, and component-level fixes that restore full functionality.",
      icon: "ri-cpu-line",
      highlights: ["BGA Rework", "Microsoldering", "Component Tracing"],
    },
    {
      id: 2,
      title: "Refurbishment & Cosmetic Restoration",
      description:
        "From enclosure cleaning to label replacement and visual upgrades — we ensure your returned units look and perform like new again.",
      icon: "ri-refresh-line",
      highlights: ["Deep Cleaning", "Label Replacement", "Visual Restoration"],
    },
    {
      id: 3,
      title: "Embedded Diagnostics & Firmware Support",
      description:
        "Firmware verification, boot sequence testing, and embedded system checks — comprehensive validation for microcontroller-based products.",
      icon: "ri-code-s-slash-line",
      highlights: ["Firmware Testing", "Boot Validation", "MCU Diagnostics"],
    },
  ];

  const handleExploreServices = () => {
    navigate("/services");
  };

  return (
    <section id="our-services-new" className="osn-section">
      <div className="osn-container">
        {/* Section Header */}
        <div className="osn-header">
          <h2 className="osn-title">Our Core Services</h2>
          <p className="osn-subtitle">
            Expert-level repair, refurbishment, and diagnostics for electronics
            OEMs
          </p>
        </div>

        {/* Service Cards */}
        <div className="osn-cards">
          {services.map((service) => (
            <div key={service.id} className="osn-card">
              <div className="osn-card-icon-wrapper">
                <div className="osn-card-icon">
                  <i className={service.icon}></i>
                </div>
              </div>
              <div className="osn-card-content">
                <h3 className="osn-card-title">{service.title}</h3>
                <p className="osn-card-description">{service.description}</p>
                <div className="osn-card-highlights">
                  {service.highlights.map((highlight, index) => (
                    <span key={index} className="osn-highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="osn-cta">
          <button className="osn-cta-button" onClick={handleExploreServices}>
            <span>Explore All Services</span>
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurServicesNew;
