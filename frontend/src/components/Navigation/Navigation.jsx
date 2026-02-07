import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="/images/Home/logo.png"
            alt="Electrolyte"
            className="logo-image"
          />
        </Link>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/certifications"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Certifications
          </Link>
          <Link
            to="/clients"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Clients
          </Link>
          <Link
            to="/blog"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="nav-link cta-button"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={isMenuOpen ? "active" : ""}></span>
          <span className={isMenuOpen ? "active" : ""}></span>
          <span className={isMenuOpen ? "active" : ""}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
