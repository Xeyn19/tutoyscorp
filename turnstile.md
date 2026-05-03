# Cloudflare Turnstile and Confirmation Email Setup

This project now uses the following inquiry flow:

`/contact` -> `InquiryForm.jsx` -> `POST /api/inquiries` -> Turnstile verification -> Supabase insert -> Nodemailer confirmation email

The contact form only saves the inquiry after Turnstile verification succeeds. After a successful save, the API tries to send a professional confirmation email to the user.

## Files involved

- `src/components/landingpage/InquiryForm.jsx`
- `src/app/api/inquiries/route.js`
- `src/lib/turnstile.js`
- `src/lib/inquiry-mail.js`

## 1. Create your Cloudflare Turnstile widget

1. Sign in to the Cloudflare dashboard.
   - Direct Turnstile dashboard link: https://dash.cloudflare.com/?to=%2F%3Aaccount%2Fturnstile
2. Open `Turnstile`.
3. Create a widget for your site.
4. Add your local and production hostnames.
   - Local development: `localhost`
   - Production: your real domain
5. Copy the `Site Key` and `Secret Key`.

Official references:

- Cloudflare dashboard widget setup: https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/
- Cloudflare client rendering: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- Cloudflare server validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

## 2. Add environment variables

Create or update `.env.local` in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

NEXT_PUBLIC_TURNSTILE_SITE_KEY=YOUR_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY=YOUR_TURNSTILE_SECRET_KEY

GMAIL_SMTP_USER=your-account@gmail.com
GMAIL_SMTP_PASS=your-16-character-app-password
MAIL_FROM="TutoY Corp Integrated System <your-account@gmail.com>"
MAIL_REPLY_TO=your-account@gmail.com
```

Important notes:

- Put secrets in `.env.local`, not in a committed `.env` file.
- If a real secret key was committed previously, rotate it before deployment.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is safe for the browser.
- `TURNSTILE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and SMTP credentials must stay server-side only.

## 3. How Turnstile is connected in this project

### Client-side

`src/components/landingpage/InquiryForm.jsx` now:

- loads the Turnstile script from Cloudflare
- renders a visible widget
- receives the token in a callback
- includes `turnstileToken` in the JSON request body
- resets the widget when verification expires or after a submission attempt

### Server-side

`src/app/api/inquiries/route.js` now:

- requires `turnstileToken`
- verifies the token using `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- rejects the request if verification fails
- inserts into Supabase only after verification succeeds

Implementation notes:

- The token is validated server-side on every submission.
- The widget action used by this project is `contact_form`.
- Turnstile tokens are single-use and expire after five minutes, so the form resets the widget after each attempt.

## 4. Gmail setup for Nodemailer

This project uses Nodemailer with Gmail SMTP.

Official reference:

- Nodemailer Gmail guide: https://nodemailer.com/guides/using-gmail

Recommended setup:

1. Use a dedicated Gmail account for outbound contact-form mail.
2. Enable `2-Step Verification` on that Google account.
3. Create an `App Password`.
4. Use the Gmail address as `GMAIL_SMTP_USER`.
5. Use the 16-character app password as `GMAIL_SMTP_PASS`.

Transport settings used by the app:

- host: `smtp.gmail.com`
- port: `465`
- secure: `true`

Important Gmail behavior:

- Gmail may rewrite the `From` address to the authenticated Gmail account.
- For consistent delivery, keep `MAIL_FROM` aligned with the Gmail account or a sender identity supported by that account.

## 5. Confirmation email behavior

After a valid inquiry is saved, the API sends a confirmation email to the user.

Current message intent:

- confirm that the inquiry was received
- mention the selected plan
- say the team will review the request and reply soon
- avoid promising an exact response time

Current subject:

```text
We received your inquiry | TutoY Corp Integrated System
```

Plain-text example:

```text
Hello Jane Doe,

Thank you for contacting TutoY Corp Integrated System.

This email confirms that we received your inquiry regarding Professional Package (Business Plan) - ₱1,500. Our team will review your request carefully and get back to you soon.

If we need any additional information, we will contact you using this email address.

Best regards,
TutoY Corp Integrated System
```

## 6. API response behavior

The inquiry API now returns:

- success with email sent:

```json
{ "ok": true, "emailSent": true }
```

- success with email warning:

```json
{
  "ok": true,
  "emailSent": false,
  "warning": "Your inquiry was received, but we could not send the confirmation email."
}
```

- verification failure:

```json
{ "error": "Human verification failed. Please try again." }
```

If the email fails:

- the inquiry still remains saved in Supabase
- the user still gets a successful form submission
- the UI warns that the confirmation email could not be sent

## 7. Local testing checklist

1. Start the app:

```bash
npm run dev
```

2. Open:

```text
http://localhost:3000/contact
```

3. Complete the form and finish the Turnstile check.
4. Submit the inquiry.
5. Confirm:
   - the form succeeds
   - the Supabase row is inserted into `contact_inquiries`
   - the user receives the confirmation email

Also test these failure cases:

- submit without completing Turnstile
- let the Turnstile token expire and submit again
- use missing or wrong SMTP credentials and confirm the inquiry still saves

## 8. Deployment reminders

- Add all environment variables in Vercel or your hosting platform.
- Keep the Turnstile hostnames in Cloudflare aligned with your deployed domain.
- Rotate any secret that has ever been committed to source control.
