# React Home Component - Complete Implementation Guide

## Project Structure

```
src/
├── components/
│   └── Home/
│       ├── Home.jsx                    # Main Home component
│       ├── Home.css                    # Main styles
│       ├── sections/
│       │   ├── HeroBanner.jsx          # Hero banner section
│       │   ├── MissionVisionValues.jsx # MVV cards section
│       │   ├── SolutionsSlider.jsx     # Solutions carousel
│       │   ├── UseCasesSlider.jsx      # Use cases section
│       │   └── OurServices.jsx         # Services carousel
│       └── styles/
│           ├── HeroBanner.css
│           ├── MissionVisionValues.css
│           ├── SolutionsSlider.css
│           ├── UseCasesSlider.css
│           └── OurServices.css
```

## Installation & Usage

### 1. Import Home Component

```jsx
import Home from './components/Home/Home';

function App() {
  return (
    <div>
      {/* Navbar */}
      <Home />
      {/* Footer */}
    </div>
  );
}

export default App;
```

### 2. Install Required Dependencies

```bash
npm install
# or
yarn install
```

**Required Libraries:**
- React (v16.8+)
- React Icons (for icon rendering) - Optional but recommended

```bash
npm install react-icons
```

### 3. Ensure Remix Icon Font is Available

Add to your main `index.html` or load via CDN in your main component:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" />
```

Or install via npm:

```bash
npm install remixicon
```

Then import in your main `index.js`:

```javascript
import 'remixicon/fonts/remixicon.css';
```

## Component Overview

### 1. **Home.jsx** - Main Container
- Manages scroll state for parallax effects
- Imports and renders all section components
- Sets up main page structure

### 2. **HeroBanner.jsx** - Hero Section
**Features:**
- Animated hero banner with rotating words
- Auto-rotating words every 3 seconds
- Statistics counters (Customers, Partners, Deployments, Countries)
- Parallax scrolling effect
- CTA button with gradient

**Props:** None

**State:**
```javascript
- rotatingWordIndex: tracks current rotating word
- scrollY: parallax scroll position
```

### 3. **MissionVisionValues.jsx** - MVV Cards
**Features:**
- 3 card grid (Mission, Vision, Values)
- Hover animations with shimmer effect
- Image zoom on hover
- Responsive layout

**Sub-component:**
- `MVVCard.jsx` - Individual card component

### 4. **SolutionsSlider.jsx** - Solutions Carousel
**Features:**
- Auto-sliding carousel (5 second interval)
- Manual navigation (Previous/Next buttons)
- Dot indicators
- 8 solution slides
- Smooth transitions

**State:**
```javascript
- currentSlide: active slide index
- autoPlay: auto-play toggle
```

### 5. **UseCasesSlider.jsx** - Use Cases Section
**Features:**
- Auto-sliding carousel (6 second interval)
- Manual navigation
- Social media icons
- Slide counter (01/05)
- Scroll bounce animation
- 5 use case slides

**State:**
```javascript
- currentSlide: active slide index
- autoPlay: auto-play toggle
```

### 6. **OurServices.jsx** - Services Carousel
**Features:**
- Horizontal scrollable carousel
- Service cards with images
- Icon overlay
- Smooth scroll behavior
- 6 service items

**Sub-component:**
- `ServiceCard.jsx` - Individual service card

## Styling System

### CSS Variables (from Home.css)
```css
--accent-color: #0E17FF
--alternate-color: #750de0
--dark-color: #000
--light-color: #fff
--body-font: 'Plus Jakarta Sans', Arial, sans-serif
--heading-font: 'Space Grotesk', Arial, sans-serif
--transition: all 0.3s ease
```

### Responsive Breakpoints
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** 576px - 767px
- **Small Mobile:** < 576px

## Image Assets Required

Place these images in your `public/images/` folder:

```
images/
├── bottom_black_01_1.png
├── bottom_black.png
├── bottom_black_01.png
├── bottom_black_02-1.png
├── bottom_array.png
├── mission-white-160x160.png
├── vission-white-160x160.png
├── value-white-160x160.png
├── mission-vision.jpg
├── Industry-based-Use-Cases.jpg
├── firmware-2.jpg
├── Secure-Transfer-1.jpg
├── Browser-isolation-1.jpg
├── AI-built-data-1.jpg
├── Network-Segmentation.jpg
├── insider-risk.jpg
├── Data-Diode.jpg
├── Cross-domain.jpg
├── Secure-File-Transfer-and-Syslog-Replication-Using-Owl-Data-Diodes.jpg
├── OSI-PI-Historian-Replication-Using-OWL-Data-Diodes.jpg
├── Secure-OPC-Data-Replication-Using-Owl-Data-Diodes.jpg
├── Database-Replication-Using-Data-Diodes.jpg
├── Securing-Critical-CCTV-Networks-and-Enterprise.jpg
├── Resident-Engineer.jpg
├── Training-Partner.jpg
├── Consulting-Service.jpg
├── Annual-maintainence.jpg
├── Cyber-Lab.jpg
└── Gap-Assessment-2.jpg
```

## Router Integration

If using React Router, update your routes:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Other routes */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

## Customization Guide

### Change Primary Color
Update CSS variables in `Home.css`:
```css
:root {
  --accent-color: #YourColor;
  --alternate-color: #YourColor2;
}
```

### Adjust Animation Speed
- **Hero Banner:** Modify `useEffect` interval in `HeroBanner.jsx` (default: 3000ms)
- **Solutions Slider:** Modify interval in `SolutionsSlider.jsx` (default: 5000ms)
- **Use Cases Slider:** Modify interval in `UseCasesSlider.jsx` (default: 6000ms)

### Change Slide Count
Modify the `slides` or `useCases` arrays in respective component files.

### Update Links
Replace navigation links (e.g., `/Solution`, `/Services`, `/AboutUs`) with your actual routes.

## Performance Optimization

### Lazy Loading
```jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./components/Home/Home'));

<Suspense fallback={<div>Loading...</div>}>
  <Home />
</Suspense>
```

### Image Optimization
Use `loading="lazy"` on all images (already implemented).

### CSS Optimization
- All animations use CSS transforms and opacity (GPU accelerated)
- No heavy JavaScript animations
- Minimal re-renders with proper state management

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

## Known Issues & Solutions

### Issue: Images not loading
**Solution:** Ensure image paths in components match your public folder structure.

### Issue: Animations janky on scroll
**Solution:** Enable hardware acceleration in CSS or reduce animation complexity.

### Issue: Carousel doesn't auto-play
**Solution:** Ensure `autoPlay` state is initialized to `true`.

## Future Enhancements

- [ ] Add intersection observer for scroll animations
- [ ] Implement swipe gestures for mobile carousels
- [ ] Add analytics tracking
- [ ] Implement SEO metadata
- [ ] Add accessibility ARIA labels (partially done)

## Support & Contact

For component issues or customization requests, contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** December 3, 2025  
**React Version Required:** 16.8+  
**License:** MIT
