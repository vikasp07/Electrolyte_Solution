# Certificate Management System - User Guide

## Overview
The admin panel now includes a complete certificate management system that allows you to add, edit, and delete certificates with images stored on Cloudinary.

## Features

✅ **Add Certificates** - Upload certificate images with names and descriptions
✅ **Edit Certificates** - Update certificate details and replace images
✅ **Delete Certificates** - Remove certificates (images deleted from Cloudinary)
✅ **Display Order** - Control the order certificates appear on the website
✅ **Active/Inactive** - Show or hide certificates on the public website
✅ **Cloud Storage** - All images stored on Cloudinary CDN

## How to Use

### Accessing Certificate Management

1. Login to admin panel: `https://electrolyte-solution-5c6o.vercel.app/admin/login`
2. Click on **"Certificates"** in the navigation menu
3. You'll see a list of all certificates

### Adding a New Certificate

1. Click **"Add New Certificate"** button
2. Fill in the form:
   - **Certificate Name** (required): e.g., "ISO 9001:2015"
   - **Description** (optional): e.g., "Quality Management Systems"
   - **Certificate Image** (required): Upload the certificate image (JPG, PNG, PDF)
   - **Display Order**: Lower numbers appear first (default: 0)
   - **Active**: Check to make it visible on the website
3. Click **"Create Certificate"**
4. The certificate will appear on the Certifications page

### Editing a Certificate

1. From the certificate list, click **"Edit"** on any certificate
2. Update any fields you want to change
3. To replace the image, upload a new one (old image will be deleted from Cloudinary)
4. Click **"Update Certificate"**

### Deleting a Certificate

1. From the certificate list, click **"Delete"** on any certificate
2. Confirm the deletion
3. The certificate and its image will be permanently deleted

### Managing Display Order

- Set lower numbers (0, 1, 2...) to make certificates appear first
- Set higher numbers to make them appear later
- Certificates with the same order are sorted by creation date

### Active/Inactive Status

- **Active**: Certificate is visible on the public Certifications page
- **Inactive**: Certificate is hidden from public view but still in the database

## Public Display

Certificates are displayed on:
- **URL**: `https://electrolyte-solution-5c6o.vercel.app/certifications`
- **Layout**: Grid layout with certificate images and names
- **Sorting**: By display order, then by creation date

## Technical Details

### Backend API Endpoints

- `GET /api/certificates` - Get all certificates (public)
- `GET /api/certificates/:id` - Get single certificate (public)
- `POST /api/certificates` - Create certificate (protected)
- `PUT /api/certificates/:id` - Update certificate (protected)
- `DELETE /api/certificates/:id` - Delete certificate (protected)

### Database Schema

```javascript
{
  name: String (required),
  description: String,
  image: {
    filename: String,
    url: String (Cloudinary URL)
  },
  order: Number (default: 0),
  active: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Image Storage

- **Location**: Cloudinary folder `electrolyte/certificates/`
- **Formats**: JPG, JPEG, PNG, GIF, WEBP, PDF
- **Optimization**: Automatically resized to max 1200x1600px
- **CDN**: Served from Cloudinary's global CDN

## Migration from Static Certificates

The Certifications page now fetches certificates from the API. If the API fails, it falls back to the default static certificates:
- ISO 9001:2015
- ZED Bronze

To migrate:
1. Login to admin panel
2. Add your certificates through the admin interface
3. The new certificates will automatically replace the static ones

## Tips

1. **Image Quality**: Upload high-resolution images for best quality
2. **File Size**: Cloudinary automatically optimizes images
3. **Naming**: Use clear, descriptive names (e.g., "ISO 9001:2015" not "cert1")
4. **Order**: Plan your display order before adding many certificates
5. **Testing**: Use the Active/Inactive toggle to test before making certificates public

## Troubleshooting

### Certificate not showing on website?
- Check if it's marked as "Active"
- Verify the image uploaded successfully
- Check browser console for errors

### Image not uploading?
- Ensure Cloudinary credentials are set in backend `.env`
- Check file format (must be JPG, PNG, GIF, WEBP, or PDF)
- Verify file size is reasonable (< 10MB recommended)

### Can't access admin panel?
- Verify you're logged in
- Check admin credentials
- Clear browser cache and try again

## Support

For issues or questions:
1. Check Cloudinary dashboard for uploaded images
2. Check browser console for errors
3. Check backend logs in Vercel dashboard
4. Verify environment variables are set correctly

---

**Quick Start**: Login → Certificates → Add New Certificate → Upload Image → Save
