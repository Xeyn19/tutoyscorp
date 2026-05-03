"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ToastCard from "@/components/ToastCard";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const initialForm = {
  email: "",
  password: "",
};

function showSuccessToast(title, message) {
  const durationMs = 4700;

  toast(
    <ToastCard
      key={`success-${title}-${durationMs}`}
      tone="success"
      title={title}
      message={message}
      durationMs={durationMs}
    />,
    {
      type: "success",
      autoClose: durationMs,
      closeButton: true,
      icon: false,
    }
  );
}

export default function AdminLoginForm({
  nextPath = "/dashboard",
  initialMessage = "",
  isSupabaseConfigured = true,
  supabaseUrl = "",
  supabasePublishableKey = "",
}) {
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState(initialMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (!isSupabaseConfigured) {
      setErrorMessage(
        "Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY first."
      );
      return;
    }

    startTransition(async () => {
      const supabase = createSupabaseBrowserClient(
        supabaseUrl,
        supabasePublishableKey
      );
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      });

      if (error) {
        setErrorMessage(error.message || "Unable to sign in right now.");
        return;
      }

      showSuccessToast(
        "Login successful",
        "You are now signed in and being redirected to the dashboard."
      );
      router.push(nextPath);
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-[24px] border border-white/15 bg-[var(--surface)] p-5 shadow-[var(--panel-shadow-strong)] backdrop-blur-xl sm:gap-5 sm:rounded-[28px] sm:p-6 xl:gap-6 xl:p-8"
    >
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
          Admin Access
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Log in to the dashboard
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--foreground-muted)] sm:text-base sm:leading-7">
          Use your authorized admin account to review contact inquiries
          submitted through the website.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-[18px] border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-700 dark:text-amber-200">
          {errorMessage}
        </div>
      ) : null}

      <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
        Email Address
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          disabled={!isSupabaseConfigured || isPending}
          required
          autoComplete="email"
          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>

      <label className="grid gap-2 text-sm text-[var(--foreground-muted)]">
        Password
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={onChange}
            disabled={!isSupabaseConfigured || isPending}
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-strong)] px-3 py-2.5 pr-12 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[var(--foreground-muted)] transition hover:text-[var(--foreground)]"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            disabled={!isSupabaseConfigured || isPending}
          >
            {showPassword ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.7a3 3 0 0 0 4.2 4.2" />
                <path d="M9.9 5.1A10.9 10.9 0 0 1 12 4.9c5 0 8.9 3.1 10 7.1a10.7 10.7 0 0 1-3.1 4.7" />
                <path d="M6.2 6.3C4.2 7.7 2.8 9.7 2 12c1.1 4 5 7.1 10 7.1 1.7 0 3.3-.4 4.7-1.1" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={!isSupabaseConfigured || isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Log In"}
      </button>
    </form>
  );
}
