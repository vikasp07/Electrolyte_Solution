import { useState, useEffect, useRef } from "react";
import "./Services.css";
import Industries from "./Industries";
import QualitySystems from "./QualitySystems";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".service-card-luxury");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "Product Refurbishment",
      subtitle: "ETN – Equal to New",
      description: "Restoring damaged or returned units to a like-new condition.",
      icon: "🔄",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Parts Cannibalization",
      subtitle: "Component Recovery",
      description: "Harvesting working components from defective/old units to repair other products.",
      icon: "⚙️",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "PCB Level Repair",
      subtitle: "L2/L3/L4 Diagnostics",
      description: "Chip-level PCB diagnostics and repair instead of full board replacement.",
      icon: "🔧",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Parts Swap Services",
      subtitle: "Quick Restoration",
      description: "Replacing non-working parts with new or refurbished parts to quickly restore functionality.",
      icon: "🔌",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      id: 5,
      title: "Failure Analysis",
      subtitle: "Root Cause Investigation",
      description: "Root-cause failure analysis performed on-site or at the facility to prevent repeat issues.",
      icon: "🔬",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 6,
      title: "On-Site Sorting",
      subtitle: "Warehouse Services",
      description: "Sorting defective, refurbishable, and scrap items at the client's warehouse.",
      icon: "📦",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    },
  ];

  return (
    <main id="services-main" className="site-main">
      <article className="services-page-content">
        <div className="entry-content">
          <div className="entry-content-inner">
            {/* New Services Section */}
            <section className="services-section">
              <h2 className="services-title">Our Services</h2>
              <p className="services-subtitle">
                Comprehensive PCB repair and refurbishment solutions
              </p>

              <div className="services-grid">
                <div className="service-card">
                  <h3>L3 & L4 PCB Repair</h3>
                  <ul>
                    <li>Micro-soldering and fine-pitch component repair</li>
                    <li>BGA, QFN, and complex IC rework</li>
                    <li>Power, control, and communication circuit repair</li>
                    <li>SMD and through-hole component replacement</li>
                    <li>Multilayer board trace repair</li>
                  </ul>
                </div>

                <div className="service-card">
                  <h3>PCB Refurbishment & Rework</h3>
                  <ul>
                    <li>Deep cleaning and coating removal</li>
                    <li>Connector, relay, and capacitor replacement</li>
                    <li>Barcode and QR regeneration with traceability</li>
                    <li>Conformal coating reapplication</li>
                    <li>Cosmetic and functional restoration</li>
                  </ul>
                </div>

                <div className="service-card">
                  <h3>On Site Service Repair</h3>
                  <ul>
                    <li>End-to-End after sales solution for Ceiling Fan, TPW Fan, Exhaust Fan</li>
                    <li>Geyser, Mixer Grinders and Smart Appliances service support</li>
                    <li>Installation and Demo services</li>
                    <li>Repair and Warranty management</li>
                    <li>Annual Maintenance Contract (AMC) services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Industries Section */}
            <Industries />

            {/* Quality Systems Section */}
            <QualitySystems />

            {/* Luxury Services Grid Section */}
            <section
              ref={sectionRef}
              id="services-grid-section"
              className="services-grid-section-luxury"
            >
              <div className="luxury-container">
                <div className="services-grid-luxury">
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      className="service-card-luxury"
                      style={{ "--delay": `${index * 0.15}s` }}
                      onMouseEnter={() => setHoveredCard(service.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="card-inner-luxury">
                        <div className="card-glow-luxury" style={{ background: service.gradient }} />
                        
                        <div className="card-content-luxury">
                          <div className="icon-wrapper-luxury">
                            <span className="service-icon-luxury">{service.icon}</span>
                          </div>
                          
                          <h3 className="service-title-luxury">{service.title}</h3>
                          <p className="service-subtitle-luxury">{service.subtitle}</p>
                          
                          <div className="divider-luxury" />
                          
                          <p className="service-description-luxury">{service.description}</p>
                        </div>

                        {hoveredCard === service.id && (
                          <div className="particle-container-luxury">
                            {[...Array(15)].map((_, i) => (
                              <div key={i} className="particle-luxury" style={{ "--i": i }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Services;
