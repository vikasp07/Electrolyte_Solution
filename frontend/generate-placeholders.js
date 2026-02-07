const fs = require("fs");
const path = require("path");

// Create a simple SVG placeholder for all images
const createSVGPlaceholder = (width, height, text) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#e0e0e0"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#999" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
};

// Images to create
const imagesToCreate = [
  // Home folder
  {
    name: "public/images/Home/about-banner.jpg",
    width: 1920,
    height: 600,
    text: "About Banner",
  },
  {
    name: "public/images/Home/hero-banner.jpg",
    width: 1920,
    height: 1080,
    text: "Hero Banner",
  },
  {
    name: "public/images/Home/mission-white-160x160.png",
    width: 160,
    height: 160,
    text: "Mission",
  },
  {
    name: "public/images/Home/vission-white-160x160.png",
    width: 160,
    height: 160,
    text: "Vision",
  },
  {
    name: "public/images/Home/value-white-160x160.png",
    width: 160,
    height: 160,
    text: "Values",
  },
  {
    name: "public/images/Home/mission-vision.jpg",
    width: 1920,
    height: 800,
    text: "Mission Vision",
  },
  {
    name: "public/images/Home/Industry-based-Use-Cases.jpg",
    width: 1920,
    height: 800,
    text: "Use Cases",
  },
  {
    name: "public/images/Home/Secure-File-Transfer-and-Syslog-Replication-Using-Owl-Data-Diodes.jpg",
    width: 800,
    height: 600,
    text: "File Transfer",
  },
  {
    name: "public/images/Home/OSI-PI-Historian-Replication-Using-OWL-Data-Diodes.jpg",
    width: 800,
    height: 600,
    text: "PI Historian",
  },
  {
    name: "public/images/Home/Secure-OPC-Data-Replication-Using-Owl-Data-Diodes.jpg",
    width: 800,
    height: 600,
    text: "OPC Data",
  },
  {
    name: "public/images/Home/Database-Replication-Using-Data-Diodes.jpg",
    width: 800,
    height: 600,
    text: "Database",
  },
  {
    name: "public/images/Home/Securing-Critical-CCTV-Networks-and-Enterprise.jpg",
    width: 800,
    height: 600,
    text: "CCTV Networks",
  },
  {
    name: "public/images/Home/bottom_black_01_1.png",
    width: 1920,
    height: 80,
    text: "Wave",
  },
  {
    name: "public/images/Home/bottom_black_02-1.png",
    width: 1920,
    height: 80,
    text: "Wave",
  },
  {
    name: "public/images/Home/bottom_black.png",
    width: 1920,
    height: 80,
    text: "Wave",
  },
  {
    name: "public/images/Home/bottom_array.png",
    width: 50,
    height: 80,
    text: "Arrow",
  },

  // AboutUs folder
  {
    name: "public/images/AboutUs/about-banner.jpg",
    width: 1920,
    height: 600,
    text: "About Banner",
  },
  {
    name: "public/images/AboutUs/company-overview.jpg",
    width: 800,
    height: 600,
    text: "Company",
  },
  {
    name: "public/images/AboutUs/why-us.jpg",
    width: 800,
    height: 600,
    text: "Why Us",
  },
  {
    name: "public/images/AboutUs/core-values.jpg",
    width: 800,
    height: 600,
    text: "Core Values",
  },
  {
    name: "public/images/AboutUs/process.jpg",
    width: 800,
    height: 600,
    text: "Process",
  },

  // Services folder
  {
    name: "public/images/Services/service-1.jpg",
    width: 800,
    height: 600,
    text: "Service 1",
  },
  {
    name: "public/images/Services/service-2.jpg",
    width: 800,
    height: 600,
    text: "Service 2",
  },
  {
    name: "public/images/Services/service-3.jpg",
    width: 800,
    height: 600,
    text: "Service 3",
  },
];

// Create directories and files
imagesToCreate.forEach((img) => {
  const dir = path.dirname(img.name);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create SVG placeholder
  const svg = createSVGPlaceholder(img.width, img.height, img.text);
  fs.writeFileSync(img.name, svg);
  console.log(`Created: ${img.name}`);
});

console.log("\n✓ All placeholder images created successfully!");
