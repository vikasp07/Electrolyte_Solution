# Deployment Guide - Cloudinary Image Storage

## Overview
This guide will help you set up Cloudinary for image storage so your images work on Vercel deployment.

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account (no credit card required)
3. After login, you'll see your Dashboard

## Step 2: Get Cloudinary Credentials

From your Cloudinary Dashboard, copy these three values:
- **Cloud Name**: (e.g., `dxyz123abc`)
- **API Key**: (e.g., `123456789012345`)
- **API Secret**: (e.g., `abcdefghijklmnopqrstuvwxyz123`)

## Step 3: Install Dependencies

Run this command in your backend directory:

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

## Step 4: Update Local Environment Variables

Update your `backend/.env` file with your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the placeholder values with your actual Cloudinary credentials.

## Step 5: Test Locally

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Try uploading an image through the admin panel
3. Check if the image URL starts with `https://res.cloudinary.com/`

## Step 6: Deploy to Vercel

### Backend Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these three environment variables:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret

4. Also ensure these are set:
   - `MONGO_URI` = your MongoDB connection string
   - `ADMIN_EMAIL` = admin@electrolyte.com
   - `ADMIN_PASSWORD` = Admin@123456
   - `FRONTEND_URL_PROD` = https://electrolyte-solution-5c6o.vercel.app

5. Redeploy your backend

### Frontend Deployment

1. Make sure your frontend `.env` has:
   ```env
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. Redeploy your frontend

## Step 7: Verify Deployment

1. Go to your deployed admin panel: `https://electrolyte-solution-5c6o.vercel.app/admin/login`
2. Login with admin credentials
3. Try creating a new blog post with an image
4. Check if the image displays correctly
5. The image URL should be from Cloudinary (starts with `https://res.cloudinary.com/`)

## Image Storage Locations

Images will be organized in Cloudinary folders:
- **Blogs**: `electrolyte/blogs/`
- **Photos**: `electrolyte/photos/`
- **Sponsors**: `electrolyte/sponsors/`

## Benefits

✅ **Persistent Storage**: Images survive deployments
✅ **Fast CDN**: Cloudinary serves images from global CDN
✅ **Automatic Optimization**: Images are automatically optimized
✅ **Free Tier**: 25GB storage, 25GB bandwidth/month
✅ **Image Transformations**: Resize, crop, format conversion

## Troubleshooting

### Images not uploading?
- Check Cloudinary credentials in Vercel environment variables
- Check browser console for errors
- Verify backend logs in Vercel

### Old images not showing?
- Old images stored locally won't transfer automatically
- Re-upload images through admin panel
- Or manually upload to Cloudinary and update database URLs

### Cloudinary quota exceeded?
- Free tier: 25GB storage, 25GB bandwidth/month
- Upgrade to paid plan if needed
- Or optimize images before upload

## Migration from Local Storage

If you have existing images in `/uploads` folder:

1. **Option A**: Re-upload through admin panel (recommended)
2. **Option B**: Bulk upload to Cloudinary:
   - Use Cloudinary's upload API
   - Update database URLs to point to Cloudinary
   - Script example available on request

## Support

- Cloudinary Docs: https://cloudinary.com/documentation
- Cloudinary Support: https://support.cloudinary.com/

## Next Steps

After successful deployment:
1. Test all image uploads (blogs, photos, sponsors)
2. Verify images load on frontend
3. Check Cloudinary dashboard for uploaded images
4. Monitor usage in Cloudinary dashboard
