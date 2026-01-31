import React, { useState, useEffect } from "react";
import HeroBanner from "./sections/HeroBanner";
import MissionVisionValues from "../Home/sections/MissionVisionValues";
import AboutOverview from "./AboutOverview";
import "./AboutUs.css";

const COMPANY = {
  name: "Electrolyte Solutions",
  tagline: "Innovation in Electrochemistry",
  description:
    "Electrolyte Solutions is a leading provider of advanced electrochemical products and solutions. With years of expertise, we deliver cutting-edge technology to industries worldwide.",
  phonePrimary: "+919892686600",
  phoneSecondary: "+919029352208",
  email: "contact@electrolytesolin.com",
  whatsapp: "+919029352208",
  website: "https://www.electrolytesolin.com",
  addressLines: [
    "Unit No. 11, 3rd Floor, B-Wing",
    "Gami Industrial Park, ITC",
    "Industrial Area Pawane, MIDC",
    "Navi Mumbai - 400 710",
  ],
  mission:
    "To empower organizations with innovative electrochemical solutions that drive sustainable growth, enhance efficiency, and ensure operational excellence across industries.",
  vision:
    "To be the global leader in electrochemical technology, transforming industries through advanced innovation, reliability, and customer-focused solutions.",
  values: [
    {
      title: "Innovation",
      description: "Continuous technological advancement and research",
    },
    {
      title: "Quality",
      description: "Excellence in every product and service delivery",
    },
    {
      title: "Sustainability",
      description: "Environmentally responsible business practices",
    },
    {
      title: "Integrity",
      description: "Trust, transparency, and accountability",
    },
  ],
  whyPoints: [
    {
      title: "Technical Excellence",
      description:
        "Decades of expertise with certified engineering team and state-of-the-art laboratories for rigorous testing and validation.",
    },
    {
      title: "Tailored Solutions",
      description:
        "We work closely with clients to understand unique needs and design customized electrochemical solutions.",
    },
    {
      title: "Global Reach, Local Support",
      description:
        "Worldwide presence with local teams ensuring dedicated support and seamless implementation.",
    },
  ],
  process: [
    {
      num: "1",
      title: "Discovery",
      description:
        "Understand requirements and gain deep insights into your business, operational goals, and existing infrastructure.",
    },
    {
      num: "2",
      title: "Analysis",
      description:
        "Analyze gathered data to identify gaps, challenges, and opportunities in your current systems.",
    },
    {
      num: "3",
      title: "Design",
      description:
        "Create customized solution design aligned with your business goals and technological requirements.",
    },
    {
      num: "4",
      title: "Testing",
      description:
        "Rigorous testing in controlled environments to ensure solutions meet required standards and performance.",
    },
    {
      num: "5",
      title: "Deployment",
      description:
        "Implement and integrate solutions into your live environment with minimal disruption.",
    },
    {
      num: "6",
      title: "Support",
      description:
        "Ongoing support ensuring your system remains operational, secure, and optimized.",
    },
  ],
};

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied: " + text);
    } catch (err) {
      alert("Copy failed.");
    }
  };

  const chatHref = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="about-us-container">
      <HeroBanner scrollY={scrollY} />

      {/* About Overview Section */}
      <AboutOverview />

      {/* Mission, Vision, Values Section */}
      <MissionVisionValues />

      {/* Values Section */}
      <section
        className="values-section"
        style={{
          backgroundImage: 'url("/images/AboutUs/core-values.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="section-overlay">
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {COMPANY.values.map((value, idx) => (
                <div key={idx} className="value-item">
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section
        className="why-section"
        style={{
          backgroundImage: 'url("/images/AboutUs/why-us.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="section-overlay">
          <div className="container">
            <h2 className="section-title">Why Choose Electrolyte Solutions?</h2>
            <div className="why-grid">
              {COMPANY.whyPoints.map((point, idx) => (
                <div key={idx} className="why-card">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className="process-section"
        style={{
          backgroundImage: 'url("/images/AboutUs/process.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="section-overlay">
          <div className="container">
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">From Discovery to Support</p>
            <div className="process-grid">
              {COMPANY.process.map((step, idx) => (
                <div key={idx} className="process-step">
                  <div className="step-number">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-tabs">
            {["Contact", "Location", "Social"].map((tab, idx) => (
              <button
                key={idx}
                className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="contact-content">
            {activeTab === 0 && (
              <div className="tab-pane">
                <div className="contact-grid">
                  <div className="contact-box">
                    <h4>Phone</h4>
                    <a href={`tel:${COMPANY.phonePrimary}`}>
                      {COMPANY.phonePrimary}
                    </a>
                    <button
                      className="small-btn"
                      onClick={() => copyToClipboard(COMPANY.phonePrimary)}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="contact-box">
                    <h4>Email</h4>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                    <button
                      className="small-btn"
                      onClick={() => copyToClipboard(COMPANY.email)}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="contact-box">
                    <h4>WhatsApp</h4>
                    <a
                      href={chatHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {COMPANY.whatsapp}
                    </a>
                    <button
                      className="small-btn"
                      onClick={() => window.open(chatHref, "_blank")}
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="tab-pane">
                <div className="location-content">
                  <div className="address-box">
                    <h4>Address</h4>
                    {COMPANY.addressLines.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <div className="map-box">
                    <iframe
                      title="Company Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0841638599!2d73.0218!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9c3c3c3c3c3%3A0x3c3c3c3c3c3c3c3c!2sNavi%20Mumbai!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="300"
                      style={{ border: "none", borderRadius: "8px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="tab-pane">
                <div className="social-grid">
                  <a
                    href={chatHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                  >
                    <i className="ri-whatsapp-line"></i>
                    <span>WhatsApp</span>
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="social-card">
                    <i className="ri-mail-line"></i>
                    <span>Email</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/electrolyte-solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                  >
                    <i className="ri-linkedin-fill"></i>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
