import { useState } from "react";
import "./PcbRepairForm.css";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://electrolyte-website.onrender.com/api";

export default function PcbRepairForm() {
  const [form, setForm] = useState({
    company: "",
    firstName: "",
    email: "",
    phone: "",
    subject: "",
    volume: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.company, // using company as context
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject || "PCB Repair Inquiry",
          message: `Volume: ${form.volume || "N/A"}\n\n${form.message}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setStatus("success");
      setForm({
        company: "",
        firstName: "",
        email: "",
        phone: "",
        subject: "",
        volume: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="pcb-section">
      <h2 className="pcb-title">Let's Discuss Your PCB Repair Requirement</h2>
      <p className="pcb-subtitle">
        Request a technical discussion or schedule a facility audit
      </p>

      <div className="pcb-container">
        {/* Left Form */}
        <form className="pcb-form" onSubmit={handleSubmit}>
          <label>
            <span className="label-text">
              Company Name <span>*</span>
            </span>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="label-text">
              Contact Person <span>*</span>
            </span>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="label-text">
              Email <span>*</span>
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="label-text">
              Phone <span>*</span>
            </span>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            PCB Type / Application
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g., LED Driver, Motor Controller, IoT Gateway"
            />
          </label>

          <label>
            Monthly Volume (Estimated)
            <select name="volume" value={form.volume} onChange={handleChange}>
              <option value="">Select volume range</option>
              <option value="1 – 100">1 – 100</option>
              <option value="100 – 500">100 – 500</option>
              <option value="500 – 1000">500 – 1000</option>
              <option value="1000+">1000+</option>
            </select>
          </label>

          <label>
            Message / Requirement Details
            <textarea
              rows="4"
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </label>

          <button type="submit" disabled={status === "sending"}>
            {status === "sending"
              ? "Sending..."
              : "Request Technical Discussion"}
          </button>

          {status === "success" && (
            <p style={{ color: "#22c55e", marginTop: "12px", fontWeight: 600 }}>
              ✓ Your message has been sent successfully! We'll get back to you
              soon.
            </p>
          )}
          {status === "error" && (
            <p style={{ color: "#ef4444", marginTop: "12px", fontWeight: 600 }}>
              ✗ {errorMsg}
            </p>
          )}
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
