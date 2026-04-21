"use client";

import { useState } from "react";

import BrandMark from "@/components/landingpage/BrandMark";
import ThemeToggle from "@/components/landingpage/ThemeToggle";

function MenuIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function LandingHeader({ navigation, primaryButtonClass }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="relative z-10 px-2.5 pt-3 sm:px-4 sm:pt-4 lg:px-8">
      <div className="rounded-[14px] border border-[var(--header-border)] bg-[var(--header-surface)] px-2.5 py-2 backdrop-blur-xl sm:rounded-[22px] sm:px-4 sm:py-3 lg:rounded-[28px] lg:px-5">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <BrandMark compact />
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-7 text-sm text-[var(--foreground-muted)]">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--header-border)] bg-[var(--header-surface)] text-[var(--header-text)] shadow-[0_12px_30px_var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:h-11 sm:w-11 lg:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
            <a
              href="/contact"
              className={`${primaryButtonClass} hidden lg:inline-flex`}
              style={{ color: "#000" }}
            >
              Connect With Us
            </a>
          </div>
        </div>

        {menuOpen ? (
          <div className="mt-3 border-t border-[var(--header-border)] pt-3 sm:mt-4 sm:pt-4 lg:hidden">
            <nav className="grid gap-1.5 sm:gap-2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--border-strong)] sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="/contact"
              onClick={closeMenu}
              className={`${primaryButtonClass} mt-2 w-full sm:mt-3`}
              style={{ color: "#000" }}
            >
              Connect With Us
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
