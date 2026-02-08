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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chatHref = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="about-us-container">
      <HeroBanner scrollY={scrollY} />

      {/* About Overview Section */}
      <AboutOverview />

      {/* Mission, Vision, Values Section */}
      <MissionVisionValues />

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

      {/* Get In Touch Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="social-icons-container">
            <a
              href="https://www.instagram.com/electrolyte07/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/electrolyte-solutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="WhatsApp"
            >
              <i className="ri-whatsapp-line"></i>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
