"use client";

import { useSyncExternalStore } from "react";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M19 14.5A7.5 7.5 0 0 1 9.5 5a8.5 8.5 0 1 0 9.5 9.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme || theme || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("tutoyscorp-theme", nextTheme);
    window.dispatchEvent(new Event("tutoyscorp-theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-9 items-center gap-0 rounded-full border border-[var(--header-border)] bg-[var(--header-surface)] px-2 text-sm font-medium text-[var(--header-text)] shadow-[0_12px_30px_var(--shadow-soft)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:h-11 sm:gap-3 sm:px-4"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--toggle-pill)] text-[var(--toggle-icon)] sm:h-7 sm:w-7">
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </span>
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}

function subscribeToTheme(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onThemeChange = () => callback();
  const observer = new MutationObserver(() => callback());

  window.addEventListener("tutoyscorp-theme-change", onThemeChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    window.removeEventListener("tutoyscorp-theme-change", onThemeChange);
    observer.disconnect();
  };
}

function getThemeSnapshot() {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme || "light";
}

function getServerThemeSnapshot() {
  return "light";
}
