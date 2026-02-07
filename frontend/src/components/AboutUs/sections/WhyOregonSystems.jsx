import React from 'react';
import '../styles/WhyOregonSystems.css';

const WhyOregonSystems = () => {
  const highlights = [
    {
      image: '/images/Expertise-You-Can-Trust.jpg',
      title: 'Expertise You Can Trust',
      description: 'With decades of experience, a certified engineering team, and advanced testing labs, we lead the charge in protecting industries that matter.'
    },
    {
      image: '/images/A-Tailored-Approach.jpg',
      title: 'A Tailored Approach',
      description: 'We work closely with customers to analyze vulnerabilities, identify gaps, and design customized solutions that align with their operational needs.'
    },
    {
      image: '/images/Global-Technology-Local-Support.jpg',
      title: 'Global Technology, Local Support',
      description: 'As distributors for leading global vendors, we provide access to the latest solutions, and our local presence ensures you receive dedicated support whenever needed.'
    }
  ];

  return (
    <section className="why-oregon-systems">
      <div className="container">
        <h2 className="section-title">Setting the Standard in Cybersecurity Distribution</h2>
        <p className="section-subtitle">
          Oregon Systems bridges the gap between global technology innovators and regional industries, bringing world-class cybersecurity solutions to critical infrastructure across the Middle East, North Africa, and beyond.
        </p>

        <div className="highlights-grid">
          {highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-image" style={{ backgroundImage: `url(${highlight.image})` }}>
                <div className="highlight-overlay">
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-description">{highlight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOregonSystems;
