"use client";

import Link from "next/link";
import { useState } from "react";

import BrandMark from "@/components/landingpage/BrandMark";
import ThemeToggle from "@/components/landingpage/ThemeToggle";

const frameClass = "mx-auto w-full max-w-[90rem] 2xl:max-w-[92rem]";
const floatingButtonClass =
  "fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_18px_40px_var(--shadow-soft)] backdrop-blur-xl transition sm:bottom-6 sm:right-6";

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

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 5-5 5" />
      <path d="m12 5 5 5" />
      <path d="M12 5v14" />
    </svg>
  );
}

function HeaderCta({ className, onNavigate }) {
  return (
    <Link
      href="/contact"
      onClick={onNavigate}
      className={className}
      style={{ color: "#000" }}
    >
      Connect With Us
    </Link>
  );
}

function BackToTopButton({ visible }) {
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`${floatingButtonClass} ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUpIcon />
      <span className="hidden sm:inline">Back to top</span>
      <span className="sm:hidden">Top</span>
    </a>
  );
}

export default function LandingHeader({
  navigation,
  primaryButtonClass,
  isHomeVisible = true,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  const desktopCtaWrapperClass = `hidden overflow-hidden transition-all lg:flex ${
    isHomeVisible
      ? "lg:max-w-0 lg:opacity-0"
      : "lg:max-w-[18rem] lg:opacity-100"
  }`;
  const desktopCtaClass = `${primaryButtonClass} shrink-0 whitespace-nowrap ${
    isHomeVisible ? "pointer-events-none" : ""
  }`;
  const mobileMenuCtaClass = `${primaryButtonClass} overflow-hidden transition-all ${
    isHomeVisible
      ? "mt-0 max-h-0 pointer-events-none opacity-0"
      : "mt-2 max-h-24 w-full opacity-100 sm:mt-3"
  }`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-8">
        <div className={frameClass}>
          <div className="rounded-[18px] border border-[var(--header-border)] bg-[var(--header-surface)] px-2.5 py-2 shadow-[0_18px_40px_var(--shadow-soft)] backdrop-blur-xl sm:rounded-[22px] sm:px-4 sm:py-3 lg:rounded-[28px] lg:px-5">
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
                <div className={desktopCtaWrapperClass}>
                  <HeaderCta className={desktopCtaClass} />
                </div>
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

                <HeaderCta
                  onNavigate={closeMenu}
                  className={mobileMenuCtaClass}
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <BackToTopButton visible={!isHomeVisible} />
    </>
  );
}
