// seed-blogs.js
const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/Blog");

const sampleBlogs = [
  {
    title: "The Importance of Hydration",
    slug: "importance-of-hydration",
    excerpt:
      "Learn why staying hydrated is crucial for your health and performance.",
    content:
      "<h2>Hydration Basics</h2><p>Water is essential for all bodily functions. Proper hydration helps regulate body temperature, transport nutrients, and remove waste. Most experts recommend drinking at least 8 glasses of water daily.</p><h2>Benefits of Staying Hydrated</h2><ul><li>Improved cognitive function</li><li>Better physical performance</li><li>Enhanced digestion</li><li>Healthier skin</li></ul>",
    featuredImage: {
      filename: "hydration.jpg",
      url: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=800&q=80",
    },
    status: "published",
    category: "Health & Wellness",
    tags: ["hydration", "health", "wellness"],
    metaTitle: "The Importance of Hydration - Electrolyte",
    metaDescription:
      "Discover why hydration is essential for your health and learn tips to stay properly hydrated.",
    metaKeywords: "hydration, water, health, wellness",
  },
  {
    title: "Electrolytes: Your Body's Essential Minerals",
    slug: "electrolytes-essential-minerals",
    excerpt:
      "Understand what electrolytes are and why they matter for your body.",
    content:
      "<h2>What Are Electrolytes?</h2><p>Electrolytes are minerals that carry electrical charges and are vital for numerous bodily functions. The main electrolytes are sodium, potassium, calcium, magnesium, and chloride.</p><h2>Key Functions</h2><ul><li>Muscle contraction and relaxation</li><li>Heart rhythm regulation</li><li>Fluid balance</li><li>Nerve signal transmission</li></ul><p>Maintaining proper electrolyte balance is crucial for optimal health and athletic performance.</p>",
    featuredImage: {
      filename: "electrolytes.jpg",
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    },
    status: "published",
    category: "Nutrition",
    tags: ["electrolytes", "minerals", "nutrition"],
    metaTitle: "Electrolytes: Your Body's Essential Minerals",
    metaDescription:
      "Learn about electrolytes and their vital role in maintaining your health.",
  },
  {
    title: "Sports Hydration: Tips for Athletes",
    slug: "sports-hydration-tips",
    excerpt: "Expert tips for proper hydration during athletic activities.",
    content:
      "<h2>Pre-Exercise Hydration</h2><p>Start your workout well-hydrated by drinking 16-20 oz of fluid 2-3 hours before exercise.</p><h2>During Exercise</h2><p>For activities lasting more than 60 minutes, consume 6-8 oz of fluid every 15-20 minutes. Sports drinks with electrolytes can help maintain performance.</p><h2>Post-Exercise Recovery</h2><p>Rehydrate after exercise with 16-24 oz of fluid for every pound of body weight lost during the activity.</p>",
    featuredImage: {
      filename: "sports-hydration.jpg",
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    },
    status: "published",
    category: "Sports",
    tags: ["sports", "hydration", "athletes", "fitness"],
    metaTitle: "Sports Hydration: Tips for Athletes - Electrolyte",
    metaDescription:
      "Get expert tips on proper hydration strategies for athletic performance.",
  },
  {
    title: "Natural Sources of Electrolytes",
    slug: "natural-electrolytes",
    excerpt: "Discover natural foods rich in electrolytes.",
    content:
      "<h2>Foods Rich in Potassium</h2><p>Bananas, sweet potatoes, and spinach are excellent sources of potassium, an essential electrolyte.</p><h2>Sodium Sources</h2><p>While we need some sodium, it's naturally present in most foods. Sea salt and whole foods provide balanced sodium levels.</p><h2>Magnesium-Rich Foods</h2><ul><li>Dark leafy greens</li><li>Nuts and seeds</li><li>Whole grains</li><li>Legumes</li></ul><p>Including these foods in your diet ensures adequate electrolyte intake without supplements.</p>",
    featuredImage: {
      filename: "natural-electrolytes.jpg",
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    },
    status: "published",
    category: "Nutrition",
    tags: ["electrolytes", "natural", "food", "nutrition"],
    metaTitle: "Natural Sources of Electrolytes - Electrolyte",
    metaDescription:
      "Explore natural foods that are rich in electrolytes and minerals.",
  },
  {
    title: "Dehydration: Signs and Solutions",
    slug: "dehydration-signs-solutions",
    excerpt: "Learn to recognize dehydration symptoms and how to prevent them.",
    content:
      "<h2>Signs of Dehydration</h2><ul><li>Dry mouth and lips</li><li>Dark urine</li><li>Fatigue and weakness</li><li>Dizziness</li><li>Reduced performance</li></ul><h2>Quick Solutions</h2><p>Drink water immediately if you notice signs of dehydration. For severe dehydration, electrolyte drinks can help restore balance faster.</p><h2>Prevention Tips</h2><ul><li>Drink water throughout the day</li><li>Monitor urine color</li><li>Increase intake during exercise</li><li>Stay hydrated in hot weather</li></ul>",
    featuredImage: {
      filename: "dehydration.jpg",
      url: "https://images.unsplash.com/photo-1503891077046-a62b8e6c4da2?w=800&q=80",
    },
    status: "published",
    category: "Health & Wellness",
    tags: ["dehydration", "health", "prevention"],
    metaTitle: "Dehydration: Signs and Solutions - Electrolyte",
    metaDescription:
      "Understand dehydration symptoms and learn how to prevent and treat them effectively.",
  },
];

async function seedBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing blogs (optional - comment out to keep existing data)
    // await Blog.deleteMany({});
    // console.log("Cleared existing blogs");

    // Insert sample blogs
    const inserted = await Blog.insertMany(sampleBlogs);
    console.log(
      `✅ Successfully added ${inserted.length} blogs to the database`
    );
    console.log("Blogs added:");
    inserted.forEach((blog) => {
      console.log(`  - ${blog.title} (${blog.slug})`);
    });

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding blogs:", error);
    process.exit(1);
  }
}

seedBlogs();
