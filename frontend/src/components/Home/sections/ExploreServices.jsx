import { useState, useEffect, useRef } from "react";
import "../styles/ExploreServices.css";

const ExploreServices = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Product Refurbishment",
      subtitle: "ETN – Equal to New",
      description: "Restoring damaged or returned units to a like-new condition.",
      icon: "🔄",
      image: "/images/Services/service-1.jpg",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Parts Cannibalization",
      subtitle: "Component Recovery",
      description: "Harvesting working components from defective/old units to repair other products.",
      icon: "⚙️",
      image: "/images/Services/service-2.jpg",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "PCB Level Repair",
      subtitle: "L2/L3/L4 Diagnostics",
      description: "Chip-level PCB diagnostics and repair instead of full board replacement.",
      icon: "🔧",
      image: "/images/Services/service-3.jpg",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Parts Swap Services",
      subtitle: "Quick Restoration",
      description: "Replacing non-working parts with new or refurbished parts to quickly restore functionality.",
      icon: "🔌",
      image: "/images/Services/service-4.jpg",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      id: 5,
      title: "Failure Analysis",
      subtitle: "Root Cause Investigation",
      description: "Root-cause failure analysis performed on-site or at the facility to prevent repeat issues.",
      icon: "🔬",
      image: "/images/Services/service-5.jpg",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 6,
      title: "On-Site Sorting",
      subtitle: "Warehouse Services",
      description: "Sorting defective, refurbishable, and scrap items at the client's warehouse.",
      icon: "📦",
      image: "/images/Services/service-6.jpg",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".service-card-3d");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, services.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const getCardPosition = (index) => {
    const diff = (index - currentIndex + services.length) % services.length;
    
    if (diff === 0) return "center";
    if (diff === 1 || diff === -5) return "right";
    if (diff === 2 || diff === -4) return "far-right";
    if (diff === services.length - 1 || diff === -1) return "left";
    if (diff === services.length - 2 || diff === -2) return "far-left";
    return "hidden";
  };

  return (
    <section
      ref={sectionRef}
      id="explore-services-section"
      className="explore-services-section-3d"
    >
      <div className="services-container-3d">
        <div className="services-header-3d">
          <h2 className="services-title-3d">
            <span className="title-gradient">Explore Our Services</span>
          </h2>
          <p className="services-subtitle-3d">
            Premium solutions engineered for excellence
          </p>
        </div>

        <div className="services-carousel-wrapper">
          <div className="services-carousel-3d">
            {services.map((service, index) => {
              const position = getCardPosition(index);
              return (
                <div
                  key={service.id}
                  className={`service-card-3d position-${position}`}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-inner-3d">
                    <div className="card-glow" style={{ background: service.gradient }} />
                    
                    {/* Image Background with Overlay */}
                    <div className="card-image-wrapper">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="card-image"
                      />
                      <div className="card-image-overlay" />
                    </div>
                    
                    <div className="card-content-3d">
                      <div className="icon-wrapper-3d">
                        <span className="service-icon-3d">{service.icon}</span>
                      </div>
                      
                      <h3 className="service-title-3d">{service.title}</h3>
                      <p className="service-subtitle-3d">{service.subtitle}</p>
                      
                      <div className="divider-3d" />
                      
                      <p className="service-description-3d">{service.description}</p>
                    </div>

                    {hoveredCard === service.id && (
                      <div className="particle-container">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="particle" style={{ "--i": i }} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            className="service-nav-btn service-nav-prev"
            onClick={handlePrev}
            aria-label="Previous service"
          >
            <img src="/images/Home/left_array.png" alt="Previous" />
          </button>
          <button
            className="service-nav-btn service-nav-next"
            onClick={handleNext}
            aria-label="Next service"
          >
            <img src="/images/Home/right_array.png" alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;