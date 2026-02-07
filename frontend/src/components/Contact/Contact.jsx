import React, { useState } from "react";
import "./Contact.css";
import PcbRepairForm from "./PcbRepairForm";

const Contact = () => {
  const [activeTab, setActiveTab] = useState(0);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied: " + text);
    } catch (err) {
      alert("Copy failed.");
    }
  };

  const chatHref = `https://wa.me/919029352208`;

  return (
    <main id="contact-main" className="site-main">
      <article className="contact-page-content">
        <div className="entry-content">
          <div className="entry-content-inner">
            {/* Hero Banner Section */}
            <section
              id="contact_banner_section"
              className="bt_bb_section contact-hero-banner"
            >
              <div className="contact-hero-bg" />

              <div className="contact-hero-content">
                <div className="contact-hero-container">
                  <div className="contact-hero-main">
                    {/* Separator */}
                    <div className="separator" />

                    {/* Main Title */}
                    <h1 className="contact-hero-title animate-in">
                      Get In Touch
                    </h1>

                    {/* Subtitle */}
                    <h3 className="contact-hero-description animate-in">
                      We're here to help and answer any question you might have.
                      Reach out to us today!
                    </h3>

                    {/* Separator */}
                    <div className="separator" />
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information & Form Section */}
            <section
              id="contact-content-section"
              className="bt_bb_section contact-content-section"
            >
              <div className="container">
                {/* PCB Repair Form */}
                <PcbRepairForm />
              </div>
            </section>

            {/* Contact Info Section - Moved from About Us */}
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
                          <a href="tel:+919892686600">+919892686600</a>
                          <button
                            className="small-btn"
                            onClick={() => copyToClipboard("+919892686600")}
                          >
                            Copy
                          </button>
                        </div>
                        <div className="contact-box">
                          <h4>Email</h4>
                          <a href="mailto:contact@electrolytesolin.com">contact@electrolytesolin.com</a>
                          <button
                            className="small-btn"
                            onClick={() => copyToClipboard("contact@electrolytesolin.com")}
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
                            +919029352208
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
                          <p>Unit No. 11, 3rd Floor, B-Wing</p>
                          <p>Gami Industrial Park, ITC</p>
                          <p>Industrial Area Pawane, MIDC</p>
                          <p>Navi Mumbai - 400 710</p>
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
                        <a href="mailto:contact@electrolytesolin.com" className="social-card">
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
        </div>
      </article>
    </main>
  );
};

export default Contact;
