# Contact Form to Supabase Setup

This guide shows how your current contact form in `src/app/contact` should send data to Supabase.

For this project, the recommended flow is:

`src/app/contact/page.jsx` -> `src/components/landingpage/InquiryForm.jsx` -> `POST /api/inquiries` -> Supabase

That means:

- The browser submits the form to your existing Next.js API route.
- The API route validates the data.
- The API route inserts the data into your Supabase table.

This is the safest approach because your database write key stays on the server.

## 1. Understand the current form flow

Your current setup already works like this:

1. `src/app/contact/page.jsx` renders `InquiryForm`.
2. `src/components/landingpage/InquiryForm.jsx` collects these fields:
   - `fullName`
   - `email`
   - `contactNumber`
   - `companyName`
   - `selectedService`
   - `message`
   - `consentAccepted`
3. On submit, `InquiryForm.jsx` sends a `POST` request to `/api/inquiries`.
4. `src/app/api/inquiries/route.js` receives the JSON body and validates it.
5. Right now, `route.js` saves the submission into a local file: `data/inquiries.ndjson`.

You will replace that local file save with a Supabase insert.

## 2. Create your Supabase project

1. Go to [https://supabase.com](https://supabase.com).
2. Create a new project.
3. Wait until the project is ready.
4. Open your project dashboard.

## 3. Create the table in Supabase

Open `SQL Editor` in Supabase and run this SQL:

```sql
create table if not exists public.contact_inquiries (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null,
  contact_number text not null,
  company_name text,
  selected_service text not null,
  message text not null,
  consent_accepted boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);
```

This table matches your current form fields.

## 4. Get the keys you need

In Supabase, go to `Settings` -> `API`.

You will see several values there. For this project, use:

- `Project URL`
- `service_role` key

Add them to a new file in your project root named `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

## 5. Important key rules

Use the keys like this:

- `NEXT_PUBLIC_SUPABASE_URL`
  - Safe to expose to the app.
  - This can be used in public code because it is only the project URL.
- `SUPABASE_SERVICE_ROLE_KEY`
  - Server only.
  - Do not put this in client components.
  - Do not put this in `InquiryForm.jsx`.
  - Do not prefix this with `NEXT_PUBLIC_`.

## 6. Do you need the anon key?

For the recommended setup in this project, `NEXT_PUBLIC_SUPABASE_ANON_KEY` is not required.

Why:

- Your form does not need to write directly from the browser to Supabase.
- Your existing API route will do the insert on the server.
- The server can use `SUPABASE_SERVICE_ROLE_KEY`.

If you later want direct browser-to-Supabase inserts, that is a different setup and would require:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Row Level Security policies
- A client-side Supabase setup

For now, do not use that pattern.

## 7. Install the Supabase package

Run this in your project:

```bash
npm install @supabase/supabase-js
```

## 8. Create a server-side Supabase client

Create a file like `src/lib/supabase-server.js` and put this code in it:

```js
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}
```

This file must only be used on the server.

## 9. Update your API route to insert into Supabase

Your existing route is:

- `src/app/api/inquiries/route.js`

Right now it does this:

- validates the request body
- creates an `entry`
- saves the entry to `data/inquiries.ndjson`

You should replace the file-writing logic with a Supabase insert.

Use this version of `src/app/api/inquiries/route.js`:

```js
import { createSupabaseServerClient } from "@/lib/supabase-server";

function validatePayload(payload) {
  const requiredFields = [
    "fullName",
    "email",
    "contactNumber",
    "selectedService",
    "message",
  ];

  const missing = requiredFields.filter((field) => {
    const value = payload[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  if (missing.length > 0) {
    return `Missing required field(s): ${missing.join(", ")}`;
  }

  if (payload.consentAccepted !== true) {
    return "Consent is required before submitting the inquiry.";
  }

  return null;
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json(
      { error: "Request body must be an object." },
      { status: 400 }
    );
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const entry = {
    full_name: payload.fullName.trim(),
    email: payload.email.trim(),
    contact_number: payload.contactNumber.trim(),
    company_name:
      typeof payload.companyName === "string" ? payload.companyName.trim() : "",
    selected_service: payload.selectedService.trim(),
    message: payload.message.trim(),
    consent_accepted: true,
  };

  try {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase
      .from("contact_inquiries")
      .insert([entry]);

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Failed to save inquiry to Supabase." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
```

## 10. How the form sends data

Your form in `src/components/landingpage/InquiryForm.jsx` already sends data like this:

```js
const response = await fetch("/api/inquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

That means the data flow is:

1. User fills out the form in the browser.
2. `InquiryForm.jsx` stores the values in `form`.
3. When the user clicks submit, the browser sends the JSON body to `/api/inquiries`.
4. `route.js` receives the JSON.
5. `route.js` validates the fields.
6. `route.js` maps the form field names to the Supabase column names.
7. Supabase stores the row in `public.contact_inquiries`.
8. The API returns `{ ok: true }`.
9. The form shows the success message.

## 11. Field mapping

This is how your current form fields map to the Supabase columns:

| Form field | Supabase column |
| --- | --- |
| `fullName` | `full_name` |
| `email` | `email` |
| `contactNumber` | `contact_number` |
| `companyName` | `company_name` |
| `selectedService` | `selected_service` |
| `message` | `message` |
| `consentAccepted` | `consent_accepted` |

## 12. What stays the same

You do not need to change:

- `src/app/contact/page.jsx`
- most of `src/components/landingpage/InquiryForm.jsx`
- the current submit URL `/api/inquiries`

The main change is inside:

- `src/app/api/inquiries/route.js`

## 13. Start the app

After adding `.env.local`, restart your dev server:

```bash
npm run dev
```

Then test the form from:

- `http://localhost:3000/contact`

## 14. How to verify it works

1. Open the contact page.
2. Fill in all required fields.
3. Submit the form.
4. Wait for the success message.
5. Go to Supabase.
6. Open `Table Editor`.
7. Open `contact_inquiries`.
8. Confirm the new row appears.

## 15. Common errors

### Error: Missing environment variables

Problem:

- `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is missing.

Fix:

- Check `.env.local`
- Restart `npm run dev`

### Error: Invalid API key

Problem:

- The service role key was copied incorrectly.

Fix:

- Copy the `service_role` key again from Supabase `Settings` -> `API`

### Error: Table does not exist

Problem:

- The `contact_inquiries` table was not created.

Fix:

- Run the SQL in Supabase SQL Editor

### Error: You accidentally exposed the service role key

Problem:

- You used `SUPABASE_SERVICE_ROLE_KEY` in client-side code.

Fix:

- Remove it from any client component
- Keep it only in server-side files like `route.js` or a server helper
- If it was exposed publicly, rotate the key in Supabase

### Error: The form still saves locally

Problem:

- `route.js` still uses `appendFile(...)`.

Fix:

- Remove the local file-writing code
- Replace it with the Supabase insert code shown above

## 16. Final setup summary

Use this exact pattern for this project:

1. Keep `InquiryForm.jsx` posting to `/api/inquiries`
2. Add `.env.local` with:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Install `@supabase/supabase-js`
4. Create the `contact_inquiries` table in Supabase
5. Update `src/app/api/inquiries/route.js` to insert into Supabase
6. Test the form from `/contact`

This gives you a secure contact form flow without exposing your Supabase write key in the browser.
