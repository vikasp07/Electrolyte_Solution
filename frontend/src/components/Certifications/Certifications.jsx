import React from "react";
import "./Certifications.css";

const Certifications = () => {
  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015",
      subtitle: "Quality Management Systems",
      image: "/images/Certifications/iso-9001-2015.jpg"
    },
    {
      id: 2,
      title: "ZED Bronze",
      subtitle: "Zero Defect–Zero Effect Certified",
      image: "/images/Certifications/Bronze_page-0001.jpg"
    }
  ];

  return (
    <div className="certifications-container">
      {/* Hero Section */}
      <section className="certifications-hero">
        <div className="hero-content">
          <h1>Certifications</h1>
          <p>Our commitment to quality and compliance</p>
        </div>
      </section>

      {/* Certifications Content */}
      <section className="certifications-content">
        <div className="container">
          <h2>Quality Certifications</h2>
          <p>
            At Electrolyte Solutions, we are committed to maintaining the highest standards of quality and safety.
            Our certifications demonstrate our dedication to excellence in electrochemical solutions.
          </p>

          <div className="certificates-gallery">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="certificate-card"
              >
                <div className="certificate-image-wrapper">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="certificate-image"
                  />
                  <div className="certificate-overlay">
                  </div>
                </div>
                <div className="certificate-info">
                  <h3>{cert.title}</h3>
                  <p>{cert.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;