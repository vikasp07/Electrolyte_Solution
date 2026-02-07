import "../styles/OemTrust.css";

export default function OemTrust() {
  return (
    <>
      {/* WHY TRUST */}
      <section className="trust-section">
        <h2>Why OEMs Trust Electrolyte Solutions</h2>
        <p className="subtitle">
          Advanced PCB repair capabilities backed by certified quality systems
          and data-driven analytics
        </p>

        <div className="trust-grid">
          <div className="trust-card">
            <div className="icon">
              <img
                src="/images/Home/component-repair.png"
                alt="Component Repair"
              />
            </div>
            <h3>L3/L4 Component-Level Repair</h3>
            <p>
              Advanced diagnostic and rework capabilities for complex PCBs,
              including BGA, micro-QFN, and fine-pitch components.
            </p>
          </div>

          <div className="trust-card">
            <div className="icon">
              <img src="/images/Home/iso-certified.png" alt="ISO Quality" />
            </div>
            <h3>ISO 9001:2015 Quality Systems</h3>
            <p>
              Certified quality management system ensuring consistent processes,
              documented controls, and continual improvement.
            </p>
          </div>

          <div className="trust-card">
            <div className="icon">
              <img
                src="/images/Home/zed-certified.png"
                alt="ZED Sustainability"
              />
            </div>
            <h3>ZED Certified Operations</h3>
            <p>
              Government of India certification demonstrating defect-free output
              and environmentally responsible processes.
            </p>
          </div>

          <div className="trust-card">
            <div className="icon">
              <img
                src="/images/Home/AI-built-data-1.jpg"
                alt="Analytics Dashboard"
              />
            </div>
            <h3>Batch-Level Dashboards</h3>
            <p>
              Real-time repair analytics, component consumption tracking, and
              failure trend identification for design optimization.
            </p>
          </div>

          <div className="trust-card">
            <div className="icon">
              <img
                src="/images/Home/qr-traceability.png"
                alt="QR Traceability"
              />
            </div>
            <h3>QR-Based Traceability</h3>
            <p>
              Complete digital repair history for every PCB, enabling lifecycle
              visibility and transparent quality monitoring.
            </p>
          </div>

          <div className="trust-card">
            <div className="icon">
              <img src="/images/Home/esd-facility.png" alt="ESD Facility" />
            </div>
            <h3>ESD-Compliant Facility</h3>
            <p>
              Controlled environment with proper grounding, ionization, and
              static control measures for sensitive electronics.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="value-section">
        <h2>Our Unique Value to OEM Partners</h2>

        <div className="value-grid">
          <div className="value-card">
            <h3>Certified Quality & Sustainability-Driven Repairs</h3>
            <p>
              Our ISO 9001:2015 and ZED certifications ensure controlled repair
              processes, defect prevention, environmental responsibility, and
              extended electronic waste reuse at PCB refurbishment scale.
            </p>
          </div>

          <div className="value-card">
            <h3>Data-Driven Repair Dashboard & Component Analytics</h3>
            <p>
              Each repair batch is analyzed through detailed dashboards showing
              component failure patterns, consumption trends, and opportunities
              for long-term design improvement.
            </p>
          </div>

          <div className="value-card">
            <h3>QR-Based End-to-End PCB Traceability</h3>
            <p>
              Every repaired PCB carries a unique QR code linking intake,
              diagnostics, repair actions, testing, and dispatch records for
              complete lifecycle visibility.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
