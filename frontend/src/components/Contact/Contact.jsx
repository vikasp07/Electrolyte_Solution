import React from "react";
import "./Contact.css";
import PcbRepairForm from "./PcbRepairForm";

const Contact = () => {
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

            {/* Map Section */}
            <section
              id="contact-map-section"
              className="bt_bb_section contact-map-section"
            >
              <div className="map-container">
                <iframe
                  title="Electrolyte Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8897267851777!2d73.14269!3d19.04867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e8f8d8d8d8d9%3A0x8d8d8d8d8d8d8d8d!2sGami%20Industrial%20Park%2C%20Pawane%2C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Contact;