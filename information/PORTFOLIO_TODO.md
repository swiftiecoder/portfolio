# Portfolio Personalization Checklist

This file will help you track the steps to make this portfolio template your own.

## Plan of Action:

### 1. Update Personal Information & Text Content
- [ ] **Views & Templates (`views/`, `templates/`, `app.vue`):**
    - [ ] `views/Bio.vue`: Update biography text and personal details.
    - [ ] `views/Nossaflex.vue`: Update project details (likely a placeholder project).
    - [ ] `views/Resume.vue`: Update text related to your resume.
    - [ ] `views/Wwdc2021.vue`, `Wwdc2022.vue`, `Wwdc2023.vue`: Update or replace these project/event pages.
    - [ ] `templates/AppGrid.vue`: Check for any hardcoded text.
    - [ ] `templates/FileWindow.vue`: Check for any hardcoded text.
    - [ ] `templates/ImagePreviewWindow.vue`: Check for any hardcoded text.
    - [ ] `templates/Mail.vue`: Update email address and related text.
    - [ ] `templates/Navbar.vue`: Check for any hardcoded text or links.
    - [ ] `templates/StartMenu.vue`: Check for any hardcoded text or links.
    - [ ] `templates/Window.vue`: Check for any hardcoded text.
    - [ ] `app.vue`: Review for any global text, titles, or metadata.
- [ ] **Stores (`stores/`):**
    - [ ] `stores/mail.js`: Update any placeholder email data.
    - [ ] `stores/photos.js`: Update any placeholder photo data or links.
    - [ ] `stores/windows.js`: Review for any text that needs personalization.
- [ ] **Configuration & Metadata:**
    - [ ] `README.md`: Update with your project information.
    - [ ] `package.json`: Update author name, description, repository links, etc.
    - [ ] `nuxt.config.ts`: Update site title, meta descriptions, and any other personalizable config.

### 2. Replace Images & Assets
- [ ] **Biography Image:**
    - [ ] Replace `assets/Biography/self.jpg` with your profile picture.
- [ ] **Project & General Images:**
    - [ ] Review and replace images in `assets/iPhone-Icons/`.
    - [ ] Review and replace images in `assets/Nossaflex/` (or remove if project is replaced).
    - [ ] Review and replace images in `assets/win95Icons/`.
    - [ ] Review and replace images in `assets/Wwdc/` (or remove if events are not relevant).
    - [ ] Replace `assets/sidebar-image.png` if desired.
    - [ ] Replace `assets/speakers.png` if desired.
    - [ ] Replace `assets/win95.png` if desired.
- [ ] **Resume File:**
    - [ ] Replace `public/files/don_chia_resume.pdf` with your resume. (If you use a different filename, update links in `views/Resume.vue` or other relevant files).
- [ ] **Favicon:**
    - [ ] Replace `public/favicon.ico` with your own favicon.

### 3. Customize Links
- [ ] **Social Media & External Links:**
    - [ ] Check all `.vue` files (especially in `views/` and `templates/`) for hardcoded URLs (e.g., GitHub, LinkedIn, Twitter, project demo links) and update them to your own.

### 4. Review and Refine
- [ ] **Styling (`assets/css/`):**
    - [ ] Review `assets/css/main.css` and other CSS files. Adjust colors, fonts, and layout as desired.
- [ ] **Functionality & Testing:**
    - [ ] Thoroughly click through every page and interactive element.
    - [ ] Test all links to ensure they go to the correct places.
    - [ ] Check that all images load correctly.
    - [ ] View the portfolio on different screen sizes (desktop, tablet, mobile) to ensure responsiveness.

## Files to Check/Modify (Summary):

**Content & Structure:**
- `app.vue`
- `views/Bio.vue`
- `views/Nossaflex.vue`
- `views/Resume.vue`
- `views/Wwdc2021.vue`
- `views/Wwdc2022.vue`
- `views/Wwdc2023.vue`
- `templates/*.vue` (all files)
- `stores/*.js` (all files)

**Configuration:**
- `nuxt.config.ts`
- `package.json`
- `README.md`

**Assets:**
- `assets/Biography/self.jpg`
- `assets/iPhone-Icons/*`
- `assets/Nossaflex/*`
- `assets/win95Icons/*`
- `assets/Wwdc/*`
- `assets/sidebar-image.png`
- `assets/speakers.png`
- `assets/win95.png`
- `public/files/don_chia_resume.pdf`
- `public/favicon.ico`

**Styling:**
- `assets/css/main.css`
- `assets/css/utils/*`
- `assets/css/windows/*`

Good luck! Let me know what you'd like to tackle first.
