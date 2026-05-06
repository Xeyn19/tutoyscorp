"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import LandingHeader from "@/components/landingpage/LandingHeader";
import EfficiencyProofChart from "@/components/landingpage/EfficiencyProofChart";
import FeatureSlideshow from "@/components/landingpage/FeatureSlideshow";
import ScrollReveal from "@/components/landingpage/ScrollReveal";
import SectionIntro from "@/components/landingpage/SectionIntro";
import WhyItWorksCardDeck from "@/components/landingpage/WhyItWorksCardDeck";
import {
  capabilityCards,
  companyProfile,
  coreValues,
  efficiencyComparisonData,
  operatingModel,
  pricingPreviewPlans,
  trustPoints,
  targetMarkets,
} from "@/data/landingpage-content";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Mission", href: "#mission" },
  { label: "Audience", href: "#target-market" },
  { label: "Pricing", href: "#pricing" },
];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-semibold text-black shadow-[0_20px_50px_var(--glow)] transition hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-sm";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--foreground)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-strong)] sm:px-6 sm:py-3.5 sm:text-sm";

const frameClass = "mx-auto w-full max-w-[90rem] 2xl:max-w-[92rem]";
const sectionPadClass = "px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12";
const sectionPanelClass =
  "rounded-[20px] border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:px-7 sm:py-7 lg:rounded-[32px] lg:px-9 lg:py-8";

const iconClass = "h-5 w-5 text-[var(--accent-strong)]";
const iconBadgeClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] shadow-[var(--panel-shadow)]";
const pricingImagePaths = [
  "/starter.jpg",
  "/professional.jpg",
  "/enterprise.jpg",
];
const pricingImagePositions = ["center 30%", "center center", "center center"];
const trustPointTitles = [
  "Less duplicate work",
  "Shared live visibility",
  "Connected records",
];
const whyItWorksCards = trustPointTitles.map((title, index) => ({
  title,
  description: trustPoints[index],
}));
const targetMarketGridClass = "grid gap-3 md:grid-cols-2 xl:grid-cols-3";

function IconBadge({ children }) {
  return <div className={iconBadgeClass}>{children}</div>;
}

const marketIcons = {
  "Transport Companies": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="12" height="9" rx="2" />
      <path d="M16 10h2.5l1.5 2v4H16" />
      <circle cx="8" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
      <path d="M6 11h6" />
    </svg>
  ),
  "Tourism Agencies": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="m12 6 6 2.5v7L12 13" />
      <path d="m12 6-6 2.5v7l6-2.5" />
      <path d="M12 13v8" />
    </svg>
  ),
  "Booking Services": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="m9.5 15 2 2 4-4" />
    </svg>
  ),
};

const coreValueIcons = {
  Innovation: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.8 5.7L21 9.6l-4.5 4.3 1 6.1L12 17l-5.5 3 1-6.1L3 9.6l6.2-.9L12 3Z" />
    </svg>
  ),
  Integrity: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v5c0 4.4-2.9 8.5-7 10-4.1-1.5-7-5.6-7-10V6l7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </svg>
  ),
  Efficiency: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v8l5 3" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
  Accessibility: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M5 9h14" />
      <path d="M12 7v12" />
      <path d="m8 21 4-7 4 7" />
    </svg>
  ),
  "Customer Focus": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-6-3.8-8.1-7.2C2.3 10.1 3.6 6.7 7 6.1c2-.4 3.6.5 5 2 1.4-1.5 3-2.4 5-2 3.4.6 4.7 4 3.1 6.7C18 16.2 12 20 12 20Z" />
    </svg>
  ),
};

export default function LandingPage() {
  const [isHomeVisible, setIsHomeVisible] = useState(true);
  const [supportsFeatureHover, setSupportsFeatureHover] = useState(true);
  const [activeFeatureCard, setActiveFeatureCard] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const homeSection = document.getElementById("home-section");

    if (!homeSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHomeVisible(entry.isIntersecting);
      },
      {
        rootMargin: "-104px 0px -38% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function syncFeatureInteractionMode() {
      const canHover = mediaQuery.matches;

      setSupportsFeatureHover(canHover);
      setActiveFeatureCard((current) => (canHover ? null : current));
    }

    syncFeatureInteractionMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncFeatureInteractionMode);

      return () =>
        mediaQuery.removeEventListener("change", syncFeatureInteractionMode);
    }

    mediaQuery.addListener(syncFeatureInteractionMode);

    return () => mediaQuery.removeListener(syncFeatureInteractionMode);
  }, []);

  useEffect(() => {
    const sectionIds = navigation
      .map((item) => (item.href.startsWith("#") ? item.href.slice(1) : item.href))
      .filter(Boolean);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let frameId = 0;

    function syncActiveSection() {
      const scrollMarker = window.scrollY + 170;
      let currentSection = null;

      for (const section of sections) {
        if (scrollMarker >= section.offsetTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    }

    function handleScroll() {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(syncActiveSection);
    }

    syncActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const heroCtaWrapperClass = `overflow-hidden transition-all ${
    isHomeVisible
      ? "mt-7 max-h-24 opacity-100"
      : "mt-0 max-h-0 pointer-events-none opacity-0"
  }`;

  return (
    <main className="overflow-x-hidden pb-16 pt-24 sm:pb-20 sm:pt-24 lg:pt-28" id="top">
      <LandingHeader
        navigation={navigation}
        primaryButtonClass={primaryButtonClass}
        isHomeVisible={isHomeVisible}
        activeSection={activeSection}
      />

      <section id="home-section" className={sectionPadClass}>
        <div className={frameClass}>
          <div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] lg:rounded-[36px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--glow),transparent_26%),radial-gradient(circle_at_90%_22%,var(--accent-soft),transparent_25%)]" />
            <div className="absolute -left-20 top-28 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl" />

            <div className="relative z-10 grid gap-6 px-5 pb-7 pt-8 sm:px-8 sm:pb-10 sm:pt-12 lg:gap-8 lg:px-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:items-start xl:px-12 xl:pb-12 xl:pt-16 2xl:px-14">
              <div className="max-w-4xl">
                <p className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent-strong)] shadow-[0_14px_34px_var(--shadow-soft)] sm:px-4 sm:py-2 sm:text-[11px]">
                  {companyProfile.label}
                </p>

                <h1 className="mt-5 max-w-4xl text-[1.8rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--hero-text)] sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl 2xl:text-7xl">
                  {companyProfile.headline}
                </h1>

                {companyProfile.tagline ? (
                  <p className="mt-5 inline-flex rounded-full border border-[var(--hero-card-border)] bg-[var(--hero-card)] px-4 py-2 text-sm font-semibold text-[var(--hero-text)] shadow-[0_14px_34px_var(--shadow-soft)] sm:text-base">
                    {companyProfile.tagline}
                  </p>
                ) : null}

                <div className={heroCtaWrapperClass}>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className={`${primaryButtonClass} w-full sm:w-auto sm:min-w-[13.5rem]`}
                      style={{ color: "#000" }}
                    >
                      Connect With Us
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="flex w-full min-w-0 items-center justify-center pt-10 sm:pt-5 xl:w-auto xl:self-center xl:pt-8">
                <WhyItWorksCardDeck items={whyItWorksCards} />
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPadClass} py-10`}>
        <div className={`${frameClass} space-y-6 sm:space-y-8`}>
          <ScrollReveal className="mt-4">
            <FeatureSlideshow />
          </ScrollReveal>
        </div>
      </section>

      <section
        id="features"
        className={`${sectionPadClass} py-14 lg:py-18`}
      >
        <div className={`${frameClass} space-y-8 sm:space-y-10 lg:space-y-12`}>
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <SectionIntro
              eyebrow="Key Features"
              title="Core capabilities that keep teams aligned daily."
              description="Explore the platform features that connect user access, dashboards, bookings, inventory, and analytics in one streamlined workflow."
              align="center"
            />
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4">
            {capabilityCards.map((card, index) => {
              const isFlipped = activeFeatureCard === card.title;

              return (
                <ScrollReveal
                  as="article"
                  key={card.title}
                  delay={index * 90}
                  className={`group w-full max-w-[24rem] rounded-[20px] md:w-[calc(50%-0.5rem)] sm:rounded-[26px] lg:w-[calc(33.333%-0.75rem)] lg:rounded-[30px] 2xl:w-[calc(20%-0.8rem)] ${
                    isFlipped
                      ? "shadow-[0_20px_48px_var(--shadow-soft)]"
                      : ""
                  }`}
                  style={{ perspective: "1600px" }}
                >
                  <button
                    type="button"
                    aria-pressed={isFlipped}
                    aria-label={`${isFlipped ? "Show image for" : "Show details for"} ${card.title}`}
                    onClick={() => {
                      if (!supportsFeatureHover) {
                        setActiveFeatureCard((current) =>
                          current === card.title ? null : card.title
                        );
                      }
                    }}
                    onMouseEnter={() => {
                      if (supportsFeatureHover) {
                        setActiveFeatureCard(card.title);
                      }
                    }}
                    onMouseLeave={(event) => {
                      if (
                        supportsFeatureHover &&
                        !event.currentTarget.contains(document.activeElement)
                      ) {
                        setActiveFeatureCard(null);
                      }
                    }}
                    onFocus={() => setActiveFeatureCard(card.title)}
                    onBlur={(event) => {
                      if (
                        supportsFeatureHover &&
                        !event.currentTarget.contains(event.relatedTarget)
                      ) {
                        setActiveFeatureCard(null);
                      }
                    }}
                    className={`relative block h-[21rem] w-full rounded-[20px] text-left outline-none transition duration-300 motion-reduce:transition-none sm:h-[22rem] sm:rounded-[26px] lg:h-[23rem] lg:rounded-[30px] ${
                      isFlipped
                        ? "-translate-y-1"
                        : "hover:-translate-y-1 focus-visible:-translate-y-1"
                    }`}
                  >
                    <div
                      className="relative h-full w-full rounded-[20px] transform-gpu [transform-style:preserve-3d] transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:rounded-[26px] lg:rounded-[30px]"
                      style={{
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transformStyle: "preserve-3d",
                        WebkitTransformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="absolute inset-0 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--panel-shadow)] [backface-visibility:hidden] sm:rounded-[26px] lg:rounded-[30px]"
                        role="img"
                        aria-label={card.imageAlt}
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(0deg) translateZ(1px)",
                        }}
                      >
                        <div
                          className="absolute inset-0 transition duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
                          style={{
                            backgroundImage: `url('${card.image}')`,
                            backgroundPosition: card.imagePosition ?? "center center",
                            backgroundSize: "cover",
                          }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,28,0.08)_0%,rgba(8,16,28,0.18)_35%,rgba(8,16,28,0.78)_100%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(107,255,209,0.14),transparent_28%)]" />
                        <div className="absolute inset-x-0 top-0 flex items-start justify-end p-4 sm:p-5">
                          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                            0{index + 1}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <div className="flex min-h-[4.5rem] max-w-[13rem] items-center rounded-[18px] border border-white/12 bg-[rgba(7,17,31,0.52)] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md sm:max-w-[13.5rem] sm:px-4.5 sm:py-3.5">
                            <h3 className="text-[0.98rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.18rem]">
                              {card.shortTitle ?? card.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 overflow-hidden rounded-[20px] border border-[var(--border-strong)] bg-[linear-gradient(180deg,var(--surface-strong)_0%,var(--surface)_100%)] p-5 shadow-[0_20px_48px_var(--shadow-soft)] [backface-visibility:hidden] sm:rounded-[26px] sm:p-6 lg:rounded-[30px] [transform:rotateY(180deg)]"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg) translateZ(1px)",
                        }}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--glow),transparent_34%)] opacity-80" />
                        <div className="relative flex h-full flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <p className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent-strong)] shadow-[var(--panel-shadow)]">
                              {card.tag}
                            </p>
                            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--foreground-muted)]">
                              0{index + 1}
                            </span>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
                              {card.title}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-[var(--foreground-muted)] sm:text-[0.95rem]">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={frameClass}>
          <ScrollReveal className={sectionPanelClass}>
            <div className="mx-auto w-full max-w-6xl space-y-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                  Efficiency Proof
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
                  Compare manual work against TutoY Corp System speed.
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--foreground-muted)]">
                  A direct time comparison across daily workflows, shown in minutes.
                </p>
              </div>
                <EfficiencyProofChart data={efficiencyComparisonData} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="mission" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={`${frameClass} space-y-8 sm:space-y-10 lg:space-y-12`}>
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <SectionIntro
              eyebrow="Mission and Vision"
              title="Clear direction for a connected operational ecosystem."
              description="Our mission and vision define how the platform supports organizations across industries."
              align="center"
            />
          </ScrollReveal>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {operatingModel.map((step, index) => (
              <ScrollReveal
                as="article"
                key={step.label}
                delay={index * 90}
                className="group overflow-hidden rounded-[20px] border border-[var(--media-border)] bg-transparent shadow-[var(--panel-shadow)] transition hover:-translate-y-1 hover:border-[var(--media-border-strong)] sm:rounded-[26px] lg:rounded-[30px]"
              >
                <div
                  className="relative h-56 overflow-hidden sm:h-60"
                  role="img"
                  aria-label={step.imageAlt}
                  style={{
                    backgroundImage: `linear-gradient(180deg, var(--media-overlay-start) 0%, var(--media-overlay-end) 100%), url('${step.image}')`,
                    backgroundPosition: step.imagePosition ?? "center center",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    className="absolute inset-0 transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: "var(--media-accent-overlay)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--media-text)]">
                        {step.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-[var(--media-border)] bg-[var(--media-pill-bg)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--media-pill-text)]">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {step.description ? (
                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-7 text-[var(--foreground-muted)]">
                      {step.description}
                    </p>
                  </div>
                ) : null}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="audience" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={`${frameClass} space-y-8 sm:space-y-10 lg:space-y-12`}>
          <ScrollReveal className="relative overflow-hidden rounded-[20px] border border-[var(--media-border)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] lg:rounded-[32px]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, var(--media-overlay-start) 0%, var(--media-overlay-end) 100%), url('/core-values.jpg')",
                backgroundPosition: "center center",
                backgroundSize: "cover",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "var(--media-accent-overlay)" }}
            />

            <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
              <div className="flex flex-col items-center">
                <SectionIntro
                  eyebrow="Core Values"
                  title="The values that shape how the platform is built."
                  description="Innovation, integrity, efficiency, accessibility, and customer focus guide every decision."
                  tone="dark"
                  align="center"
                  descriptionClassName="text-[var(--core-values-description)]"
                />

                <div className="mt-10 flex w-full max-w-5xl flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4">
                  {coreValues.map((value, index) => (
                    <ScrollReveal
                      as="article"
                      key={value.title}
                      delay={index * 90}
                      className="w-full rounded-[18px] border border-[var(--media-border)] bg-[var(--media-surface)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] backdrop-blur-xl md:w-[calc(50%-0.5rem)] sm:rounded-[24px] sm:p-5 lg:w-[calc(33.333%-0.75rem)]"
                    >
                      <div className={`flex gap-3 ${
                        value.title === "Customer Focus"
                          ? "items-center justify-center text-center"
                          : "items-center"
                      }`}>
                        <IconBadge>
                          {coreValueIcons[value.title] ?? null}
                        </IconBadge>
                        <h3 className="text-lg font-semibold text-[var(--media-text)]">
                          {value.title}
                        </h3>
                      </div>
                      <p className={`mt-4 text-sm leading-7 text-[var(--media-muted)] ${
                        value.title === "Customer Focus"
                          ? "text-center"
                          : ""
                      }`}>
                        {value.detail}
                      </p>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal id="target-market" className={sectionPanelClass}>
            <div className="grid gap-8">
              <div className="mx-auto max-w-3xl text-center">
                <SectionIntro
                  eyebrow="Target Market"
                  title="Built for transport, tourism, and booking operations."
                  description="Designed for service-driven businesses that need connected scheduling, reservations, coordination, and records in one system."
                  align="center"
                />
              </div>

              <div className={targetMarketGridClass}>
                {targetMarkets.map((market, marketIndex) => (
                  <ScrollReveal
                    as="article"
                    key={market.title}
                    delay={marketIndex * 80}
                    className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:rounded-[24px] sm:p-5 lg:p-6"
                  >
                    <div className="flex items-start gap-3">
                      <IconBadge>
                        {marketIcons[market.title] ?? null}
                      </IconBadge>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl">
                          {market.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
                          {market.detail}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="pricing" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={`${frameClass} space-y-8 sm:space-y-10 lg:space-y-12`}>
          <ScrollReveal className="mx-auto max-w-4xl text-center">
            <SectionIntro
              eyebrow="Pricing Preview"
              title="Tiered pricing built for startups, SMEs, and enterprises."
              description="Choose Starter, Professional, or Enterprise plans based on your operational needs and budget."
              align="center"
            />
          </ScrollReveal>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {pricingPreviewPlans.map((plan, index) => (
              <ScrollReveal
                as="article"
                key={plan.name}
                delay={index * 90}
                className="group overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--panel-shadow)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--border-strong)] sm:rounded-[26px] lg:rounded-[30px]"
              >
                <div
                  className="relative h-52 overflow-hidden sm:h-56"
                  style={{
                    backgroundImage:
                      `linear-gradient(180deg, var(--media-overlay-start) 0%, var(--media-overlay-end) 100%), url('${pricingImagePaths[index] ?? "/starter.jpg"}')`,
                    backgroundPosition:
                      pricingImagePositions[index] ?? "center center",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    className="absolute inset-0 transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: "var(--media-accent-overlay)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--media-pill-text)]">
                      Pricing Plan
                    </p>
                    <h3 className="mt-3 max-w-[15rem] text-xl font-semibold leading-tight text-[var(--media-text)] sm:text-2xl">
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                    {plan.price}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
                    {plan.description}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-[var(--foreground-muted)]">
                    {plan.highlights.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[var(--accent-strong)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal
        as="section"
        id="contact"
        className={`${sectionPadClass} pt-10`}
      >
        <div className={`${frameClass} rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] px-5 py-8 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:px-7 sm:py-10 lg:rounded-[36px] lg:px-10 xl:px-12`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                Start the conversation
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-3xl lg:text-4xl">
                See how TutoY Corp Integrated System supports your team.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--hero-subtext)]">
                Explore how the platform unifies finance, operations, and
                booking workflows for more efficient management.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#pricing" className={`${secondaryButtonClass} w-full sm:w-auto`}>
                View Plans
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="footer" className={`${sectionPadClass} pb-6 pt-6 sm:pb-8`}>
        <div className={`${frameClass} text-center`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--foreground-muted)]">
            &copy; {currentYear} TutoY Corp
          </p>
          <p className="mt-3 text-sm text-[var(--foreground-muted)] sm:text-base">
            Landing page designed and developed by Edgar Orosa.
          </p>
        </div>
      </ScrollReveal>

    </main>
  );
}
