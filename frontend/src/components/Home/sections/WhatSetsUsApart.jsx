import React from "react";
import "../styles/WhatSetsUsApart.css";

const WhatSetsUsApart = () => {
  const features = [
    {
      id: 1,
      title: "Data-Driven Repair Dashboard & Component Analytics",
      description:
        "With every repair batch, we provide detailed dashboards and component consumption reports. Our system enables long-term failure trend analysis, identifies recurring weak components, tracks consumption patterns, and delivers actionable engineering insights that improve product design and reliability.",
      bullets: [
        "Reduced repeat failures",
        "Lower RMA costs",
        "Improved product reliability",
        "Actionable engineering insights",
      ],
      icon: "ri-bar-chart-box-line",
    },
    {
      id: 2,
      title: "QR-Based End-to-End PCB Traceability",
      description:
        "Every repaired PCB receives a unique QR code linked to its complete digital repair history, including diagnostics, replaced components, repair date, batch reference, and outcome. This ensures transparency, audit readiness, and full lifecycle visibility for every board we process.",
      bullets: [
        "Complete traceability",
        "Audit-ready documentation",
        "Lifecycle visibility",
        "Stronger quality governance",
      ],
      icon: "ri-qr-code-line",
    },
  ];

  return (
    <section id="what-sets-us-apart" className="wsua-section">
      <div className="wsua-container">
        {/* Section Header */}
        <div className="wsua-header">
          <h2 className="wsua-title">What Sets Us Apart</h2>
          <p className="wsua-subtitle">
            Unique capabilities that drive measurable OEM outcomes
          </p>
        </div>

        {/* Feature Cards */}
        <div className="wsua-cards">
          {features.map((feature) => (
            <div key={feature.id} className="wsua-card">
              <div className="wsua-card-icon">
                <i className={feature.icon}></i>
              </div>
              <h3 className="wsua-card-title">{feature.title}</h3>
              <p className="wsua-card-description">{feature.description}</p>
              <ul className="wsua-card-bullets">
                {feature.bullets.map((bullet, index) => (
                  <li key={index}>
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
