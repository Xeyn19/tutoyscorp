# Admin Login and Dashboard Setup

This project now includes:

- `/login` for admin sign-in
- `/dashboard` for viewing contact inquiries

The dashboard reads records from `contact_inquiries` and only allows access to approved admin accounts.

## 1. Required environment variables

Create or update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

NEXT_PUBLIC_TURNSTILE_SITE_KEY=YOUR_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY=YOUR_TURNSTILE_SECRET_KEY

GMAIL_SMTP_USER=your-account@gmail.com
GMAIL_SMTP_PASS=your-gmail-app-password
MAIL_FROM="TutoY Corp Integrated System <your-account@gmail.com>"
MAIL_REPLY_TO=your-account@gmail.com
```

Notes:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is used for browser login sessions.
- If you only have the legacy client key, you can use the anon key value there.
- `SUPABASE_SERVICE_ROLE_KEY` stays server-only.

## 2. Enable email/password auth

In Supabase:

1. Open `Authentication`.
2. Go to `Providers`.
3. Enable `Email`.
4. Make sure `Email + Password` login is allowed.

## 3. Create the admin allowlist table

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default timezone('utc', now())
);
```

Store admin emails in lowercase because the app checks exact lowercase matches.

## 4. Create the first admin user

In Supabase:

1. Open `Authentication` -> `Users`.
2. Create a user manually with email and password.
3. Copy that same email into the `admin_users` table.

Example:

```sql
insert into public.admin_users (email)
values ('admin@example.com')
on conflict (email) do nothing;
```

## 5. How access works

- The login form uses Supabase Auth email/password sign-in.
- The session is stored in cookies.
- The dashboard checks whether the signed-in email exists in `admin_users`.
- Only approved admin emails can open `/dashboard`.

## 6. What the dashboard shows

The dashboard reads from `public.contact_inquiries` and displays:

- full name
- email
- contact number
- company name
- selected service
- message
- submission date

## 7. Local test flow

1. Start the app:

```bash
npm run dev
```

2. Open:

```text
http://localhost:3000/login
```

3. Sign in with the admin account you created in Supabase.
4. Confirm that `/dashboard` opens.
5. Confirm the inquiry list is shown.

## 8. Common setup failures

### Login works but dashboard redirects back to `/login`

Cause:

- The account is authenticated but the email is not in `admin_users`.

Fix:

- Insert the same lowercase email into `admin_users`.

### Dashboard cannot load inquiries

Cause:

- `contact_inquiries` does not exist
- `NEXT_PUBLIC_SUPABASE_URL` is wrong
- `SUPABASE_SERVICE_ROLE_KEY` is wrong

Fix:

- verify the table exists
- verify the project URL
- verify the service role key

### Login fails immediately

Cause:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_URL` is missing or invalid

Fix:

- copy both values again from Supabase and restart `npm run dev`
