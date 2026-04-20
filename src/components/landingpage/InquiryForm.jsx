"use client";

import { useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  contactNumber: "",
  companyName: "",
  selectedService: "",
  message: "",
};

export default function InquiryForm({ services }) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function onChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
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
      setForm(initialForm);
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
      className="grid gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Full Name
          <input
            name="fullName"
            value={form.fullName}
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
            value={form.email}
            onChange={onChange}
            required
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Contact Number
          <input
            name="contactNumber"
            value={form.contactNumber}
            onChange={onChange}
            required
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
          Company Name (optional)
          <input
            name="companyName"
            value={form.companyName}
            onChange={onChange}
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
        Selected Package / Service
        <select
          name="selectedService"
          value={form.selectedService}
          onChange={onChange}
          required
          className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
        >
          <option value="">Select a package or service</option>
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
          value={form.message}
          onChange={onChange}
          required
          rows={5}
          className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)]"
        />
      </label>

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
