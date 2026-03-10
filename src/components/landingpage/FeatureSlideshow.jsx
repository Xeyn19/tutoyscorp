"use client";

import { useEffect, useState } from "react";

import { slideshowSlides } from "@/data/landingpage-content";

const autoAdvanceMs = 7000;

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
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
            System walkthrough
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Subsystem spotlight
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
            A rotating view of the integrated modules that power the platform.
          </p>
        </div>
        <div className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] sm:rounded-[24px]">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.title} className="min-w-full p-5 sm:p-6">
              <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] sm:rounded-[20px] sm:p-6">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                  {slide.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                isActive
                  ? "border-[var(--accent-strong)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] hover:border-[var(--border-strong)]"
              }`}
            >
              {slide.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
