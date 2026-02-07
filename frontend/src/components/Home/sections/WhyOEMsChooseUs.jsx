import React from "react";
import "../styles/WhyOEMsChooseUs.css";

const WhyOEMsChooseUs = () => {
  const reasons = [
    {
      id: 1,
      title: "Advanced Diagnostics",
      description:
        "State-of-the-art testing equipment and methodologies for accurate fault identification.",
      icon: "ri-search-eye-line",
    },
    {
      id: 2,
      title: "Quality Assurance",
      description:
        "ISO 9001:2015 certified processes ensuring consistent, high-quality repairs.",
      icon: "ri-shield-check-line",
    },
    {
      id: 3,
      title: "Fast Turnaround",
      description:
        "Streamlined workflows designed to minimize downtime and expedite repairs.",
      icon: "ri-timer-flash-line",
    },
    {
      id: 4,
      title: "Data Transparency",
      description:
        "Detailed reporting and analytics for every repair batch processed.",
      icon: "ri-line-chart-line",
    },
    {
      id: 5,
      title: "Cost Optimization",
      description:
        "Competitive pricing models that significantly reduce total cost of ownership.",
      icon: "ri-money-dollar-circle-line",
    },
    {
      id: 6,
      title: "Scalable Capacity",
      description:
        "Infrastructure designed to handle high-volume repair requirements efficiently.",
      icon: "ri-stack-line",
    },
  ];

  return (
    <section id="why-oems-choose-us" className="wocu-section">
      <div className="wocu-container">
        {/* Section Header */}
        <div className="wocu-header">
          <h2 className="wocu-title">Why Leading OEMs Choose Us</h2>
          <p className="wocu-subtitle">
            Trusted by industry leaders for quality, reliability, and innovation
          </p>
        </div>

        {/* Reason Cards Grid */}
        <div className="wocu-grid">
          {reasons.map((reason) => (
            <div key={reason.id} className="wocu-card">
              <div className="wocu-card-inner">
                <div className="wocu-card-icon">
                  <i className={reason.icon}></i>
                </div>
                <h3 className="wocu-card-title">{reason.title}</h3>
                <p className="wocu-card-description">{reason.description}</p>
              </div>
              <div className="wocu-card-glow"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="wocu-stats">
          <div className="wocu-stat">
            <span className="wocu-stat-number">25+</span>
            <span className="wocu-stat-label">OEM Partners</span>
          </div>
          <div className="wocu-stat-divider"></div>
          <div className="wocu-stat">
            <span className="wocu-stat-number">50K+</span>
            <span className="wocu-stat-label">PCBs Repaired</span>
          </div>
          <div className="wocu-stat-divider"></div>
          <div className="wocu-stat">
            <span className="wocu-stat-number">98%</span>
            <span className="wocu-stat-label">Success Rate</span>
          </div>
          <div className="wocu-stat-divider"></div>
          <div className="wocu-stat">
            <span className="wocu-stat-number">ISO</span>
            <span className="wocu-stat-label">9001:2015</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyOEMsChooseUs;
