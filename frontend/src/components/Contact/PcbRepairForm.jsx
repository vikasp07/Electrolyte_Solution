import "./PcbRepairForm.css";

export default function PcbRepairForm() {
  return (
    <section className="pcb-section">
      <h2 className="pcb-title">Let's Discuss Your PCB Repair Requirement</h2>
      <p className="pcb-subtitle">
        Request a technical discussion or schedule a facility audit
      </p>

      <div className="pcb-container">
        {/* Left Form */}
        <form className="pcb-form">
          <label>
            <span className="label-text">
              Company Name <span>*</span>
            </span>
            <input type="text" />
          </label>

          <label>
            <span className="label-text">
              Contact Person <span>*</span>
            </span>
            <input type="text" />
          </label>

          <label>
            <span className="label-text">
              Email <span>*</span>
            </span>
            <input type="email" />
          </label>

          <label>
            <span className="label-text">
              Phone <span>*</span>
            </span>
            <input type="text" />
          </label>

          <label>
            PCB Type / Application
            <input
              type="text"
              placeholder="e.g., LED Driver, Motor Controller, IoT Gateway"
            />
          </label>

          <label>
            Monthly Volume (Estimated)
            <select>
              <option>Select volume range</option>
              <option>1 – 100</option>
              <option>100 – 500</option>
              <option>500 – 1000</option>
              <option>1000+</option>
            </select>
          </label>

          <label>
            Message / Requirement Details
            <textarea rows="4"></textarea>
          </label>

          <button type="submit">Request Technical Discussion</button>
        </form>

        {/* Right Info Box */}
        <div className="pcb-info">
          <h3>Get in Touch</h3>

          <p>
            <strong>Location:</strong>
            <br />
            Mumbai, Maharashtra, India
          </p>

          <p>
            <strong>Email:</strong>
            <br />
            info@electrolytesolutions.in
          </p>

          <p>
            <strong>Business Hours:</strong>
            <br />
            Monday - Saturday: 9:00 AM - 6:00 PM
          </p>

          <div className="pcb-why">
            <h4>Why Choose Us?</h4>
            <ul>
              <li>✓ ISO 9001:2015 Certified</li>
              <li>✓ L3/L4 Component-Level Expertise</li>
              <li>✓ QR-Based Traceability</li>
              <li>✓ Data-Driven Repair Analytics</li>
              <li>✓ Volume-Ready Operations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}