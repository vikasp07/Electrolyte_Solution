import { useState } from "react";
import "./Industries.css";

export default function Industries() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const industries = [
    { id: 1, name: "Consumer Electronics OEMs", icon: "📱", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { id: 2, name: "Home Appliance Manufacturers", icon: "🏠", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { id: 3, name: "LED Video Wall OEMs", icon: "💡", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { id: 4, name: "IoT & Smart Device Brands", icon: "🌐", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { id: 5, name: "Authorized Service Networks", icon: "🔧", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { id: 6, name: "Fan & Motor Control Systems", icon: "⚡", gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" },
    { id: 7, name: "Cooktop & Kitchen Appliances", icon: "🍳", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { id: 8, name: "Industrial Electronics", icon: "🏭", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
  ];

  return (
    <section className="industries-section-luxury">
      <div className="industries-container-luxury">
        <div className="industries-header-luxury">
          <h2 className="industries-title-luxury">
            <span className="title-gradient-industries">Industries We Serve</span>
          </h2>
          <p className="industries-subtitle-luxury">
            Trusted by leading OEMs across diverse electronics sectors
          </p>
        </div>

        <div className="industries-grid-luxury">
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              className="industry-card-luxury"
              style={{ "--delay": `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(industry.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="industry-card-inner-luxury">
                <div className="industry-glow-luxury" style={{ background: industry.gradient }} />
                
                <div className="industry-icon-wrapper-luxury">
                  <span className="industry-icon-luxury">{industry.icon}</span>
                </div>
                
                <h3 className="industry-name-luxury">{industry.name}</h3>
                
                <div className="industry-shine-luxury" />

                {hoveredCard === industry.id && (
                  <div className="industry-particles-luxury">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="industry-particle-luxury" style={{ "--i": i }} />
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