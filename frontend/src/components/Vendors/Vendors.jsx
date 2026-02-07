import React from "react";
import "./Vendors.css";

const clientData = [
  {
    name: "Atomberg",
    category: "Smart Fans, Home Appliances",
    logo: "/images/Vendors/atomberg_logo.png",
    website: "https://atomberg.com",
    services: [
      "Installation, demo",
      "Warranty repair",
      "L4 PCB repair",
      "Field service",
      "Call handling",
    ],
  },
  {
    name: "Bajaj Electricals",
    category: "Induction & Infrared Cooktops",
    logo: "/images/Vendors/bajaj_electricals_logo.png",
    website: "https://www.bajajelectricals.com",
    services: [
      "Main PCB repair",
      "Display PCB repair",
      "Refurbishment",
      "Product-level diagnostics",
    ],
  },
  {
    name: "Xtreme Media",
    category: "LED Video Walls",
    logo: "/images/Vendors/Xtreme_Media_Logo.png",
    website: "https://xtreme-media.in",
    services: [
      "LED module repair",
      "Receiving card repair",
      "Outdoor/indoor LED servicing",
    ],
  },
  {
    name: "Carnot Technologies",
    category: "Automotive Telematics PCBs",
    logo: "/images/Vendors/carnot_Logo.png",
    website: "https://carnot.co.in",
    services: ["L1/L2 PCB repair", "Telematics diagnostics"],
  },
  {
    name: "Anchor by Panasonic",
    category: "Electrical Switches, Wiring Devices",
    logo: "/images/Vendors/Anchor_by_Panasonic_logo.png",
    website: "https://www.anchorbypanasonic.com",
    services: [
      "Consumer electronics service support",
      "Installation",
      "Repair",
      "Technical assistance",
    ],
  },
  {
    name: "Symphony",
    category: "Air Coolers, Cooling Appliances",
    logo: "/images/Vendors/Symphony_logo.png",
    website: "https://www.symphonylimited.com",
    services: [
      "Product servicing",
      "Maintenance",
      "Repair / refurbishment",
      "PCB-level diagnostics",
    ],
  },
  {
    name: "Kent Mineral RO",
    category: "Water Purifiers",
    logo: "/images/Vendors/Kent_logo.png",
    website: "https://www.kent.co.in",
    services: [
      "Installation",
      "Repair services",
      "PCB diagnostics",
      "Product screening & refurbishment",
    ],
  },
  {
    name: "AO Smith",
    category: "Water Heaters, Purifiers",
    logo: "/images/Vendors/AO_Smith_logo.png",
    website: "https://www.aosmith.in",
    services: [
      "Home appliance repair",
      "Component-level PCB servicing",
      "Maintenance support",
    ],
  },
  {
    name: "Usha",
    category: "Fans, Appliances",
    logo: "/images/Vendors/USHA_Logo.png",
    website: "https://www.usha.com",
    services: [
      "Home appliance service",
      "PCB-level repair",
      "Installation and after-sales support",
    ],
  },
];

const Clients = () => {
  return (
    <main id="clients-main" className="site-main clients-page">
      <article className="clients-page-content">
        <div className="entry-content">
          <div className="entry-content-inner">
            <section className="clients-hero">
              <div className="clients-hero-inner">
                <h1 className="clients-title">Clients</h1>
                <p className="clients-subtitle">
                  Trusted partners and clients we work with.
                </p>
              </div>
            </section>

            <section className="clients-list" id="clients-list">
              <h2>Our Clients</h2>

              <div className="clients-grid">
                {clientData.map((v, i) => (
                  <article
                    key={v.name}
                    className={`client-card oregon-box animate-in`}
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className="client-card-inner">
                      {/* Flip container */}
                      <div
                        className="flip-card-container"
                        tabIndex={0}
                        aria-label={`Client ${v.name}`}
                      >
                        <div className="flip-card">
                          <div className="card-front">
                            <figure className="img-bg">
                              {v.logo ? (
                                <a
                                  href={v.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="client-logo-link"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <img src={v.logo} alt={`${v.name} logo`} />
                                </a>
                              ) : (
                                <div className="placeholder-logo">
                                  <span>{v.name.charAt(0)}</span>
                                </div>
                              )}
                              <figcaption className="card-caption">
                                {v.name}
                              </figcaption>
                            </figure>
                          </div>

                          <div className="card-back">
                            <div className="card-back-content">
                              <ul>
                                {v.services.map((s, idx) => (
                                  <li key={idx}>{s}</li>
                                ))}
                              </ul>
                              <div className="client-cta">
                                <a
                                  className="btn-link btn-style701"
                                  href={v.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span>Visit Website</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Clients;
