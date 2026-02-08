# Cloudinary Setup for Image Storage on Vercel

## Problem
Vercel is a serverless platform and doesn't support persistent file storage. Images uploaded through the admin panel need to be stored in cloud storage.

## Solution: Cloudinary Integration

### Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account
3. After login, go to Dashboard
4. Note down these credentials:
   - Cloud Name
   - API Key
   - API Secret

### Step 2: Update Backend Environment Variables

Add to `backend/.env`:
```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Install Cloudinary Package

Run in backend directory:
```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

### Step 4: Update Backend Code

The following files need to be updated:
- `backend/config/cloudinary.js` (new file - create this)
- `backend/routes/blogs.js` (update multer config)
- `backend/routes/photos.js` (update multer config)
- `backend/routes/sponsors.js` (update multer config)

### Step 5: Deploy to Vercel

1. Add environment variables in Vercel Dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`

2. Redeploy your backend

### Benefits
- ✅ Images persist across deployments
- ✅ Fast CDN delivery
- ✅ Automatic image optimization
- ✅ Free tier: 25GB storage, 25GB bandwidth/month
- ✅ Image transformations (resize, crop, etc.)

### Migration
Existing images in `/uploads` folder will need to be manually uploaded to Cloudinary or re-uploaded through the admin panel.
