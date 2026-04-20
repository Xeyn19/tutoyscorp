import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

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
    return Response.json({ error: "Request body must be an object." }, { status: 400 });
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const entry = {
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    contactNumber: payload.contactNumber.trim(),
    companyName: typeof payload.companyName === "string" ? payload.companyName.trim() : "",
    selectedService: payload.selectedService.trim(),
    message: payload.message.trim(),
    createdAt: new Date().toISOString(),
  };

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "inquiries.ndjson");

  await mkdir(dataDir, { recursive: true });
  await appendFile(filePath, `${JSON.stringify(entry)}\n`, "utf8");

  // Integrate your email provider here (Resend, SendGrid, Nodemailer, etc.).
  console.info(
    `[Inquiry Notification] New inquiry from ${entry.fullName} <${entry.email}> for "${entry.selectedService}".`
  );

  return Response.json({ ok: true });
}
