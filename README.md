# TUTOYSCORP Landing Page

Professional landing page for `TUTOYSCORP` built with Next.js App Router, React, and Tailwind CSS.

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

## Project Structure

```text
src/
  app/
    globals.css
    layout.jsx
    page.jsx
    landingpage/
      loading.jsx
      page.jsx
  components/
    landingpage/
      BrandMark.jsx
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
