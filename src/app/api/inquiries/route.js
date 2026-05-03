import { createSupabaseServerClient } from "@/lib/supabase-server";
import { sendInquiryConfirmationEmail } from "@/lib/inquiry-mail";
import {
  getRequestIp,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export const runtime = "nodejs";
const isDevelopment = process.env.NODE_ENV !== "production";

function buildErrorResponse(message, status, details) {
  return Response.json(
    isDevelopment && details
      ? { error: message, details }
      : { error: message },
    { status }
  );
}

function getErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unknown error.";
}

function getSupabaseFailureMessage(error) {
  const detail = [
    error?.code,
    error?.message,
    error?.details,
    error?.hint,
  ]
    .filter(Boolean)
    .join(" | ");

  const lowerDetail = detail.toLowerCase();

  if (
    lowerDetail.includes("getaddrinfo") ||
    lowerDetail.includes("enotfound") ||
    lowerDetail.includes("failed to fetch") ||
    lowerDetail.includes("fetch failed")
  ) {
    return {
      message: "Supabase project URL is invalid or unreachable.",
      details: detail,
    };
  }

  if (
    lowerDetail.includes("relation") &&
    lowerDetail.includes("does not exist")
  ) {
    return {
      message: "Supabase table 'contact_inquiries' does not exist.",
      details: detail,
    };
  }

  return {
    message: "Failed to save inquiry to Supabase.",
    details: detail || "Supabase returned an unknown insert error.",
  };
}

function validatePayload(payload) {
  const requiredFields = [
    "fullName",
    "email",
    "contactNumber",
    "selectedService",
    "message",
    "turnstileToken",
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
    return buildErrorResponse("Invalid JSON body.", 400);
  }

  if (!payload || typeof payload !== "object") {
    return buildErrorResponse("Request body must be an object.", 400);
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return buildErrorResponse(validationError, 400);
  }

  try {
    const turnstileResult = await verifyTurnstileToken(
      payload.turnstileToken.trim(),
      getRequestIp(request)
    );

    if (!turnstileResult.success) {
      console.warn("Turnstile validation failed:", turnstileResult.errorCodes);
      return buildErrorResponse(
        "Human verification failed. Please try again.",
        400,
        turnstileResult.errorCodes.join(", ")
      );
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return buildErrorResponse(
      "Unable to verify your submission right now. Please try again.",
      500,
      getErrorMessage(error)
    );
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
      const failure = getSupabaseFailureMessage(error);
      return buildErrorResponse(failure.message, 500, failure.details);
    }

    console.info(
      `[Inquiry Notification] New inquiry from ${payload.fullName.trim()} <${payload.email.trim()}> for "${payload.selectedService.trim()}".`
    );

    try {
      await sendInquiryConfirmationEmail({
        fullName: entry.full_name,
        email: entry.email,
        selectedService: entry.selected_service,
      });

      return Response.json({ ok: true, emailSent: true });
    } catch (error) {
      console.error("Inquiry confirmation email error:", error);
      return Response.json({
        ok: true,
        emailSent: false,
        warning:
          "Your inquiry was received, but we could not send the confirmation email.",
      });
    }
  } catch (error) {
    console.error("Inquiry route error:", error);
    return buildErrorResponse(
      "Unexpected server error while saving inquiry.",
      500,
      getErrorMessage(error)
    );
  }
}
