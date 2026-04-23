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
    return Response.json({ error: "Request body must be an object." }, { status: 400 });
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const companyName =
    typeof payload.companyName === "string" ? payload.companyName.trim() : "";
  const entry = {
    full_name: payload.fullName.trim(),
    email: payload.email.trim(),
    contact_number: payload.contactNumber.trim(),
    company_name: companyName || null,
    selected_service: payload.selectedService.trim(),
    message: payload.message.trim(),
    consent_accepted: true,
  };

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("contact_inquiries").insert([entry]);

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Failed to save inquiry to Supabase." },
        { status: 500 }
      );
    }

    console.info(
      `[Inquiry Notification] New inquiry from ${payload.fullName.trim()} <${payload.email.trim()}> for "${payload.selectedService.trim()}".`
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Inquiry route error:", error);
    return Response.json(
      { error: "Unexpected server error while saving inquiry." },
      { status: 500 }
    );
  }
}
