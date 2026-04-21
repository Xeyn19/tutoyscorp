"use client";

import { useEffect, useState } from "react";

import { slideshowSlides } from "@/data/landingpage-content";

const autoAdvanceMs = 7000;

const iconClass = "h-5 w-5 text-[var(--accent-strong)]";
const iconBadgeClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--panel-shadow)]";

const slideIcons = {
  "Online Saving Goal System for Working Students": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 0 1 12 0" />
      <path d="M6 9v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
      <path d="M10 12h4" />
    </svg>
  ),
  "Don G. Pastilan Inventory Management System": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M6 7v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
      <path d="M9 11h6" />
      <path d="M9 15h4" />
    </svg>
  ),
  "Online Roma Tours and Transport System": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="7" width="14" height="8" rx="2" />
      <path d="M7 15v2" />
      <path d="M17 15v2" />
      <path d="M8 11h8" />
    </svg>
  ),
};

export default function FeatureSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = slideshowSlides;

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, autoAdvanceMs);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[var(--media-border)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] lg:rounded-[32px]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--media-overlay-start) 0%, var(--media-overlay-end) 100%), url('/centralized.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--media-accent-overlay)" }}
      />

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--media-pill-text)]">
              System walkthrough
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--media-text)]">
              Subsystem spotlight
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--media-muted)]">
              A rotating view of the integrated modules that power the platform.
            </p>
          </div>
          <div className="rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--media-pill-text)] backdrop-blur-md">
            {activeIndex + 1} / {slides.length}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[18px] border border-[var(--media-border)] bg-[var(--media-pill-bg)] backdrop-blur-sm sm:rounded-[24px]">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.title} className="min-w-full p-5 sm:p-6">
                <div className="rounded-[16px] border border-[var(--media-border)] bg-[var(--media-surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[20px] sm:p-6">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className={`${iconBadgeClass} border-[var(--media-border)] bg-[var(--media-pill-bg)]`}>
                      {slideIcons[slide.title] ?? null}
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--media-pill-text)]">
                      {slide.title}
                    </p>
                  </div>
                  <p className="mt-3 text-center text-sm leading-7 text-[var(--media-muted)]">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show slide ${index + 1}: ${slide.title}`}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition backdrop-blur-md ${
                isActive
                  ? "border-[var(--media-border-strong)] bg-[var(--media-surface-strong)] text-[var(--media-text)]"
                  : "border-[var(--media-border)] bg-[var(--media-pill-bg)] text-[var(--media-muted)] hover:border-[var(--media-border-strong)]"
              }`}
            >
              {slide.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
