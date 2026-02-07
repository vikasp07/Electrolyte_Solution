import React from 'react';
import '../styles/CompanyOverview.css';

const CompanyOverview = () => {
  return (
    <section className="company-overview">
      <div className="container">
        <div className="overview-grid">
          <div className="overview-content">
            <p className="overview-text">
              At Oregon Systems, our mission is clear: to protect critical assets powering industries, safeguarding nations, and securing communities. From our beginnings as a cybersecurity provider, we've become a trusted partner for organizations across the Middle East, North Africa, and beyond.
            </p>
            <p className="overview-text">
              We specialize in protecting critical infrastructure, offering tailored solutions for industrial systems, defense, and public services. Our expertise goes beyond technology, focusing on the people we serve and the security they need to thrive.
            </p>
            <p className="overview-text">
              As cyber threats evolve, so do we. By partnering with leading technology vendors, we deliver advanced solutions like insider risk management, web isolation, and high-performance computing. Oregon Systems ensures our clients are not only compliant but also resilient against sophisticated attacks.
            </p>
            <p className="overview-text">
              What sets us apart is our unwavering commitment to client success. We design customized strategies to meet unique industry needs, providing end-to-end protection that inspires trust.
            </p>
            <p className="overview-text">
              Our journey is one of dedication, trust, and innovation. As we look to the future, we remain steadfast in securing today's critical infrastructure for generations to come. At Oregon Systems, your security is our priority.
            </p>
          </div>

          <div className="overview-sidebar">
            <div className="value-card">
              <div className="value-icon">
                <i className="ri-lightbulb-flash-line"></i>
              </div>
              <h3 className="value-title">Mission Statement</h3>
              <p className="value-description">
                Our mission is to empower organizations with innovative cybersecurity solutions that safeguard critical infrastructure and ensure resilience against evolving threats, while fostering trust, compliance, and operational excellence in every sector we serve.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="ri-eye-line"></i>
              </div>
              <h3 className="value-title">Vision Statement</h3>
              <p className="value-description">
                To worldwide to protect their most vital assets and drive secure digital transformation, ensuring a safer and more resilient future for critical infrastructure.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="ri-shield-check-line"></i>
              </div>
              <h3 className="value-title">Values Statement</h3>
              <p className="value-description">
                "We are committed to integrity, passion, innovation, and excellence. We prioritize the security of critical infrastructure, uphold the highest standards of trust and accountability, and foster a culture of continuous improvement. Our values drive us to deliver tailored cybersecurity and high-performance computing solutions built with artificial intelligence to meet the evolving needs of our clients."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
