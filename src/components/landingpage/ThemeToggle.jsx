"use client";

const themeIcons = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      d="M12 3.2v2.3M12 18.5v2.3M20.8 12h-2.3M5.5 12H3.2M18.2 5.8l-1.7 1.7M7.5 16.5l-1.7 1.7M18.2 18.2l-1.7-1.7M7.5 7.5 5.8 5.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="3.8" />
    <path
      d="M18.5 12A6.5 6.5 0 1 1 12 5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ThemeToggle() {
  function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("tutoyscorp-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      className="inline-flex h-9 items-center gap-0 rounded-full border border-[var(--header-border)] bg-[var(--header-surface)] px-2 text-sm font-medium text-[var(--header-text)] shadow-[0_12px_30px_var(--shadow-soft)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:h-11 sm:gap-3 sm:px-4"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--toggle-pill)] text-[var(--toggle-icon)] sm:h-7 sm:w-7">
        {themeIcons}
      </span>
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}
