import React, { useRef, useState, useEffect } from "react";
import "../styles/OurServices.css";

const OurServices = () => {
  const sliderRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const services = [
    {
      id: 1,
      title: "Product Screening & Repair",
      image: "/images/Services/service-1.jpg",
      icon: "ri-tools-line",
      link: "/services#product-screening",
    },
    {
      id: 2,
      title: "Product Refurbishment (ETN)",
      image: "/images/Services/service-2.jpg",
      icon: "ri-refresh-line",
      link: "/services#product-refurbishment",
    },
    {
      id: 3,
      title: "Parts Cannibalization",
      image: "/images/Services/service-3.jpg",
      icon: "ri-settings-3-line",
      link: "/services#parts-cannibalization",
    },
    {
      id: 4,
      title: "PCB & Component Level Repair",
      image: "/images/Services/service-4.jpg",
      icon: "ri-cpu-line",
      link: "/services#pcb-repair",
    },
    {
      id: 5,
      title: "Parts Swap Services",
      image: "/images/Services/service-5.jpg",
      icon: "ri-swap-line",
      link: "/services#parts-swap",
    },
    {
      id: 6,
      title: "Failure Analysis (FA)",
      image: "/images/Services/service-6.jpg",
      icon: "ri-search-line",
      link: "/services#failure-analysis",
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
    setAutoScroll(false);
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
    setAutoScroll(false);
  };

  // Auto-scroll services slider with 1 second interval
  useEffect(() => {
    if (!autoScroll || !sliderRef.current) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <section
      id="our-services-section"
      className="bt_bb_section our-services-section"
    >
      <div className="our-services-content">
        {/* Section Header */}
        <div className="our-services-header">
          <h3 className="our-services-title">Our Services</h3>
        </div>

        {/* Service Slider */}
        <div className="our-services-slider-wrapper">
          <div className="our-services-slider" ref={sliderRef}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Slider Controls */}
          <button
            className="service-nav-btn service-nav-prev"
            onClick={scrollLeft}
            aria-label="Previous services"
          >
            <img src="/images/Home/left_array.png" alt="Previous" />
          </button>
          <button
            className="service-nav-btn service-nav-next"
            onClick={scrollRight}
            aria-label="Next services"
          >
            <img src="/images/Home/right_array.png" alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <a href={service.link} className="service-card-link">
        <div className="service-image-wrapper">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="service-image"
          />
        </div>
      </a>
      <i className={`service-icon ${service.icon}`}></i>
      <h2 className="service-title">
        <a href={service.link}>{service.title}</a>
      </h2>
    </div>
  );
};

export default OurServices;
