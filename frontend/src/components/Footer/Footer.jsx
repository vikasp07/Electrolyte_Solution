import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Contact Info */}
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li className="footer-contact-item">
              <i className="ri-building-line"></i>
              <span>Electrolyte Solutions</span>
            </li>
            <li className="footer-contact-item">
              <i className="ri-mail-line"></i>
              <a href="mailto:contact@electrolytesoln.com">
                contact@electrolytesoln.com
              </a>
            </li>
            <li className="footer-contact-item">
              <i className="ri-map-pin-line"></i>
              <span>Mumbai, Maharashtra, India</span>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li>
              <Link to="/services">L3 & L4 PCB Repair</Link>
            </li>
            <li>
              <Link to="/services">PCB Refurbishment</Link>
            </li>
            <li>
              <Link to="/services">Onset, Service Repair</Link>
            </li>
            <li>
              <Link to="/services">Component-Level Rework</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Industries</h4>
          <ul>
            <li>
              <Link to="/clients">Consumer Electronics</Link>
            </li>
            <li>
              <Link to="/clients">Home Appliances</Link>
            </li>
            <li>
              <Link to="/clients">LED video wall </Link>
            </li>
            <li>
              <Link to="/clients">IoT Devices</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4>Other Links</h4>
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/clients">Client</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/admin/login">Admin Login</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Electrolyte Solutions. All rights reserved. | Services India
      </div>
    </footer>
  );
}
