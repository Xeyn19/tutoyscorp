"use client";

import { useState } from "react";

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

export default function InquiryForm({ services }) {
  const [form, setForm] = useState(createInitialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function onChange(event) {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            typeof data.error === "string"
              ? data.error
              : "Submission failed. Please check your details and try again.",
        });
        setIsSubmitting(false);
        return;
      }

      setStatus({
        type: "success",
        message:
          "Success! Your inquiry has been submitted. Our team will contact you soon.",
      });
      setForm(createInitialForm());
      setIsSubmitting(false);
      return;
    } catch {
      setStatus({
        type: "error",
        message:
          "Network error while submitting. Please check your connection and try again.",
      });
      setIsSubmitting(false);
      return;
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid h-full min-w-0 content-start gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] sm:rounded-[28px] sm:p-6 lg:gap-5 lg:p-8 xl:min-h-[calc(100vh-4rem)] xl:rounded-[32px]"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Full Name
          <input
            name="fullName"
            value={form.fullName ?? ""}
            onChange={onChange}
            required
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Email Address
          <input
            type="email"
            name="email"
            value={form.email ?? ""}
            onChange={onChange}
            required
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Contact Number
          <input
            name="contactNumber"
            value={form.contactNumber ?? ""}
            onChange={onChange}
            required
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Company Name (optional)
          <input
            name="companyName"
            value={form.companyName ?? ""}
            onChange={onChange}
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
        Selected Plan
        <select
          name="selectedService"
          value={form.selectedService ?? ""}
          onChange={onChange}
          required
          className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
        >
          <option value="">Select a plan</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
        Message / Requirements
        <textarea
          name="message"
          value={form.message ?? ""}
          onChange={onChange}
          required
          rows={5}
          className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
        />
      </label>

      <label className="flex items-start gap-3 rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm leading-7 text-[var(--foreground-muted)]">
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

      <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 shadow-[0_12px_32px_var(--shadow-soft)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded border border-[var(--border-strong)] bg-[var(--surface)]" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-sm border border-[var(--border-strong)]" />
            </span>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Verify you are human
              </p>
              <p className="text-xs text-[var(--foreground-muted)]">
                Static Cloudflare UI placeholder
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              Cloudflare
            </p>
            <p className="text-[11px] text-[var(--foreground-muted)]">
              Turnstile
            </p>
          </div>
        </div>
      </div>

      {status.message ? (
        <p
          className={`rounded-xl border px-3 py-2 text-sm ${
            status.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
          }`}
        >
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
