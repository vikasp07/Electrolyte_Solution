# About Us Component - React Implementation

Complete React.js implementation of the About Us page from the Oregon Systems website template. This component excludes the navbar and footer, focusing purely on the About Us content sections with pixel-perfect UI matching the original design.

## Project Structure

```
src/components/AboutUs/
├── AboutUs.jsx                          # Main component file
├── AboutUs.css                          # Global styles and animations
├── sections/
│   ├── HeroBanner.jsx                   # Hero banner with parallax
│   ├── CompanyOverview.jsx              # Company mission, vision, values
│   ├── WhyOregonSystems.jsx             # Three highlight cards
│   ├── CoreValues.jsx                   # Four core value propositions
│   └── OurProcess.jsx                   # Six-step process timeline
└── styles/
    ├── HeroBanner.css
    ├── CompanyOverview.css
    ├── WhyOregonSystems.css
    ├── CoreValues.css
    └── OurProcess.css
```

## Components Overview

### 1. AboutUs.jsx (Main Component)
The root container component that:
- Manages scroll state for parallax effects
- Orchestrates all five section components
- Handles scroll event listeners
- Applies responsive layout

**Key Features:**
- Scroll event tracking for parallax animations
- Responsive container structure
- Proper component composition

### 2. HeroBanner.jsx
Hero banner section with parallax scroll effect.

**Key Features:**
- Dynamic parallax background movement (0.6x scroll speed)
- Centered headline and subtitle
- Full-width background with gradient overlay
- Responsive sizing for all breakpoints
- Smooth fade-in animations

**Props:**
- `scrollY`: Current window scroll position (for parallax calculation)

### 3. CompanyOverview.jsx
Company overview with mission, vision, and values cards.

**Key Features:**
- Two-column layout (content + sidebar)
- Responsive grid system
- Three value proposition cards with icons
- Hover animations and transitions
- Justified text alignment for body content
- Icon-based value indicators

**Content Sections:**
- Company history and mission statement
- 5 paragraphs of company overview
- 3 value cards: Mission, Vision, Values

### 4. WhyOregonSystems.jsx
Three-column highlight section showcasing company differentiators.

**Key Features:**
- Image cards with overlay content
- Hover zoom and opacity effects
- Gradient overlay on images
- Responsive card layout (3 cols → 2 cols → 1 col)
- Smooth transitions and animations

**Cards:**
1. Expertise You Can Trust
2. A Tailored Approach
3. Global Technology, Local Support

### 5. CoreValues.jsx
Four-column core values/reasons section.

**Key Features:**
- 2x2 grid layout (responsive)
- Icon-based value items
- Hover scaling and shadow effects
- Gradient borders and backgrounds
- Left-aligned content

**Values:**
1. Comprehensive Gap Analysis
2. Industry-Driven Innovation
3. Trusted Partnerships
4. Local Expertise, Global Reach

### 6. OurProcess.jsx
Six-step process timeline visualization.

**Key Features:**
- Responsive grid layout (3 cols → 2 cols → 1 col)
- Icon-based step indicators
- Connected timeline lines (desktop only)
- Hover animations on steps
- Step number and title display

**Process Steps:**
1. Discover Phase
2. Analyzing Phase
3. Designing Phase
4. Testing Phase
5. Deployment Phase
6. Support Phase

## CSS Architecture

### Global Styles (AboutUs.css)
- CSS variables for colors and spacing
- Reusable animations (fadeInUp, slideInLeft)
- Typography definitions
- Responsive breakpoints

### Section-Specific Styles
Each section has its own CSS file with:
- Component-specific styling
- Responsive media queries
- Hover states and transitions
- Animation sequences

### Color Scheme
```css
--accent-color: #0E17FF (Blue)
--alternate-color: #750de0 (Purple)
--dark-bg: #000
--light-text: #fff
--gray-text: #999
```

### Responsive Breakpoints
- 1200px (Large Desktop)
- 1024px (Desktop)
- 768px (Tablet)
- 576px (Mobile)

## Installation & Integration

### 1. Copy Component Files
Copy the entire `AboutUs` folder to your project:
```
src/components/AboutUs/
```

### 2. Import Remix Icons
Add to your main HTML file or install package:
```bash
npm install remixicon
```

Then import in your component or main CSS:
```css
@import url('https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css');
```

### 3. Import Fonts
Add to your main CSS or HTML head:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Space+Grotesk:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&subset=latin,latin-ext&display=swap" rel="stylesheet">
```

### 4. Update Image Paths
Update image paths in components to match your project structure:
- `WhyOregonSystems.jsx`: Update `/images/` paths
- `HeroBanner.jsx`: Update background image path

### 5. Router Integration
Add to your React Router configuration:

```jsx
import AboutUs from './components/AboutUs/AboutUs';

const routes = [
  // ... other routes
  {
    path: '/about-us',
    element: <AboutUs />
  }
];
```

## Customization Guide

### Changing Colors
Edit CSS variables in `AboutUs.css`:
```css
:root {
  --accent-color: #0E17FF;
  --alternate-color: #750de0;
  --dark-bg: #000;
}
```

### Modifying Content
Edit text content in each section component directly in JSX.

### Adjusting Spacing
Modify padding/margin values in respective CSS files:
```css
.section {
  padding: 80px 0; /* Adjust as needed */
}
```

### Animation Timing
Modify animation delays and duration in CSS files:
```css
@keyframes fadeInUp {
  /* Adjust timing and transform as needed */
}
```

### Font Sizes
Adjust font-size values in the CSS files for different breakpoints.

## Performance Optimization

### Lazy Loading Images
Consider implementing lazy loading for the WhyOregonSystems images:
```jsx
<div 
  className="highlight-image" 
  style={{ backgroundImage: `url(${highlight.image})` }}
  loading="lazy"
>
```

### Code Splitting
Implement React.lazy() for component splitting if needed:
```jsx
const AboutUs = React.lazy(() => import('./components/AboutUs/AboutUs'));
```

### Memoization
Use React.memo() to prevent unnecessary re-renders:
```jsx
export default React.memo(AboutUs);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Summary

✅ **Responsive Design** - Fully responsive from mobile to desktop
✅ **Animations** - Smooth fade-in, slide, and hover animations
✅ **Parallax Effect** - Scroll-based parallax in hero banner
✅ **Dark Theme** - Modern dark design matching original
✅ **Icon Support** - Remix Icons integration
✅ **Gradient Effects** - Gradient overlays and borders
✅ **Hover States** - Interactive hover animations
✅ **Typography** - Professional font stack (Space Grotesk, Plus Jakarta Sans)
✅ **Accessibility** - Semantic HTML and proper color contrast
✅ **Performance** - Optimized CSS and minimal dependencies

## Image Assets Required

Place these images in your `public/images/` directory:
- `Expertise-You-Can-Trust.jpg` (640x362px)
- `A-Tailored-Approach.jpg` (640x362px)
- `Global-Technology-Local-Support.jpg` (640x362px)
- `about-banner.jpg` (background image for hero)

## Dependencies

- React 16.8+ (Hooks)
- Remix Icons 3.5.0+
- Google Fonts (Space Grotesk, Plus Jakarta Sans)

## No External Dependencies for Styling

- Pure CSS (no Bootstrap, Tailwind, or CSS-in-JS required)
- CSS Variables for theming
- CSS Grid and Flexbox for layouts
- CSS animations and transitions

## Responsive Mobile Optimization

### Mobile-First Approach
All sections are optimized for mobile-first development with progressive enhancement.

### Touch-Friendly
- Adequate button/clickable area sizes
- Touch-optimized hover states
- Mobile-appropriate spacing

### Performance on Mobile
- Optimized animation performance
- Minimal DOM elements
- Efficient CSS selectors

## Production Checklist

- [ ] Update image paths to your CDN/server
- [ ] Customize brand colors if needed
- [ ] Test across all target browsers
- [ ] Optimize image sizes
- [ ] Verify font loading
- [ ] Test responsive breakpoints
- [ ] Verify scroll performance
- [ ] Test accessibility with screen readers
- [ ] Minify CSS and JS for production
- [ ] Set up proper error boundaries

## Support and Maintenance

For updates or modifications to individual sections:

1. **Hero Banner** - Modify `sections/HeroBanner.jsx` and `styles/HeroBanner.css`
2. **Company Overview** - Modify `sections/CompanyOverview.jsx` and `styles/CompanyOverview.css`
3. **Why Oregon Systems** - Modify `sections/WhyOregonSystems.jsx` and `styles/WhyOregonSystems.css`
4. **Core Values** - Modify `sections/CoreValues.jsx` and `styles/CoreValues.css`
5. **Our Process** - Modify `sections/OurProcess.jsx` and `styles/OurProcess.css`

## Version History

- **v1.0.0** - Initial React conversion from HTML template
  - All 5 sections implemented
  - Responsive design for all breakpoints
  - Complete CSS styling
  - Parallax scroll effects
  - Hover animations

---

**Created**: December 2024
**Framework**: React.js
**Styling**: Pure CSS with CSS Variables
**Responsive**: Mobile, Tablet, Desktop
