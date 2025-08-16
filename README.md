# Sustainable Investment Group (SIG) Website

A professional, responsive website for UCSD's Sustainable Investment Group built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional Sustainable Theme**: Green color scheme inspired by the SIG logo
- **5 Main Pages**:
  - Home Page with hero section, stats, and overview
  - About Us with mission, values, and history
  - Events Calendar with filtering and upcoming events
  - Member Directory with search and filtering
  - Blog with articles and Instagram feed integration
- **Interactive Elements**:
  - Mobile navigation menu
  - Event and member filtering
  - Modal popups for detailed information
  - Newsletter subscription
  - Back-to-top button
  - Smooth scrolling and animations

## Setup Instructions

### 1. Logo Setup
Replace the placeholder `assets/sig-logo.png` with your actual SIG logo:
- Recommended format: PNG with transparent background
- Recommended size: 200x60px for optimal display
- The logo should match the green theme colors

### 2. Images
Add images to the following directories:
- `assets/` - Main images (hero, mission, etc.)
- `assets/members/` - Member profile photos
- `assets/blog/` - Blog post featured images
- `assets/instagram/` - Instagram feed placeholder images

Recommended image sizes:
- Hero images: 800x600px
- Member photos: 300x300px (square)
- Blog images: 600x400px
- Instagram posts: 400x400px (square)

### 3. Content Customization
Update the following content to match your organization:
- Contact email: Change `sustainableinvestment@ucsd.edu` throughout the site
- Member information in `members.html`
- Event details in `events.html`
- Blog posts in `blog.html`
- Social media links in the footer

### 4. Instagram Feed Integration
To integrate a real Instagram feed:
1. Sign up for Instagram Basic Display API
2. Replace the placeholder Instagram section in `blog.html`
3. Update the JavaScript in `scripts/blog.js` to fetch real Instagram posts

### 5. GitHub Pages Deployment

#### Option A: Direct Upload
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

#### Option B: Using Git
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: SIG website"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/sig-website.git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in the repository settings.

## File Structure

```
SIG Website/
├── index.html              # Home page
├── about.html              # About page
├── events.html             # Events page
├── members.html            # Members page
├── blog.html               # Blog page
├── styles/
│   └── main.css           # Main stylesheet
├── scripts/
│   ├── main.js            # Main JavaScript
│   ├── events.js          # Events page functionality
│   ├── members.js         # Members page functionality
│   └── blog.js            # Blog page functionality
├── assets/
│   ├── sig-logo.png       # Organization logo
│   ├── members/           # Member profile photos
│   ├── blog/              # Blog post images
│   └── instagram/         # Instagram feed images
└── README.md              # This file
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Customization

### Colors
The color scheme is defined in CSS custom properties in `styles/main.css`:
- Primary Green: `#4a9b3c`
- Secondary Green: `#7cb068`
- Accent Green: `#a3d492`

### Typography
- Primary font: Inter (Google Fonts)
- Fallback: System fonts

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance Optimizations

- Lazy loading for images
- CSS and JavaScript minification ready
- Efficient DOM queries
- Intersection Observer for animations
- Optimized asset loading

## SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Alt text for images
- Clean URL structure

## Accessibility

- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios
- Screen reader friendly
- Focus indicators

## Contact

For questions about this website, contact the Sustainable Investment Group at sustainableinvestment@ucsd.edu

## License

This website template is provided for educational and organizational use. Customize as needed for your organization.
