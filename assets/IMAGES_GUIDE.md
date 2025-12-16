# 📸 Images Guide for Portfolio

## Image Requirements

### Profile Photo
**Location**: `assets/images/profile.jpg` or `profile.png`
- **Recommended Size**: 500x500px (square)
- **Format**: JPG or PNG
- **Background**: Professional or plain background
- **File Size**: < 500KB

### Project Screenshots
**Location**: `assets/projects/`

#### 1. Smart Time Table Scheduler
- **File**: `timetable-scheduler.jpg`
- **Size**: 1200x800px (landscape)
- Show the main dashboard or timetable view

#### 2. Coding Challenge Analyzer  
- **File**: `coding-analyzer.jpg`
- **Size**: 1200x800px (landscape)
- Show the analytics dashboard with graphs

#### 3. Weather Forecast App
- **File**: `weather-app.jpg`
- **Size**: 1200x800px (landscape)
- Show the main weather interface

### Achievement/Hackathon Photos
**Location**: `assets/images/achievements/`
- Hack-O-Octo 3.0 winning moment
- MEDIA Hackathon certificate/team photo
- **Size**: 800x600px minimum

## How to Add Images

### 1. Profile Photo
Open `index.html` and find this section (around line 78):
```html
<div class="profile-img">
    <i class="fas fa-user"></i>
</div>
```

Replace with:
```html
<div class="profile-img">
    <img src="assets/images/profile.jpg" alt="Aayush Kumar Shrivastav" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### 2. Project Images
In each project card, replace the icon section:

**Before:**
```html
<div class="project-icon">
    <i class="fas fa-calendar-alt"></i>
</div>
```

**After:**
```html
<div class="project-image">
    <img src="assets/projects/timetable-scheduler.jpg" alt="Smart Time Table Scheduler">
</div>
```

Add this CSS to `styles.css`:
```css
.project-image {
    width: 100%;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 1.5rem;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
    transform: scale(1.1);
}
```

### 3. Achievement Photos
Add below achievement descriptions:
```html
<div class="achievement-photo">
    <img src="assets/images/achievements/hackoocto.jpg" alt="Hack-O-Octo Winner">
</div>
```

## Quick Tips
- Use tools like TinyPNG.com to compress images
- Keep total image size under 5MB for fast loading
- Use descriptive alt text for accessibility
- Consider using WebP format for better compression

## Image Sources
- **Your Photo**: Professional headshot or casual professional
- **Project Screenshots**: Take from your actual projects
- **Achievements**: Certificates, winning moments, team photos
- **Placeholder**: Use [UI Faces](https://uifaces.co/) or [Unsplash](https://unsplash.com/) temporarily

## Example File Structure
```
assets/
├── images/
│   ├── profile.jpg
│   └── achievements/
│       ├── hackoocto.jpg
│       └── media-hackathon.jpg
└── projects/
    ├── timetable-scheduler.jpg
    ├── coding-analyzer.jpg
    └── weather-app.jpg
```
