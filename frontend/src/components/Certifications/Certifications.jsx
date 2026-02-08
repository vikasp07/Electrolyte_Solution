import React, { useState, useEffect } from "react";
import "./Certifications.css";

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/certificates?active=true`);
      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      // Fallback to default certificates if API fails
      setCertificates([
        {
          _id: 1,
          name: "ISO 9001:2015",
          description: "Quality Management Systems",
          image: { url: "/images/Certifications/iso-9001-2015.jpg" }
        },
        {
          _id: 2,
          name: "ZED Bronze",
          description: "Zero Defect–Zero Effect Certified",
          image: { url: "/images/Certifications/Bronze_page-0001.jpg" }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="certifications-container">
        <section className="certifications-hero">
          <div className="hero-content">
            <h1>Certifications</h1>
            <p>Loading...</p>
          </div>
        </section>
      </div>
    );
  }

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
                key={cert._id}
                className="certificate-card"
              >
                <div className="certificate-image-wrapper">
                  <img 
                    src={cert.image?.url || cert.image} 
                    alt={cert.name} 
                    className="certificate-image"
                  />
                  <div className="certificate-overlay">
                  </div>
                </div>
                <div className="certificate-info">
                  <h3>{cert.name}</h3>
                  {cert.description && <p>{cert.description}</p>}
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