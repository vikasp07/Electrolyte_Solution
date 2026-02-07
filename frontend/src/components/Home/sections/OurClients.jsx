import React, { useRef, useState, useEffect } from "react";
import "../styles/OurClients.css";

const OurClients = () => {
  const sliderRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const clients = [
    {
      id: 1,
      name: "Atomberg",
      category: "Smart Fans, Home Appliances",
      logo: "/images/Vendors/atomberg_logo.png",
      website: "https://atomberg.com",
    },
    {
      id: 2,
      name: "Bajaj Electricals",
      category: "Induction & Infrared Cooktops",
      logo: "/images/Vendors/bajaj_electricals_logo.png",
      website: "https://www.bajajelectricals.com",
    },
    {
      id: 3,
      name: "Xtreme Media",
      category: "LED Video Walls",
      logo: "/images/Vendors/Xtreme_Media_Logo.png",
      website: "https://xtreme-media.in",
    },
    {
      id: 4,
      name: "Carnot Technologies",
      category: "Automotive Telematics PCBs",
      logo: "/images/Vendors/carnot_Logo.png",
      website: "https://carnot.co.in",
    },
    {
      id: 5,
      name: "Anchor by Panasonic",
      category: "Electrical Switches, Wiring Devices",
      logo: "/images/Vendors/Anchor_by_Panasonic_logo.png",
      website: "https://www.anchorbypanasonic.com",
    },
    {
      id: 6,
      name: "Symphony",
      category: "Air Coolers, Cooling Appliances",
      logo: "/images/Vendors/Symphony_logo.png",
      website: "https://www.symphonylimited.com",
    },
    {
      id: 7,
      name: "Kent Mineral RO",
      category: "Water Purifiers",
      logo: "/images/Vendors/Kent_logo.png",
      website: "https://www.kent.co.in",
    },
    {
      id: 8,
      name: "AO Smith",
      category: "Water Heaters, Purifiers",
      logo: "/images/Vendors/AO_Smith_logo.png",
      website: "https://www.aosmith.in",
    },
    {
      id: 9,
      name: "Usha",
      category: "Fans, Appliances",
      logo: "/images/Vendors/USHA_Logo.png",
      website: "https://www.usha.com",
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

  // Auto-scroll clients slider with 2 second interval
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
    }, 2000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <section
      id="our-clients-section"
      className="bt_bb_section our-clients-section"
    >
      <div className="our-clients-content">
        {/* Section Header */}
        <div className="our-clients-header">
          <h3 className="our-clients-title">Our Clients</h3>
        </div>

        {/* Client Slider */}
        <div className="our-clients-slider-wrapper">
          <div className="our-clients-slider" ref={sliderRef}>
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>

          {/* Slider Controls */}
          <button
            className="client-nav-btn client-nav-prev"
            onClick={scrollLeft}
            aria-label="Previous clients"
          >
            <img src="/images/Home/left_array.png" alt="Previous" />
          </button>
          <button
            className="client-nav-btn client-nav-next"
            onClick={scrollRight}
            aria-label="Next clients"
          >
            <img src="/images/Home/right_array.png" alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Client Card Component
const ClientCard = ({ client }) => {
  return (
    <div className="client-card">
      <div className="client-logo-wrapper">
        <a
          href={client.website}
          target="_blank"
          rel="noopener noreferrer"
          className="client-logo-link"
        >
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            loading="lazy"
            className="client-logo"
          />
        </a>
      </div>
      <div className="client-info">
        <h3 className="client-name">{client.name}</h3>
        <p className="client-category">{client.category}</p>
      </div>
    </div>
  );
};

export default OurClients;
