import "./QualitySystems.css";

export default function QualitySystems() {
  return (
    <section className="quality-section">
      <h2 className="quality-title">Quality Systems & Infrastructure</h2>
      <p className="quality-subtitle">
        World-class facilities and processes for consistent, reliable results
      </p>

      <div className="quality-grid">
        <div className="quality-card">
          <h3>ISO 9001:2015 Certified</h3>
          <p>
            Fully documented quality management system ensuring consistency and
            compliance across all repair operations.
          </p>
        </div>

        <div className="quality-card">
          <h3>ESD-Safe Environment</h3>
          <p>
            2400+ sq. ft. ESD-compliant facility with controlled workstations,
            grounding, and static protection protocols.
          </p>
        </div>

        <div className="quality-card">
          <h3>Multi-Stage QC</h3>
          <p>
            Incoming, in-process, and outgoing quality checks with documented
            validation at every stage.
          </p>
        </div>

        <div className="quality-card">
          <h3>Batch-Wise Reporting</h3>
          <p>
            Complete repair history tracking, component consumption analytics,
            and traceability documentation for every batch.
          </p>
        </div>
      </div>
    </section>
  );
}