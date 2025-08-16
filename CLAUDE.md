# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for UCSD's Sustainable Investment Group (SIG) built with HTML, CSS, and vanilla JavaScript. The site features:

- **5 main pages**: index.html (home), about.html, events.html, members.html, blog.html
- **Responsive design** with mobile-first approach
- **Dynamic member management** via JSON data files
- **Interactive features**: filtering, search, modals, animations
- **Professional green theme** inspired by sustainability

## Architecture & Data Management

### Member Data System
- **Data source**: `data/members.json` contains all member information in structured format
- **Three categories**: executiveBoard, generalMembers, alumni
- **Dynamic rendering**: JavaScript loads JSON and generates member cards dynamically
- **Photo management**: Member photos stored in `assets/members/` with standardized naming (firstname-lastname.jpg)
- **Filtering system**: Members can be filtered by year/category and searched by name/major/interest

### JavaScript Structure
- **Main scripts**:
  - `scripts/main.js`: Core functionality (navigation, animations, notifications)
  - `scripts/members.js`: Member page specific features (filtering, search, modals)
  - `scripts/events.js`: Events page functionality
  - `scripts/blog.js`: Blog page functionality
  - `scripts/member-loader.js`: Dynamic member loading utilities

### Key Features Implementation
- **Mobile navigation**: Hamburger menu with smooth animations
- **Intersection Observer**: For scroll-based animations and lazy loading
- **Modal system**: Reusable modal components for member details and forms
- **Responsive design**: CSS Grid and Flexbox with breakpoints at 768px and 1024px
- **Performance optimizations**: Lazy loading, efficient DOM queries, CSS/JS ready for minification

## Content Management

### Adding/Updating Members
1. **Update `data/members.json`** with new member information
2. **Add member photos** to `assets/members/` folder (300x300px, <500KB)
3. **Follow naming convention**: firstname-lastname.jpg (lowercase, hyphens)
4. **Required fields vary by section**:
   - Executive Board: name, role, major, year, image, linkedin
   - General Members: name, major, year, interest, image, category
   - Alumni: name, role, company, year, image, linkedin

### Deployment
- **GitHub Pages ready**: Direct deployment from main branch
- **Static hosting compatible**: No server-side requirements
- **Asset optimization**: Images should be optimized before upload

## Development Workflow

### File Structure
```
/
├── index.html, about.html, events.html, members.html, blog.html
├── styles/main.css
├── scripts/
│   ├── main.js (core functionality)
│   ├── members.js (member page features)
│   ├── events.js, blog.js, member-loader.js
├── assets/
│   ├── sig-logo.png
│   ├── members/ (member photos)
│   ├── blog/, instagram/ (content images)
├── data/
│   └── members.json (member data)
└── tools/
    └── spreadsheet-converter.html (member management tool)
```

### CSS Architecture
- **CSS Custom Properties**: Centralized theming in main.css
- **Color scheme**: Primary green (#4a9b3c), secondary (#7cb068), accent (#a3d492)
- **Typography**: Inter font family from Google Fonts
- **Responsive breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

### JavaScript Patterns
- **Event delegation**: Efficient event handling for dynamic content
- **Module pattern**: Each page script handles its own functionality
- **ES6+ features**: Arrow functions, template literals, async/await ready
- **Error handling**: Graceful fallbacks for missing images/data

## Testing & Validation

### Content Validation
- **JSON validation**: Use jsonlint.com to validate members.json
- **Image validation**: Ensure all referenced images exist in assets/
- **Link validation**: Check all internal and external links

### Browser Testing
- **Supported browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile testing**: Test on actual devices for touch interactions
- **Performance**: Monitor loading times, especially for image-heavy pages

## Common Tasks

### Member Management
- **Adding new members**: Update JSON file and add photo to assets/members/
- **Moving to alumni**: Transfer from generalMembers to alumni section
- **Updating roles**: Modify JSON entries and rebuild if necessary

### Content Updates
- **Blog posts**: Add new entries to blog.html or implement dynamic blog system
- **Events**: Update events.html with new event information
- **Contact info**: Update email addresses throughout site (currently sustainableinvestment@ucsd.edu)

### Styling Changes
- **Color scheme**: Modify CSS custom properties in main.css
- **Layout**: Update CSS Grid/Flexbox properties
- **Typography**: Change font imports and CSS font-family declarations

## Security & Best Practices

- **No sensitive data**: All content is public-facing
- **Image optimization**: Compress images before adding to repository
- **Accessibility**: Maintain ARIA labels, keyboard navigation, screen reader support
- **SEO**: Keep semantic HTML structure and meta tags updated
- **Performance**: Monitor bundle size and optimize assets regularly