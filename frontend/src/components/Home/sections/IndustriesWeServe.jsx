import React from "react";
import "../styles/IndustriesWeServe.css";

const INDUSTRIES = [
  {
    id: 1,
    title: "Consumer Electronics OEMs",
    icon: "ri-smartphone-line",
  },
  {
    id: 2,
    title: "Home Appliance Manufacturers",
    icon: "ri-home-gear-line",
  },
  {
    id: 3,
    title: "LED Display & Power Electronics",
    icon: "ri-lightbulb-line",
  },
  {
    id: 4,
    title: "IoT & Smart Device Brands",
    icon: "ri-wifi-line",
  },
  {
    id: 5,
    title: "Authorized Service Networks",
    icon: "ri-tools-line",
  },
  {
    id: 6,
    title: "Fan & Motor Control Systems",
    icon: "ri-tornado-line",
  },
  {
    id: 7,
    title: "Cooktop & Kitchen Appliances",
    icon: "ri-fire-line",
  },
  {
    id: 8,
    title: "Industrial Electronics",
    icon: "ri-building-2-line",
  },
];

const IndustriesWeServe = () => {
  return (
    <section id="industries-we-serve" className="iws-section">
      <div className="iws-container">
        {/* Section Header */}
        <div className="iws-header">
          <h2 className="iws-title">Industries We Serve</h2>
          <p className="iws-subtitle">
            Trusted by leading OEMs across diverse electronics sectors
          </p>
        </div>

        {/* Industries Grid */}
        <div className="iws-grid">
          {INDUSTRIES.map((industry) => (
            <div key={industry.id} className="iws-card">
              <div className="iws-card-icon">
                <i className={industry.icon}></i>
              </div>
              <h3 className="iws-card-title">{industry.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
