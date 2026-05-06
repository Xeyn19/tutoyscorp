"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { toast } from "react-toastify";
import ToastCard from "@/components/ToastCard";

const initialForm = {
  fullName: "",
  email: "",
  contactNumber: "",
  companyName: "",
  selectedService: "",
  message: "",
  consentAccepted: false,
};

function createInitialForm() {
  return { ...initialForm };
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const turnstileAction = "contact_form";
const turnstileLanguage = "en";

export default function InquiryForm({ services }) {
  const [form, setForm] = useState(createInitialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(
    turnstileSiteKey
      ? ""
      : "Human verification is not configured. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local."
  );
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const turnstileErrorCountRef = useRef(0);
  const canSubmit =
    Boolean(turnstileToken) &&
    Boolean(form.consentAccepted) &&
    !isSubmitting;

  function showPendingToast() {
    return toast.loading(
      <ToastCard
        tone="loading"
        title="Submitting inquiry"
        message="Please wait while we send your details."
      />,
      {
        icon: false,
        closeButton: false,
        autoClose: false,
      }
    );
  }

  function updateToastToSuccess(toastId, message) {
    const durationMs = 4700;

    toast.update(toastId, {
      render: (
        <ToastCard
          key={`success-${durationMs}`}
          tone="success"
          title="Inquiry submitted"
          message={message}
          durationMs={durationMs}
        />
      ),
      type: "success",
      isLoading: false,
      autoClose: durationMs,
      closeButton: true,
      icon: false,
    });
  }

  function updateToastToError(toastId, message) {
    const durationMs = 4700;

    toast.update(toastId, {
      render: (
        <ToastCard
          key={`error-${durationMs}`}
          tone="error"
          title="Inquiry not sent"
          message={message}
          durationMs={durationMs}
        />
      ),
      type: "error",
      isLoading: false,
      autoClose: durationMs,
      closeButton: true,
      icon: false,
    });
  }

  function showToast(tone, title, message) {
    const durationMs = 4700;

    return toast(
      <ToastCard
        key={`${tone}-${durationMs}`}
        tone={tone}
        title={title}
        message={message}
        durationMs={durationMs}
      />,
      {
        type: tone === "error" ? "error" : "success",
        autoClose: durationMs,
        closeButton: true,
        icon: false,
      }
    );
  }

  function onChange(event) {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetTurnstile(nextError = "") {
    setTurnstileToken("");
    setTurnstileError(nextError);
    turnstileErrorCountRef.current = 0;

    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileWidgetIdRef.current !== null
    ) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  }

  useEffect(() => {
    if (!turnstileSiteKey) {
      return undefined;
    }

    let cancelled = false;
    let intervalId = 0;

    const renderWidget = () => {
      if (
        cancelled ||
        !turnstileContainerRef.current ||
        !window.turnstile ||
        turnstileWidgetIdRef.current !== null
      ) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: turnstileSiteKey,
          action: turnstileAction,
          language: turnstileLanguage,
          theme: "auto",
          size: "flexible",
          retry: "auto",
          "retry-interval": 8000,
          "refresh-expired": "auto",
          "refresh-timeout": "auto",
          callback(token) {
            setTurnstileToken(token);
            setTurnstileError("");
            turnstileErrorCountRef.current = 0;
          },
          "error-callback"(errorCode) {
            setTurnstileToken("");
            turnstileErrorCountRef.current += 1;

            if (turnstileErrorCountRef.current <= 2) {
              setTurnstileError("Verification is retrying automatically.");
              return false;
            }

            setTurnstileError(
              `Verification could not be completed right now. Disable browser translation or assistant extensions for this page and try again. Error code: ${errorCode}.`
            );
            return true;
          },
          "expired-callback"() {
            resetTurnstile("Verification expired. Please complete the check again.");
          },
          "timeout-callback"() {
            resetTurnstile("Verification timed out. Please complete the check again.");
          },
        }
      );

      setTurnstileError("");

      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = 0;
      }
    };

    renderWidget();

    if (turnstileWidgetIdRef.current === null) {
      intervalId = window.setInterval(renderWidget, 250);
    }

    return () => {
      cancelled = true;

      if (intervalId) {
        window.clearInterval(intervalId);
      }

      if (
        window.turnstile &&
        turnstileWidgetIdRef.current !== null
      ) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    if (!turnstileSiteKey) {
      showToast(
        "error",
        "Verification unavailable",
        "Human verification is not configured yet. Add the Turnstile site key and try again."
      );
      return;
    }

    if (!turnstileToken) {
      setTurnstileError("Please complete the verification check before submitting.");
      showToast(
        "error",
        "Complete verification",
        "Please confirm that you are human before submitting your inquiry."
      );
      return;
    }

    setIsSubmitting(true);
    const toastId = showPendingToast();

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        updateToastToError(
          toastId,
          typeof data.error === "string"
            ? data.error
            : "Submission failed. Please check your details and try again."
        );
        resetTurnstile("Please complete the verification check again.");
        return;
      }

      updateToastToSuccess(
        toastId,
        data.emailSent === false
          ? "Your inquiry has been submitted. We received your request, but the confirmation email could not be sent."
          : "Your inquiry has been submitted. We sent a confirmation email and our team will review your request soon."
      );
      setForm(createInitialForm());
      resetTurnstile();
      return;
    } catch {
      updateToastToError(
        toastId,
        "Network error while submitting. Please check your connection and try again."
      );
      resetTurnstile("Please complete the verification check again.");
      return;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid h-full min-w-0 overflow-hidden content-start gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] sm:gap-4 sm:rounded-[28px] sm:p-5 lg:gap-4 lg:p-6 xl:h-full xl:rounded-[32px] xl:p-7"
    >
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      ) : null}

      <div className="grid gap-3 lg:grid-cols-2">
        <label className="grid min-w-0 gap-2 text-sm text-[var(--foreground-muted)]">
          Full Name
          <input
            name="fullName"
            value={form.fullName ?? ""}
            onChange={onChange}
            required
            className="w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-sm text-[var(--foreground-muted)]">
          Email Address
          <input
            type="email"
            name="email"
            value={form.email ?? ""}
            onChange={onChange}
            required
            className="w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-sm text-[var(--foreground-muted)]">
          Contact Number
          <input
            name="contactNumber"
            value={form.contactNumber ?? ""}
            onChange={onChange}
            required
            className="w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-sm text-[var(--foreground-muted)]">
          Company Name (optional)
          <input
            name="companyName"
            value={form.companyName ?? ""}
            onChange={onChange}
            className="w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>
      </div>

      <label className="grid min-w-0 gap-2 text-sm text-[var(--foreground-muted)]">
        Selected Plan
        <select
          name="selectedService"
          value={form.selectedService ?? ""}
          onChange={onChange}
          required
          className="w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
        >
          <option value="">Select a plan</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <label className="grid min-w-0 gap-2 text-sm text-[var(--foreground-muted)]">
        Message / Requirements
        <textarea
          name="message"
          value={form.message ?? ""}
          onChange={onChange}
          required
          rows={4}
          className="w-full min-w-0 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
        />
      </label>

      <label className="flex items-start gap-3 rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
        <input
          type="checkbox"
          name="consentAccepted"
          checked={Boolean(form.consentAccepted)}
          onChange={onChange}
          required
          className="mt-1 h-4 w-4 rounded border border-[var(--border-strong)] accent-[var(--accent-strong)]"
        />
        <span>
          By checking this box, you confirm that you have read and agree to
          our{" "}
          <span
            role="link"
            aria-disabled="true"
            className="font-semibold text-[var(--foreground)] underline underline-offset-4 decoration-[var(--border-strong)] cursor-default"
          >
            Terms of Use
          </span>{" "}
          and that you consent to our processing of your Personal Data in
          accordance with our{" "}
          <span
            role="link"
            aria-disabled="true"
            className="font-semibold text-[var(--foreground)] underline underline-offset-4 decoration-[var(--border-strong)] cursor-default"
          >
            Privacy Policy
          </span>
          .
        </span>
      </label>

      <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 shadow-[0_12px_32px_var(--shadow-soft)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="overflow-x-auto">
              <div
                ref={turnstileContainerRef}
                translate="no"
                className="notranslate"
              />
            </div>
            <p
              className={`mt-3 text-xs ${
                turnstileError
                  ? "text-amber-600 dark:text-amber-300"
                  : "text-[var(--foreground-muted)]"
              }`}
              aria-live="polite"
            >
              {turnstileError || "Verification ready."}
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              Cloudflare
            </p>
            <p className="text-[11px] text-[var(--foreground-muted)]">
              Turnstile
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting
          ? "Submitting..."
          : !form.consentAccepted
            ? "Accept terms to submit"
            : !turnstileToken
              ? "Complete CAPTCHA to submit"
              : "Submit"}
      </button>
    </form>
  );
}
