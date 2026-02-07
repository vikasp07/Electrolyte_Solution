import React from "react";
import "../styles/MissionVisionValues.css";

const MissionVisionValues = () => {
  const cards = [
    {
      id: "mission",
      title: "Mission",
      image: "/images/AboutUs/mission-white-160x160.png",
      description:
        "Our expert technicians restore broken electronics to working condition through component-level repairs. Serving businesses across India with rapid turnaround times.",
    },
    {
      id: "vision",
      title: "Vision",
      image: "/images/AboutUs/vission-white-160x160.png",
      description:
        "To become India's leading electronics repair and refurbishment specialist, known for quality workmanship and customer service excellence.",
    },
    {
      id: "values",
      title: "Values",
      image: "/images/AboutUs/value-white-160x160.png",
      description:
        "Integrity in repairs, reliability in service, and commitment to extending the life of quality devices that matter to our customers.",
    },
  ];

  return (
    <section id="mvv-section" className="bt_bb_section mvv-section">
      {/* Background Image */}
      <div
        className="mvv-bg-image"
        style={{
          backgroundImage: "url('/images/AboutUs/mission-vision.jpg')",
        }}
      />

      <div className="mvv-content">
        {/* Section Header */}
        <div className="mvv-header">
          <h2 className="mvv-title">
            Electronics Repair & Refurbishment Solutions
          </h2>
        </div>

        {/* Description Text */}
        <div className="mvv-description">
          <p>
            We provide specialized repair and refurbishment services for
            high-value electronics including LED displays, OEM devices, and
            industrial equipment. Extending product lifecycles while reducing
            costs.
          </p>
          <a href="/Services" className="btn-secondary">
            <span className="btn-text">READ MORE</span>
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>

        {/* Cards Container */}
        <div className="mvv-cards-container">
          {cards.map((card) => (
            <MVVCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Bottom Coverage Image */}
    </section>
  );
};

// Individual MVV Card Component
const MVVCard = ({ card }) => {
  return (
    <div className="mvv-card animate-in">
      <a
        href="/AboutUs"
        className="mvv-card-link"
        aria-label={`Learn more about ${card.title}`}
      />
      <div className="mvv-card-image">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          width="160"
          height="160"
        />
      </div>
      <div className="mvv-card-content">
        <h5 className="mvv-card-title">{card.title}</h5>
        <div className="separator separator-small" />
        <div className="mvv-card-description">
          <span>{card.description}</span>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionValues;
