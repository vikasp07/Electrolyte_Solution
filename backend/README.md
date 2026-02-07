# Electrolyte Backend

Backend API for Electrolyte Solutions website.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env` file.

3. Start MongoDB.

4. Run the server:
   ```bash
   npm start
   ```

   Or for development:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- POST /api/auth/login - Admin login

### Photos
- GET /api/photos - Get photos (public)
- POST /api/photos - Upload photo (admin)
- PUT /api/photos/:id - Update photo (admin)
- DELETE /api/photos/:id - Delete photo (admin)

### Sponsors
- GET /api/sponsors - Get sponsors (public)
- POST /api/sponsors - Create sponsor (admin)
- PUT /api/sponsors/:id - Update sponsor (admin)
- DELETE /api/sponsors/:id - Delete sponsor (admin)

### Contact
- POST /api/contact - Submit contact form
- GET /api/contact - Get contact submissions (admin)

### Health
- GET /api/health - Health check