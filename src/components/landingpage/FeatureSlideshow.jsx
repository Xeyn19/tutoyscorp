"use client";

import { startTransition, useEffect, useEffectEvent, useRef, useState } from "react";

import { slideshowSlides } from "@/data/landingpage-content";

const autoAdvanceMs = 7000;
const manualPauseMs = 10000;

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
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const slides = slideshowSlides;
  const manualPauseTimeoutRef = useRef(null);
  const isAutoPaused = isHovered || isFocusedWithin || isManuallyPaused;

  function pauseAutoRotation() {
    setIsManuallyPaused(true);

    if (manualPauseTimeoutRef.current) {
      clearTimeout(manualPauseTimeoutRef.current);
    }

    manualPauseTimeoutRef.current = setTimeout(() => {
      setIsManuallyPaused(false);
    }, manualPauseMs);
  }

  const advanceSlide = useEffectEvent(() => {
    startTransition(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    });
  });

  useEffect(() => {
    if (slides.length <= 1 || isAutoPaused) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      advanceSlide();
    }, autoAdvanceMs);

    return () => clearInterval(intervalId);
  }, [isAutoPaused, slides.length]);

  useEffect(() => () => {
    if (manualPauseTimeoutRef.current) {
      clearTimeout(manualPauseTimeoutRef.current);
    }
  }, []);

  const activeSlide = slides[activeIndex];

  function handleManualSelect(index) {
    pauseAutoRotation();
    startTransition(() => {
      setActiveIndex(index);
    });
  }

  function handleStep(direction) {
    pauseAutoRotation();
    startTransition(() => {
      setActiveIndex((current) => {
        const nextIndex = current + direction;

        if (nextIndex < 0) {
          return slides.length - 1;
        }

        return nextIndex % slides.length;
      });
    });
  }

  return (
    <div
      className="relative overflow-hidden rounded-[20px] border border-[var(--media-border)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] lg:rounded-[32px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusedWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocusedWithin(false);
        }
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage:
                `linear-gradient(180deg, var(--media-overlay-start) 0%, var(--media-overlay-end) 100%), url('${slide.image}')`,
              backgroundPosition: slide.imagePosition ?? "center center",
              backgroundSize: "cover",
            }}
          />
        );
      })}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--media-accent-overlay)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,17,31,0.26)_0%,rgba(7,17,31,0.08)_45%,rgba(7,17,31,0.42)_100%)]" />

      <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl text-center xl:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--media-pill-text)]">
              System walkthrough
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--media-text)] sm:text-3xl">
              Subsystem spotlight
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--media-muted)] sm:text-base">
              A rotating view of the integrated modules that power the platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 xl:justify-end">
            <div className="rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--media-pill-text)] backdrop-blur-md">
              {activeIndex + 1} / {slides.length}
            </div>
            <div className="rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--media-pill-text)] backdrop-blur-md">
              {isAutoPaused ? "Paused" : "Auto rotating"}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Show previous subsystem"
                onClick={() => handleStep(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] text-[var(--media-text)] transition hover:border-[var(--media-border-strong)] hover:bg-[var(--media-surface-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Show next subsystem"
                onClick={() => handleStep(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] text-[var(--media-text)] transition hover:border-[var(--media-border-strong)] hover:bg-[var(--media-surface-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)] xl:gap-5">
          <article className="relative min-h-[25rem] overflow-hidden rounded-[22px] border border-[var(--media-border)] bg-[var(--media-pill-bg)] shadow-[var(--panel-shadow)] backdrop-blur-sm sm:min-h-[28rem] sm:rounded-[28px]">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-700 ease-out motion-reduce:transition-none ${
                      isActive ? "scale-100" : "scale-[1.03]"
                    }`}
                    role="img"
                    aria-label={slide.imageAlt}
                    style={{
                      backgroundImage:
                        `linear-gradient(180deg, rgba(7, 17, 31, 0.06) 0%, rgba(7, 17, 31, 0.76) 100%), url('${slide.image}')`,
                      backgroundPosition: slide.imagePosition ?? "center center",
                      backgroundSize: "cover",
                    }}
                  />
                </div>
              );
            })}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(107,255,209,0.14),transparent_30%),linear-gradient(180deg,rgba(7,17,31,0.03)_0%,rgba(7,17,31,0.55)_66%,rgba(7,17,31,0.82)_100%)]" />

            <div className="relative flex h-full flex-col justify-between gap-8 p-5 sm:p-7 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className={`${iconBadgeClass} border-[var(--media-border)] bg-[var(--media-pill-bg)]`}>
                  {slideIcons[activeSlide.title] ?? null}
                </div>
                <div className="rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--media-pill-text)] backdrop-blur-md">
                  {activeSlide.label}
                </div>
              </div>

              <div
                key={activeSlide.id}
                aria-live="polite"
                aria-atomic="true"
                className="max-w-2xl transition-all duration-500 ease-out motion-reduce:transition-none"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--media-pill-text)]">
                  Integrated module
                </p>
                <h4 className="mt-4 text-2xl font-semibold leading-tight text-[var(--media-text)] sm:text-3xl lg:text-[2.2rem]">
                  {activeSlide.title}
                </h4>
                <p className="mt-4 text-base leading-8 text-[var(--media-muted)] sm:text-lg">
                  {activeSlide.description}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--media-pill-text)] sm:text-base">
                  {activeSlide.detail}
                </p>
              </div>
            </div>
          </article>

          <aside className="grid gap-3 sm:gap-4">
            <div className="rounded-[20px] border border-[var(--media-border)] bg-[var(--media-pill-bg)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-md sm:rounded-[24px] sm:p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--media-pill-text)]">
                Modules
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--media-muted)]">
                Choose a subsystem to inspect, or let the spotlight rotate automatically through the platform.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show subsystem ${index + 1}: ${slide.title}`}
                    aria-pressed={isActive}
                    onClick={() => handleManualSelect(index)}
                    className={`rounded-[20px] border p-4 text-left shadow-[var(--panel-shadow)] backdrop-blur-md transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:rounded-[22px] ${
                      isActive
                        ? "border-[var(--media-border-strong)] bg-[var(--media-surface)] text-[var(--media-text)]"
                        : "border-[var(--media-border)] bg-[var(--media-pill-bg)] text-[var(--media-muted)] hover:border-[var(--media-border-strong)] hover:bg-[var(--media-surface-strong)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className={`font-mono text-[11px] uppercase tracking-[0.24em] ${
                          isActive ? "text-[var(--media-pill-text)]" : "text-[var(--media-pill-text)]"
                        }`}>
                          0{index + 1} {slide.label}
                        </p>
                        <h4 className={`mt-3 text-base font-semibold leading-6 sm:text-lg ${
                          isActive ? "text-[var(--media-text)]" : "text-[var(--media-text)]"
                        }`}>
                          {slide.title}
                        </h4>
                      </div>
                      <span className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border ${
                        isActive
                          ? "border-[var(--media-border-strong)] bg-[var(--media-surface-strong)] text-[var(--media-text)]"
                          : "border-[var(--media-border)] bg-transparent text-[var(--media-pill-text)]"
                      }`}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </span>
                    </div>
                    <p className={`mt-3 text-sm leading-7 ${
                      isActive ? "text-[var(--media-muted)]" : "text-[var(--media-pill-text)]"
                    }`}>
                      {slide.description}
                    </p>
                    <div className="mt-4 h-1.5 rounded-full bg-white/10">
                      <span
                        className={`block h-full rounded-full bg-[var(--accent)] transition-all duration-500 ease-out motion-reduce:transition-none ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
