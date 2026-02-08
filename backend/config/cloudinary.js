// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage for blogs
const blogStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'electrolyte/blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 630, crop: 'limit' }],
  },
});

// Create storage for photos
const photoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'electrolyte/photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});

// Create storage for sponsors
const sponsorStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'electrolyte/sponsors',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

module.exports = {
  cloudinary,
  blogStorage,
  photoStorage,
  sponsorStorage,
};
