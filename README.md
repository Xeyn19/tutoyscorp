# TutoY Corp Integrated System Landing Page

Professional landing page for `TutoY Corp Integrated System` built with Next.js App Router, React, and Tailwind CSS.

The project includes:

- responsive layout for mobile, tablet, laptop, and large desktop
- light mode and dark mode with persistent theme toggle
- reusable landing page components
- centralized content file for easy copy updates
- Vercel-ready Next.js setup

## Tech Stack

- `Next.js 16`
- `React 19`
- `Tailwind CSS 4`
- `ESLint`

## Run Locally

Install dependencies if needed:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Available scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Routes

- `/` renders the main landing page
- `/landingpage` renders the same landing page route
- `/contact` renders the contact/inquiry form page

## Project Structure

```text
src/
  app/
    api/
      inquiries/
        route.js
    contact/
      page.jsx
    globals.css
    layout.jsx
    page.jsx
    landingpage/
      loading.jsx
      page.jsx
  components/
    landingpage/
      BrandMark.jsx
      FeatureSlideshow.jsx
      InquiryForm.jsx
      LandingHeader.jsx
      LandingPage.jsx
      SectionIntro.jsx
      ThemeToggle.jsx
  data/
    landingpage-content.js
```

## Where To Edit

Update company copy, metrics, labels, and card content in:

- `src/data/landingpage-content.js`

Update page layout and section composition in:

- `src/components/landingpage/LandingPage.jsx`

Update responsive header and mobile hamburger menu in:

- `src/components/landingpage/LandingHeader.jsx`

Update the contact/inquiry page form UI in:

- `src/components/landingpage/InquiryForm.jsx`
- `src/app/contact/page.jsx`

Update the inquiry submit backend handler in:

- `src/app/api/inquiries/route.js`

Update light/dark theme styles and global design tokens in:

- `src/app/globals.css`

Update theme bootstrapping and global metadata in:

- `src/app/layout.jsx`

## Theme Behavior

- Light mode and dark mode are supported
- Theme selection is stored in `localStorage`
- First load falls back to the user system theme preference

## Deploy To Vercel

If the repository is already on GitHub:

1. Go to `vercel.com`
2. Sign in with GitHub
3. Click `Add New` > `Project`
4. Import this repository
5. Let Vercel detect `Next.js`
6. Keep the default settings
7. Click `Deploy`

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Build Command: default
- Output Directory: default
- Install Command: default

After deployment, Vercel will generate a `.vercel.app` URL.

## Notes

- This repo is ready for GitHub-to-Vercel auto deployment
- Pushing updates to the connected branch will trigger a new deploy
- The landing page can be extended later with a contact form, testimonials, case studies, or service detail pages

## Presentation

### Opening (Landing Header + Hero)
**Components:** `LandingHeader.jsx`, `LandingPage.jsx`

This page explains the system clearly for the target users it serves.

### Project Name + About the System (Hero Text)
**Component:** `LandingPage.jsx`

The project is called Tutoy Corp Integrated System.  
It is a unified web-based platform for finance, operations, and booking.  
It helps working students, small businesses, and tour/transport teams manage daily tasks.

### Subsystem Overview + Slideshow (Subsystem Section)
**Components:** `LandingPage.jsx`, `FeatureSlideshow.jsx`

The platform integrates three subsystems: savings goals, inventory management, and tour/transport bookings.  
This slideshow highlights each subsystem so the audience can see the full scope.

### Key Features (Features Section)
**Component:** `LandingPage.jsx`

First, a unified role-based user system for secure access.  
Second, a centralized dashboard for quick monitoring.  
Third, booking and order management.  
Fourth, inventory and record management.  
Fifth, goal tracking and business analytics.

### Mission, Vision, and Tagline (Mission Section)
**Component:** `LandingPage.jsx`

Our mission is to provide innovative, affordable, and user-friendly digital systems.  
Our vision is to become a trusted technology provider for integrated digital solutions.  
Our tagline is: "Built to Help, Designed to Care".

### Core Values + Target Market (Audience Section)
**Component:** `LandingPage.jsx`

Our core values are innovation, integrity, efficiency, accessibility, and customer focus.  
Primary users are working students, small and medium businesses, and tour/transport companies.  
Secondary users are start-ups and service-based enterprises.

### Closing (Contact Section)
**Component:** `LandingPage.jsx`

In summary, the landing page presents what the system is, who it serves, and why it matters.  

Last updated: March 15, 2026
