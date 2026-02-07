import React from 'react';
import '../styles/CoreValues.css';

const CoreValues = () => {
  const values = [
    {
      icon: 'ri-search-2-line',
      title: 'Comprehensive Gap Analysis',
      description: 'We offer comprehensive GAP analysis services to identify and address security and compliance gaps in critical infrastructure, defense, and enterprise environments. Our expertise helps organizations align with industry standards, regulatory requirements, and best practices, reducing risk and enhancing resilience. We empower organizations to confidently tackle cybersecurity challenges and build a secure future.'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Industry-Driven Innovation',
      description: 'Oregon Systems delivers AI-driven cybersecurity and advanced computing solutions for critical industries. We enable predictive threat detection, real-time analytics, and scalable computing to optimize efficiency and resilience. From securing infrastructure to supporting AI-powered data centers, we empower clients across the Middle East and beyond.'
    },
    {
      icon: 'ri-handshake-line',
      title: 'Trusted Partnerships',
      description: 'Oregon Systems partners with leading cybersecurity, HPC, and storage technology vendors to deliver tailored, best-in-class solutions for critical industries and national infrastructure. These collaborations provide robust security frameworks, scalable HPC platforms, and advanced storage solutions, empowering clients to thrive in an evolving digital landscape.'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Local Expertise, Global Reach',
      description: 'With a strong regional presence with 8 offices in GCC Countries and operations spanning 11 countries, Oregon Systems provides unparalleled support, ensuring that every deployment is seamless and successful. Leveraging global partnerships with leading technology vendors, we bring world-class innovations and best practices to our clients.'
    }
  ];

  return (
    <section className="core-values">
      <div className="container">
        <h2 className="section-title">Why Oregon Systems?</h2>
        <p className="section-subtitle-strong">
          Your Distributor in Critical Infrastructure Security & High Performance Computing, Storage Systems with Built in AI Capabilities for Large Data Centers
        </p>

        <p className="core-description">
          At Oregon Systems, we specialize in delivering end-to-end solutions that fortify critical infrastructure and enable the establishment of nation-level data centers. Our expertise spans advanced cybersecurity frameworks, high-performance computing, and scalable storage solutions, designed to meet the demands of modern infrastructure and emerging technologies like Artificial Intelligence.
        </p>

        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-item">
              <div className="value-item-icon">
                <i className={value.icon}></i>
              </div>
              <h3 className="value-item-title">{value.title}</h3>
              <p className="value-item-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
