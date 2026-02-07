import React, { useState, useEffect, useRef } from "react";
import "./Services.css";
import Industries from "./Industries";
import QualitySystems from "./QualitySystems";

const Services = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Product Screening & Repair",
      description:
        "Checking products, identifying faults, and repairing them to restore full functionality.",
      image: "/images/Services/service-1.jpg",
      delay: "0s",
    },
    {
      id: 2,
      title: "Product Refurbishment (ETN – Equal to New)",
      description:
        "Restoring damaged or returned units to a like-new condition.",
      image: "/images/Services/service-2.jpg",
      delay: "0.1s",
    },
    {
      id: 3,
      title: "Parts Cannibalization",
      description:
        "Harvesting working components from defective/old units to repair other products.",
      image: "/images/Services/service-3.jpg",
      delay: "0.2s",
    },
    {
      id: 4,
      title: "PCB / Component Level Repair",
      description:
        "L2/L3/L4 chip-level PCB diagnostics and repair instead of full board replacement.",
      image: "/images/Services/service-4.jpg",
      delay: "0.3s",
    },
    {
      id: 5,
      title: "Parts Swap Services",
      description:
        "Replacing non-working parts with new or refurbished parts to quickly restore functionality.",
      image: "/images/Services/service-5.jpg",
      delay: "0.4s",
    },
    {
      id: 6,
      title: "Failure Analysis (FA)",
      description:
        "Root-cause failure analysis performed on-site or at the facility to prevent repeat issues.",
      image: "/images/Services/service-6.jpg",
      delay: "0.5s",
    },
    {
      id: 7,
      title: "On-Site Sorting Services",
      description:
        "Sorting defective, refurbishable, and scrap items at the client's warehouse.",
      image: "/images/Services/service-7.jpg",
      delay: "0.6s",
    },
  ];

  // Auto-play effect for carousel
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 4000); // Rotate every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, services.length]);

  const handleCarouselPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const handleCarouselNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const getVisibleServices = () => {
    const visibleCount = 3;
    const services_list = [];
    for (let i = 0; i < visibleCount; i++) {
      services_list.push(services[(currentIndex + i) % services.length]);
    }
    return services_list;
  };

  const handleParallax = () => {
    return {
      transform: `translateY(${scrollY * 0.5}px)`,
    };
  };

  return (
    <main id="services-main" className="site-main">
      <article className="services-page-content">
        <div className="entry-content">
          <div className="entry-content-inner">
            {/* Hero Banner Section */}
            <section
              id="services_banner_section"
              className="bt_bb_section services-hero-banner"
              style={{
                ...handleParallax(),
                backgroundImage: 'url("/images/Home/hero-banner.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="services-hero-bg" />

              <div className="services-hero-content">
                <div className="services-hero-container">
                  <div className="services-hero-main">
                    {/* Separator */}
                    <div className="separator" />

                    {/* Main Title */}
                    <h1 className="services-hero-title animate-in">
                      Our Services
                    </h1>

                    {/* Separator */}
                    <div className="separator" />

                    {/* Subheadline */}
                    <h3 className="services-hero-description animate-in">
                      Comprehensive repair and refurbishment solutions designed
                      to extend the lifecycle of your critical electronics and
                      maximize operational efficiency.
                    </h3>

                    {/* Separator */}
                    <div className="separator" />
                  </div>
                </div>
              </div>


            </section>

            {/* New Services Section */}
            <section className="services-section">
              <h2 className="services-title">Our Services</h2>
              <p className="services-subtitle">
                Comprehensive PCB repair and refurbishment solutions
              </p>

              <div className="services-grid">
                {/* Card 1 */}
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

                {/* Card 2 */}
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

                {/* Card 3 */}
                <div className="service-card">
                  <h3>Embedded System Diagnostics</h3>
                  <ul>
                    <li>Firmware flashing and validation</li>
                    <li>Functional and load testing</li>
                    <li>Intermittent fault isolation and validation</li>
                    <li>Protocol and communication testing</li>
                    <li>End-of-line testing and certification</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Industries Section */}
            <Industries />

            {/* Quality Systems Section */}
            <QualitySystems />

            {/* Services Carousel Section */}
            <section
              id="services-carousel-section"
              className="bt_bb_section services-carousel-section"
            >
              <div className="container">
                <div className="carousel-section-header">
                  <h2 className="carousel-section-title">
                    Explore Our Services
                  </h2>
                </div>

                {/* Circular Carousel */}
                <div className="circular-carousel-wrapper">
                  {/* Navigation Buttons */}
                  <button
                    className="carousel-nav-btn carousel-nav-prev"
                    onClick={handleCarouselPrev}
                    aria-label="Previous services"
                  >
                    <i className="ri-arrow-left-s-line"></i>
                  </button>

                  {/* Carousel Container */}
                  <div className="circular-carousel-container">
                    <div className="carousel-track">
                      {getVisibleServices().map((service, index) => (
                        <div
                          key={service.id}
                          className={`carousel-item ${
                            index === 1 ? "active" : ""
                          } ${index === 0 ? "prev" : ""} ${
                            index === 2 ? "next" : ""
                          }`}
                        >
                          <ServiceCarouselCard service={service} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    className="carousel-nav-btn carousel-nav-next"
                    onClick={handleCarouselNext}
                    aria-label="Next services"
                  >
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${
                        index === currentIndex ? "active" : ""
                      }`}
                      onClick={() => {
                        setCurrentIndex(index);
                        setAutoPlay(false);
                        setTimeout(() => setAutoPlay(true), 8000);
                      }}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Services Grid Section */}
            <section
              id="services-grid-section"
              className="bt_bb_section services-grid-section"
            >
              <div className="container">
                {/* Services Grid */}
                <div className="services-grid">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
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

// Service Card Component for Grid
const ServiceCard = ({ service }) => {
  return (
    <div
      className="service-card animate-in"
      style={{ "--animation-delay": service.delay }}
    >
      <div className="service-card-image-wrapper">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="service-card-image"
        />
        <div className="service-card-overlay" />
      </div>
      <div className="service-card-content">
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-description">{service.description}</p>
      </div>
    </div>
  );
};

// Service Carousel Card Component
const ServiceCarouselCard = ({ service }) => {
  return (
    <div className="carousel-service-card">
      <div className="carousel-service-image-wrapper">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="carousel-service-image"
        />
        <div className="carousel-service-overlay" />
      </div>
      <div className="carousel-service-content">
        <h3 className="carousel-service-title">{service.title}</h3>
        <p className="carousel-service-description">{service.description}</p>
      </div>
    </div>
  );
};

export default Services;
