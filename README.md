# TutoY Corp Integrated System

Marketing site and inquiry flow for `TutoY Corp Integrated System`, built with Next.js App Router, React, Tailwind CSS, Supabase, and React Toastify.

The project includes:

- responsive layout for mobile, tablet, laptop, and large desktop
- light mode and dark mode with persistent theme toggle
- reusable landing page components
- centralized content file for easy copy updates
- admin login and protected dashboard routes
- contact/inquiry form with server-side validation
- Cloudflare Turnstile human verification
- Supabase-backed inquiry storage
- Gmail/Nodemailer confirmation emails
- toast-based submission feedback
- Vercel-ready Next.js setup

## Tech Stack

- `Next.js 16`
- `React 19`
- `Tailwind CSS 4`
- `Supabase`
- `React Toastify`
- `ESLint`

## Run Locally

Install dependencies if needed:

```bash
npm install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_or_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
GMAIL_SMTP_USER=your-account@gmail.com
GMAIL_SMTP_PASS=your-gmail-app-password
MAIL_FROM="TutoY Corp Integrated System <your-account@gmail.com>"
MAIL_REPLY_TO=your-account@gmail.com
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
- `/login` renders the admin login page
- `/dashboard` renders the protected contact inquiry dashboard
- `/api/inquiries` verifies Turnstile, inserts the inquiry into Supabase, and sends the confirmation email

## Project Structure

```text
src/
  app/
    api/
      inquiries/
        route.js
    contact/
      page.jsx
    dashboard/
      page.jsx
    globals.css
    layout.jsx
    login/
      page.jsx
    page.jsx
    landingpage/
      loading.jsx
      page.jsx
  components/
    auth/
      AdminLoginForm.jsx
      AuthSignOutButton.jsx
    ToastProvider.jsx
    landingpage/
      BrandMark.jsx
      FeatureSlideshow.jsx
      InquiryForm.jsx
      LandingHeader.jsx
      LandingPage.jsx
      SectionIntro.jsx
      ThemeToggle.jsx
  lib/
    admin-auth.js
    supabase-auth-server.js
    supabase-browser.js
    supabase-config.js
    supabase-proxy.js
    supabase-server.js
  data/
    landingpage-content.js
  proxy.js
```

## Inquiry Flow

The contact page uses this flow:

1. `src/app/contact/page.jsx` renders the inquiry form.
2. `src/components/landingpage/InquiryForm.jsx` sends a `POST` request to `/api/inquiries`.
3. The form includes a Cloudflare Turnstile token with the request.
4. `src/app/api/inquiries/route.js` verifies the token and validates the payload.
5. `src/lib/supabase-server.js` creates a server-side Supabase client.
6. The inquiry is inserted into the `contact_inquiries` table in Supabase.
7. `src/lib/inquiry-mail.js` sends the confirmation email.
8. The user sees toast feedback for loading, success, or failure.

Expected Supabase table columns:

- `full_name`
- `email`
- `contact_number`
- `company_name`
- `selected_service`
- `message`
- `consent_accepted`
- `created_at`

Admin dashboard authorization table:

- `admin_users.email`
- `admin_users.created_at`

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

Update inquiry submission and backend handling in:

- `src/app/api/inquiries/route.js`
- `src/lib/supabase-server.js`

Update admin login and dashboard access in:

- `src/app/login/page.jsx`
- `src/app/dashboard/page.jsx`
- `src/components/auth/AdminLoginForm.jsx`
- `src/lib/admin-auth.js`

Update light/dark theme styles and global design tokens in:

- `src/app/globals.css`

Update theme bootstrapping and global metadata in:

- `src/app/layout.jsx`

Update toast container behavior in:

- `src/components/ToastProvider.jsx`

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
- The contact form now stores inquiries in Supabase through the Next.js API route
- Admin dashboard access is controlled through Supabase Auth plus the `admin_users` table
- Submission feedback is shown with toast notifications in the top-right corner
- Keep Supabase secret keys server-side only and never expose them in client components
- See `dashboard-auth.md` for admin setup and first-user provisioning

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

Last updated: April 23, 2026

