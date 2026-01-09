# HIBRADE - Digital Solutions Landing Page

A comprehensive, professional landing page for HIBRADE - Digital Solutions, featuring pricing and portfolio sections with a modern, responsive design.

## 🌐 Live Preview

Open `index.html` in your web browser to view the landing page.

## 📁 Project Structure

```
hibrade/
├── index.html                     # Main landing page
├── pricing-web-development.html   # Web Development pricing page
├── pricing-web-management.html    # Web Management pricing page
├── pricing-seo.html               # SEO pricing page
├── pricing-social-media.html      # Social Media Management pricing page
├── style.css                      # Main stylesheet
├── script.js                      # JavaScript functionality
├── README.md                      # Project documentation
└── assets/
    ├── images/                    # Image assets
    └── icons/                     # Icon assets
```

## ✨ Features

### Main Landing Page (index.html)
- **Header & Navigation**: Fixed header with smooth scroll navigation, mobile hamburger menu
- **Hero Section**: Eye-catching headline with CTA buttons
- **About Section**: Company information, team members, and statistics
- **Services Section**: 4 service cards (Web Development, Web Management, SEO, Social Media)
- **Pricing Section**: Overview cards linking to detailed pricing pages
- **Featured Projects Carousel**: 10 project cards with status badges (Completed/On Process)
- **CTA Section**: Call-to-action with contact button
- **Contact Section**: Contact form with validation, contact info, and social links
- **Footer**: 4-column footer with About, Quick Links, Services, and Contact info

### Pricing Pages
Each service has a dedicated pricing page with:
- 3 pricing tiers (1M, 2M, 3M IDR)
- Feature lists for each tier
- Back navigation to main pricing
- Responsive design

## 🎨 Design System

### Color Palette
- **Primary**: #0066CC (Blue)
- **Primary Dark**: #0052A3
- **Accent**: #E8F0FF (Light Blue)
- **Text**: #1A1A1A (Dark Gray)
- **Background**: #FAFAFA
- **Completed Status**: #10B981 (Green)
- **On Process Status**: #F59E0B (Orange/Yellow)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Responsive Breakpoints
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML/CSS/JS

### Installation
1. Clone or download the project files
2. Open `index.html` in your browser
3. Navigate through the page using the navigation menu

## 📱 Responsive Behavior

### Mobile (320px - 480px)
- Services grid: 2x2
- Pricing grid: 2x2
- Footer: Stacked (1 column)
- Carousel: Full width with swipe

### Tablet (481px - 768px)
- Services grid: 2x2
- Pricing grid: 2x2
- Footer: 2 columns
- Carousel: 2 cards visible

### Desktop (769px+)
- Services grid: 4 columns
- Pricing grid: 4 columns
- Footer: 4 columns
- Carousel: 3 cards visible

## 🛠 Technical Features

### HTML5
- Semantic HTML structure
- SEO-optimized meta tags
- Schema.org markup for Organization
- ARIA labels for accessibility
- Open Graph tags for social sharing

### CSS3
- CSS Variables for theming
- CSS Grid for layouts
- Flexbox for alignment
- CSS custom properties
- Smooth transitions and animations
- Mobile-first approach

### JavaScript
- Hamburger menu toggle with animation
- Smooth scroll navigation
- Project carousel with:
  - Previous/Next navigation
  - Dot indicators
  - Touch/swipe support
  - Auto-rotation (6 second interval)
  - Pause on hover
- Form validation
- Active navigation highlighting
- Scroll reveal animations
- Parallax effect on hero

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 SEO Optimization

The landing page includes:
- Meta title and description
- Keywords meta tag
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Schema.org Organization markup
- Semantic HTML5
- Proper heading hierarchy (H1, H2, H3)
- Alt text for images

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios (WCAG AA)
- Focus indicators
- Semantic HTML structure
- Skip links (via smooth scroll)

## 📦 Performance

- Minimal external dependencies (Google Fonts only)
- CSS animations with hardware acceleration
- Passive event listeners
- Efficient DOM manipulation
- No jQuery or heavy frameworks

## 🔧 Customization

### Colors
Edit CSS variables in `:root`:
```css
:root {
    --primary: #0066CC;
    --primary-dark: #0052A3;
    --accent: #E8F0FF;
    /* ... */
}
```

### Services
Modify the service cards in `index.html`:
```html
<a href="pricing-[service].html" class="service-card" data-service="[service]">
    <!-- Service content -->
</a>
```

### Projects
Add/remove project cards in the carousel track in `index.html`.

## 📄 License

This project is for demonstration purposes. Feel free to use and modify for your own projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please contact:
- **Email**: info@hibrade.com
- **Phone**: +62 812 3456 7890

---

Built with ❤️ by HIBRADE Team
