import "server-only";
import { randomUUID } from "node:crypto";

const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXPECTED_TURNSTILE_ACTION = "contact_form";

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getExpectedTurnstileAction() {
  return EXPECTED_TURNSTILE_ACTION;
}

export function getRequestIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const rawIp = cfConnectingIp || forwardedFor || "";

  if (!rawIp) {
    return null;
  }

  return rawIp.split(",")[0]?.trim() || null;
}

export async function verifyTurnstileToken(token, remoteIp) {
  const secret = getRequiredEnv("TURNSTILE_SECRET_KEY");
  const body = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: randomUUID(),
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Turnstile siteverify request failed with status ${response.status}`
    );
  }

  const result = await response.json();

  if (!result.success) {
    return {
      success: false,
      errorCodes: Array.isArray(result["error-codes"])
        ? result["error-codes"]
        : [],
    };
  }

  if (result.action !== EXPECTED_TURNSTILE_ACTION) {
    return {
      success: false,
      errorCodes: ["action-mismatch"],
    };
  }

  return {
    success: true,
    errorCodes: [],
  };
}
