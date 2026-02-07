import { useState } from "react";
import "./QualitySystems.css";

export default function QualitySystems() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const qualitySystems = [
    {
      id: 1,
      title: "ISO 9001:2015 Certified",
      description: "Fully documented quality management system ensuring consistency and compliance across all repair operations.",
      icon: "🏆",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "ESD-Safe Environment",
      description: "2400+ sq. ft. ESD-compliant facility with controlled workstations, grounding, and static protection protocols.",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "Multi-Stage QC",
      description: "Incoming, in-process, and outgoing quality checks with documented validation at every stage.",
      icon: "✓",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Batch-Wise Reporting",
      description: "Complete repair history tracking, component consumption analytics, and traceability documentation for every batch.",
      icon: "📊",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  return (
    <section className="quality-section-luxury">
      <div className="quality-container-luxury">
        <div className="quality-header-luxury">
          <h2 className="quality-title-luxury">
            <span className="title-gradient-quality">Quality Systems & Infrastructure</span>
          </h2>
          <p className="quality-subtitle-luxury">
            World-class facilities and processes for consistent, reliable results
          </p>
        </div>

        <div className="quality-grid-luxury">
          {qualitySystems.map((system, index) => (
            <div
              key={system.id}
              className="quality-card-luxury"
              style={{ "--delay": `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredCard(system.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="quality-card-inner-luxury">
                <div className="quality-glow-luxury" style={{ background: system.gradient }} />
                
                <div className="quality-icon-wrapper-luxury">
                  <span className="quality-icon-luxury">{system.icon}</span>
                </div>
                
                <h3 className="quality-card-title-luxury">{system.title}</h3>
                
                <div className="quality-divider-luxury" />
                
                <p className="quality-card-description-luxury">{system.description}</p>

                {hoveredCard === system.id && (
                  <div className="quality-particles-luxury">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="quality-particle-luxury" style={{ "--i": i }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}