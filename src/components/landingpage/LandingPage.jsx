"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import LandingHeader from "@/components/landingpage/LandingHeader";
import FeatureSlideshow from "@/components/landingpage/FeatureSlideshow";
import ScrollReveal from "@/components/landingpage/ScrollReveal";
import SectionIntro from "@/components/landingpage/SectionIntro";
import {
  capabilityCards,
  companyProfile,
  coreValues,
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
const targetMarketGroupMeta = {
  Primary: {
    eyebrow: "Primary audience",
    title: "Best-fit market segments",
    description:
      "The strongest everyday fit for the platform's connected workflows.",
  },
  Secondary: {
    eyebrow: "Secondary audience",
    title: "Growth-ready segments",
    description:
      "Adjacent audiences that benefit from the same connected system approach.",
  },
};

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

function IconBadge({ children }) {
  return <div className={iconBadgeClass}>{children}</div>;
}

const marketIcons = {
  "Working students": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l9-4 9 4-9 4-9-4Z" />
      <path d="M7 10.5V14a5 5 0 0 0 10 0v-3.5" />
      <circle cx="18" cy="16.5" r="2.5" />
    </svg>
  ),
  "Small & medium businesses": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10h14" />
      <path d="M6 10V7.5L8 6h8l2 1.5V10" />
      <path d="M6 10v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
      <path d="M10 14h4" />
      <path d="M12 10v10" />
    </svg>
  ),
  "Tour & transport companies": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18c2.2-5.3 5.3-8 9.4-8H16" />
      <path d="m14 6 2-2 2 2" />
      <rect x="4" y="13" width="8" height="5" rx="1.5" />
      <path d="M6 18v2" />
      <path d="M10 18v2" />
    </svg>
  ),
  "Start-ups": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4c2.8 1 4.6 3.8 4.6 6.8 0 4.2-3.4 7.6-7.6 7.6-1.3 0-2.6-.3-3.7-.9" />
      <path d="m10 14-3 6 6-3" />
      <path d="M9 11l4-4" />
      <circle cx="15.5" cy="8.5" r="1.5" />
    </svg>
  ),
  "Service-based enterprises": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
      <path d="m16.5 15.5 1 1 2-2.5" />
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

const targetMarketGroups = ["Primary", "Secondary"].map((label) => ({
  label,
  ...targetMarketGroupMeta[label],
  items: targetMarkets.filter((market) => market.label === label),
}));

export default function LandingPage() {
  const [isHomeVisible, setIsHomeVisible] = useState(true);
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

  const heroCtaWrapperClass = `overflow-hidden transition-all ${
    isHomeVisible
      ? "mt-7 max-h-24 opacity-100"
      : "mt-0 max-h-0 pointer-events-none opacity-0"
  }`;

  return (
    <main className="overflow-x-hidden pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pt-28" id="top">
      <LandingHeader
        navigation={navigation}
        primaryButtonClass={primaryButtonClass}
        isHomeVisible={isHomeVisible}
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
                      className={`${primaryButtonClass} min-w-[12rem] sm:min-w-[13.5rem]`}
                      style={{ color: "#000" }}
                    >
                      Connect With Us
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="min-w-0 xl:pt-6">
                <div className="rounded-[20px] border border-[var(--hero-card-border)] bg-[var(--hero-card)] px-5 py-5 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:px-6 sm:py-6 lg:rounded-[32px] lg:px-7 lg:py-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                    Why it works
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-2xl">
                    Clear benefits at a glance.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--hero-subtext)] sm:text-base">
                    The platform reduces manual coordination and keeps key workflows easier to manage day to day.
                  </p>

                  <div className="mt-5 grid gap-3 sm:mt-6">
                    {trustPoints.map((point, index) => (
                      <div
                        key={point}
                        className="rounded-[18px] border border-[var(--hero-card-border)] bg-[var(--hero-card-strong)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] sm:rounded-[24px] sm:p-5"
                      >
                        <div className="flex items-start gap-3">
                          <IconBadge>
                            {index === 0 ? (
                              <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="5" width="16" height="14" rx="2" />
                                <path d="M8 9h8" />
                                <path d="M8 13h6" />
                              </svg>
                            ) : null}
                            {index === 1 ? (
                              <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12h6l2-3 2 6 2-3h4" />
                                <path d="M4 6h16" />
                                <path d="M4 18h16" />
                              </svg>
                            ) : null}
                            {index === 2 ? (
                              <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="7" height="7" rx="1.5" />
                                <rect x="13" y="4" width="7" height="7" rx="1.5" />
                                <rect x="4" y="13" width="7" height="7" rx="1.5" />
                                <path d="M14 15h6" />
                              </svg>
                            ) : null}
                          </IconBadge>
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-[var(--foreground)] sm:text-base">
                              {trustPointTitles[index]}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-[var(--foreground-muted)]">
                              {point}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPadClass} py-10`}>
        <div className={`${frameClass} space-y-6 sm:space-y-8`}>
          <ScrollReveal className={`mt-4 ${sectionPanelClass}`}>
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
            {capabilityCards.map((card, index) => (
              <ScrollReveal
                as="article"
                key={card.title}
                delay={index * 90}
                className="group w-full max-w-[24rem] overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--panel-shadow)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--border-strong)] sm:w-[calc(50%-0.5rem)] sm:rounded-[26px] lg:w-[calc(33.333%-0.75rem)] lg:rounded-[30px] 2xl:w-[calc(20%-0.8rem)]"
              >
                <div
                  className="relative h-52 overflow-hidden sm:h-56"
                  role="img"
                  aria-label={card.imageAlt}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(6, 12, 24, 0.08) 0%, rgba(6, 12, 24, 0.4) 100%), url('${card.image}')`,
                    backgroundPosition: card.imagePosition ?? "center center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
                    <p className="rounded-full border border-white/35 bg-black/35 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                      {card.tag}
                    </p>
                    <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      0{index + 1}
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center sm:p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--foreground-muted)]">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                      className="w-full rounded-[18px] border border-[var(--media-border)] bg-[var(--media-surface)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] backdrop-blur-xl sm:w-[calc(50%-0.5rem)] sm:rounded-[24px] sm:p-5 lg:w-[calc(33.333%-0.75rem)]"
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
                  title="Built for clear, connected daily workflows."
                  description="Designed for audiences that benefit most from connected savings, operations, booking, and record management."
                  align="center"
                />
              </div>

              <div className="grid gap-4 lg:gap-5">
                {targetMarketGroups.map((group, groupIndex) => (
                  <ScrollReveal
                    as="section"
                    key={group.label}
                    delay={groupIndex * 100}
                    className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] sm:rounded-[24px] sm:p-5 lg:p-6"
                  >
                    <div className="border-b border-[var(--border)] pb-4">
                      <div className="mx-auto max-w-2xl text-center">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                          {group.eyebrow}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                          {group.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <div className={`mt-5 grid gap-3 ${
                      group.items.length > 2
                        ? "md:grid-cols-2 xl:grid-cols-3"
                        : "sm:grid-cols-2"
                    }`}>
                      {group.items.map((market, marketIndex) => (
                        <ScrollReveal
                          as="article"
                          key={`${group.label}-${market.title}`}
                          delay={groupIndex * 100 + marketIndex * 80}
                          className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_12px_32px_var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:p-5"
                        >
                          <div className="flex items-start gap-3">
                            <IconBadge>
                              {marketIcons[market.title] ?? null}
                            </IconBadge>
                            <div className="min-w-0">
                              <h4 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl">
                                {market.title}
                              </h4>
                              <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
                                {market.detail}
                              </p>
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
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
              <Link
                href="/contact"
                className={`${primaryButtonClass} w-full sm:w-auto`}
                style={{ color: "#000" }}
              >
                Connect With Us
              </Link>
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
