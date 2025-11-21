# InfinityX Engineering Consultancy Website

A modern, premium portfolio website for InfinityX Engineering Consultancy, inspired by high-end architecture and design studios. Built with clean HTML5, CSS3, and vanilla JavaScript.

## 🎨 Design Features

- **Minimal & Clean**: Plenty of white space, strong typography, and large sections
- **Smooth Animations**: Fade-in and slide-up animations on scroll
- **Dark & Light Mix**: Dark hero sections with lighter content sections
- **Premium Color Palette**: Deep blue/petrol primary, cyan/teal accent, off-white backgrounds
- **Fully Responsive**: Mobile-first design for all screen sizes

## 📁 Project Structure

```
InfinityX1/
├── index.html              # Home page
├── about.html              # About page
├── services.html            # Services page
├── projects.html            # Projects portfolio page
├── contact.html             # Contact page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript for interactions
│   └── images/             # Image assets (add your images here)
└── README.md               # This file
```

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Local Server (Recommended)**: For best results, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Then visit: http://localhost:8000
   ```

## 📱 Features

### Navigation
- Fixed header with smooth scroll effects
- Mobile hamburger menu
- Active page highlighting
- Smooth anchor link scrolling

### Animations
- Scroll-triggered fade-in animations
- Smooth transitions and hover effects
- Parallax-style hero section

### Forms
- Contact form with client-side validation
- Real-time field validation
- Success/error messaging
- Email format validation

### Interactive Elements
- FAQ accordion with smooth expand/collapse
- Project cards with hover effects
- Service cards with detailed information
- Responsive image placeholders

## 🎨 Color Palette

- **Primary**: `#0f172a` (Deep blue/petrol)
- **Accent**: `#06b6d4` (Cyan/teal)
- **Background**: `#f3f4f6` (Off-white/light gray)
- **Text**: `#1e293b` (Dark gray)

## 📄 Pages Overview

### Home (index.html)
- Full-screen hero section
- Key stats section
- Services preview
- Featured projects
- Process/How we work
- Testimonials
- Call-to-action

### Services (services.html)
- Detailed service descriptions
- Categorized services (Design, Project Management, Digital & BIM, Specialized)
- FAQ section with accordion

### Projects (projects.html)
- Project portfolio grid
- Detailed project information
- Project types and locations
- Project details and scope

### About (about.html)
- Mission and vision
- Core values
- Leadership team
- Company timeline/journey

### Contact (contact.html)
- Contact information
- Working hours
- Contact form with validation
- Social media links

## 🔧 Customization

### Update Content
All content is clearly marked and easy to replace. Look for:
- Service descriptions in `services.html`
- Project details in `projects.html`
- Team information in `about.html`
- Company information in footer across all pages

### Update Colors
Modify CSS variables in `assets/css/style.css`:
```css
:root {
    --color-primary: #0f172a;
    --color-accent: #06b6d4;
    --color-background: #f3f4f6;
    /* ... */
}
```

### Add Images
1. Add your images to `assets/images/` folder
2. Replace placeholder divs with `<img>` tags
3. Update `src` attributes to point to your images

### Update Contact Information
Edit contact details in:
- Footer section (all pages)
- Contact page
- Update email: `info@infinityxuae.com`
- Update phone: `+971 5X XXX XXXX`

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive from 320px to 1920px+
- Mobile-first approach

## ⚡ Performance

- Optimized CSS with efficient selectors
- Vanilla JavaScript (no dependencies)
- Smooth scroll performance with throttling
- Intersection Observer for animations
- Lazy loading ready (add `data-src` to images)

## 🎯 SEO Features

- Semantic HTML5 structure
- Proper heading hierarchy
- Meta descriptions on all pages
- Alt text ready for images
- Clean URL structure

## 📝 Notes

- Forms show success messages but don't send data (backend integration needed)
- Image placeholders use gradient backgrounds (replace with actual images)
- All animations use CSS transitions for smooth performance
- Mobile menu closes on link click or outside click

## 🔄 Future Enhancements

- Backend form submission integration
- Image lazy loading implementation
- Blog/news section
- Project detail modals
- Multi-language support
- Advanced filtering for projects

## 📄 License

This project is created for InfinityX Engineering Consultancy. All rights reserved.

---

**Built with precision and vision** ✨
