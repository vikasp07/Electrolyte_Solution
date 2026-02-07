import React from "react";

const AboutOverview = () => {
  return (
    <section className="about-overview-section">
      <div className="container">

        <h2 className="section-title">About Electrolyte Solutions</h2>

        <div className="about-description">
          <p>
            Electrolyte Solutions is a Mumbai-based ISO 9001:2015 certified electronics repair and refurbishment company specializing in advanced L3/L4 PCB-level repair. We support OEMs and service partners by extending product life, reducing RMA costs, and improving after-sales reliability.
          </p>

          <p>
            Our team combines deep technical expertise in embedded systems, power electronics, and component-level repair with a structured quality management approach. We understand that every failed board represents a cost to your business and a potential dissatisfaction for your customer.
          </p>

          <p>
            By partnering with Electrolyte Solutions, you gain access to diagnostic capabilities and repair expertise that go beyond conventional service center operations. We provide the technical depth needed to handle complex failures while maintaining the process discipline required for high-volume operations.
          </p>
        </div>

        <h3 className="capabilities-title">Our Capabilities</h3>

        <div className="capabilities-grid">
          <div className="capability-card">
            <h4>ISO 9001:2015 Certified</h4>
            <p>
              Structured quality management system with documented processes,
              traceability, and continuous improvement.
            </p>
          </div>

          <div className="capability-card">
            <h4>Component-Level Repair</h4>
            <p>
              BGA, QFN, fine-pitch IC replacement, and micro-soldering capabilities
            </p>
          </div>

          <div className="capability-card">
            <h4>Embedded Systems</h4>
            <p>
              Firmware flashing, validation, and functional testing for microcontroller-based products
            </p>
          </div>

          <div className="capability-card">
            <h4>Quality & Traceability</h4>
            <p>
              Complete documentation, repair history tracking, and batch-level reporting
            </p>
          </div>

          <div className="capability-card">
            <h4>ZED Bronze Certified (MSME Sustainable ZED Scheme)</h4>
            <p>
              Certified under the Ministry of Micro, Small & Medium Enterprises (Government of India) Sustainable ZED Certification Scheme, recognizing compliance with Zero Defect–Zero Effect principles, sustainable manufacturing practices, and quality-focused operations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutOverview;