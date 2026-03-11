import LandingHeader from "@/components/landingpage/LandingHeader";
import FeatureSlideshow from "@/components/landingpage/FeatureSlideshow";
import SectionIntro from "@/components/landingpage/SectionIntro";
import {
  capabilityCards,
  companyProfile,
  coreValues,
  featuredSignals,
  heroMetrics,
  operatingModel,
  subsystemHighlights,
  targetMarketChart,
  trustPoints,
  targetMarkets,
  workbenchStats,
} from "@/data/landingpage-content";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Mission", href: "#mission" },
  { label: "Audience", href: "#audience" },
];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-semibold text-slate-950 shadow-[0_20px_50px_var(--glow)] transition hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-sm";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--foreground)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-strong)] sm:px-6 sm:py-3.5 sm:text-sm";

const frameClass = "mx-auto w-full max-w-[96rem]";
const sectionPadClass = "px-2 sm:px-4 lg:px-6";
const targetMarketTotal = targetMarketChart.reduce(
  (sum, item) => sum + item.value,
  0
);
const targetMarketGradient = targetMarketChart.reduce(
  (acc, item) => {
    const start = acc.offset;
    const slice = (item.value / targetMarketTotal) * 100;
    const end = start + slice;
    acc.stops.push(
      `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`
    );
    acc.offset = end;
    return acc;
  },
  { stops: [], offset: 0 }
).stops.join(", ");

const iconClass = "h-5 w-5 text-[var(--accent-strong)]";
const iconBadgeClass =
  "flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] shadow-[var(--panel-shadow)]";

function IconBadge({ children }) {
  return <div className={iconBadgeClass}>{children}</div>;
}

const featureIcons = {
  "Unified Role-Based User System": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M13 7a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M4 18a4 4 0 0 1 6-3" />
      <path d="M20 18a4 4 0 0 0-6-3" />
      <path d="M12 14v7" />
      <path d="M9.5 18h5" />
    </svg>
  ),
  "Centralized Smart Dashboard": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 9h4" />
      <path d="M7 13h6" />
      <path d="M15 9h2" />
      <path d="M15 13h2" />
    </svg>
  ),
  "Booking, Appointment, and Order Management": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M7 11h10" />
      <path d="M9 15h6" />
    </svg>
  ),
  "Inventory and Record Management": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M14 15h6" />
      <path d="M14 18h4" />
    </svg>
  ),
  "Goal Tracking and Analytics": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5" />
      <path d="M10 19V9" />
      <path d="M16 19V7" />
      <path d="M3 19h18" />
      <path d="M6 6l4 4 5-5" />
    </svg>
  ),
};

const subsystemIcons = {
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
  "AdventCare Maternity Clinic Management System": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
  "Student Performance Analysis Tool": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5" />
      <path d="M8 15v4" />
      <path d="M12 11v8" />
      <path d="M16 8v11" />
      <path d="M3 19h18" />
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

const marketIcons = {
  "Working students": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4Z" />
      <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
    </svg>
  ),
  "Small and medium-sized businesses": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M8 7V5h8v2" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
    </svg>
  ),
  "Private schools and training centers": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l8-4 8 4-8 4-8-4Z" />
      <path d="M6 12v5h12v-5" />
    </svg>
  ),
  "Maternity and small healthcare clinics": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  "Tour and transport companies": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="7" width="14" height="8" rx="2" />
      <path d="M7 15v2" />
      <path d="M17 15v2" />
    </svg>
  ),
  "Community organizations": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M13 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M4 18a4 4 0 0 1 6-3" />
      <path d="M20 18a4 4 0 0 0-6-3" />
    </svg>
  ),
  "Start-up businesses": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l4 4-4 4-4-4 4-4Z" />
      <path d="M7 14l5 7 5-7" />
    </svg>
  ),
  "Educational institutions": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l9-4 9 4-9 4-9-4Z" />
      <path d="M5 10v6h14v-6" />
    </svg>
  ),
  "Service-based enterprises": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 10h8" />
      <path d="M8 14h6" />
    </svg>
  ),
};

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden pb-16" id="top">
      <section className={`${sectionPadClass} pt-4`}>
        <div className={frameClass}>
          <div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] lg:rounded-[36px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--glow),transparent_26%),radial-gradient(circle_at_90%_22%,var(--accent-soft),transparent_25%)]" />
            <div className="absolute -left-20 top-28 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl" />

            <LandingHeader
              navigation={navigation}
              primaryButtonClass={primaryButtonClass}
            />

            <div className="relative z-10 grid gap-8 px-4 pb-6 pt-8 sm:gap-10 sm:px-8 sm:pb-10 sm:pt-12 lg:gap-12 xl:grid-cols-[1.15fr_0.85fr] xl:items-start xl:px-10 xl:pb-12 xl:pt-16">
              <div className="max-w-3xl xl:max-w-none xl:pr-6">
                <p className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent-strong)] shadow-[0_14px_34px_var(--shadow-soft)] sm:px-4 sm:py-2 sm:text-[11px]">
                  {companyProfile.label}
                </p>

                <h1 className="mt-6 text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--hero-text)] sm:mt-8 sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl 2xl:text-7xl">
                  {companyProfile.headline}
                </h1>

                {companyProfile.tagline ? (
                  <p className="mt-4 text-sm font-semibold text-[var(--hero-text)] sm:text-base">
                    {companyProfile.tagline}
                  </p>
                ) : null}

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--hero-subtext)] sm:mt-5 sm:text-base sm:leading-8 md:text-lg">
                  {companyProfile.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                  {featuredSignals.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--foreground-muted)] shadow-[0_10px_24px_var(--shadow-soft)] sm:px-4 sm:py-2 sm:text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <a href="#features" className={`${primaryButtonClass} w-full sm:w-auto`}>
                    View key features
                  </a>
                </div>

                <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {heroMetrics.map((metric) => (
                    <article
                      key={metric.value}
                      className="rounded-[18px] border border-[var(--hero-card-border)] bg-[var(--hero-card)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl transition hover:-translate-y-1 sm:rounded-[26px] sm:p-5"
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                        {metric.value}
                      </p>
                      <p className="mt-3 text-sm font-medium leading-6 text-[var(--hero-text)]">
                        {metric.label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[var(--hero-subtext)]">
                        {metric.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="relative min-w-0 xl:pl-3">
                <div className="grid gap-4">
                  <div className="rounded-[20px] border border-[var(--hero-card-border)] bg-[var(--hero-card)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px]">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                          Integrated command center
                        </p>
                        <h2 className="mt-3 max-w-sm text-lg font-semibold tracking-tight text-[var(--hero-text)] sm:mt-4 sm:text-2xl lg:text-3xl">
                          Unified operations, visible in one place.
                        </h2>
                      </div>
                      <div className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                        active
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                      <div className="rounded-[18px] border border-[var(--hero-card-border)] bg-[var(--hero-card-strong)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] sm:rounded-[26px] sm:p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[var(--foreground-muted)]">
                            System readiness
                          </p>
                          <p className="text-3xl font-semibold text-[var(--foreground)]">
                            100%
                          </p>
                        </div>
                        <div className="mt-5 h-2 rounded-full bg-[var(--background-secondary)]">
                          <div className="h-2 w-full rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-strong)_100%)]" />
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[var(--foreground-muted)]">
                          Core service areas aligned under one platform for
                          consistent operations and management.
                        </p>
                      </div>

                      <div className="grid gap-3">
                        {workbenchStats.map((item) => (
                          <article
                            key={item.label}
                            className="rounded-[16px] border border-[var(--hero-card-border)] bg-[var(--hero-card)] p-3 sm:rounded-[24px] sm:p-5"
                          >
                            <p className="text-3xl font-semibold text-[var(--hero-text)]">
                              {item.value}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[var(--hero-subtext)]">
                              {item.label}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {trustPoints.map((point, index) => (
                      <div
                        key={point}
                        className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[26px] sm:p-5"
                      >
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
                        <p className="mt-5 text-sm leading-7 text-[var(--foreground-muted)]">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionPadClass} py-10`}>
        <div className={`${frameClass} space-y-4`}>
          <div className="grid gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch lg:gap-6 lg:rounded-[32px] lg:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                Integrated subsystems
              </p>
              <h2 className="mt-3 max-w-lg text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:mt-4 sm:text-3xl">
                Five systems unified under one operational platform.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subsystemHighlights.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-3 text-sm leading-7 text-[var(--foreground-muted)] sm:rounded-[24px] sm:px-4 sm:py-4"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge>
                      {subsystemIcons[signal.title] ?? null}
                    </IconBadge>
                    <span className="font-medium text-[var(--foreground)]">
                      {signal.title}
                    </span>
                  </div>
                  <div className="mt-2">{signal.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
            <FeatureSlideshow />
          </div>
        </div>
      </section>

      <section
        id="features"
        className={`${sectionPadClass} py-14 lg:py-18`}
      >
        <div className={`${frameClass} space-y-4`}>
          <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch lg:gap-6">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <SectionIntro
                eyebrow="Key Features"
                title="Core capabilities that keep teams aligned daily."
                description="Role-based access, smart dashboards, booking tools, record management, and analytics work together in one platform."
              />
            </div>

            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 text-[var(--inverse-text)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
                Platform advantage
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                One platform across business, healthcare, education, and transport operations.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--inverse-muted)]">
                Centralized workflows reduce manual work and keep every team
                aligned with real-time information and shared records.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {capabilityCards.map((card, index) => (
              <article
                key={card.title}
                className="group rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--border-strong)] sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconBadge>
                      {featureIcons[card.title] ?? null}
                    </IconBadge>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                      {card.tag}
                    </p>
                  </div>
                  <span className="text-sm text-[var(--foreground-muted)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-muted)]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={`${frameClass} rounded-[20px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[36px] lg:p-10`}>
          <SectionIntro
            eyebrow="Mission and Vision"
            title="Clear direction for a connected operational ecosystem."
            description="Our mission and vision define how the platform supports organizations across industries."
            tone="dark"
          />

          <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {operatingModel.map((step) => (
              <article
                key={step.label}
                className="rounded-[18px] border border-white/10 bg-[var(--inverse-card)] p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-6 lg:rounded-[28px]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                  {step.label}
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--inverse-text)]">
                  {step.title}
                </h3>
                {step.description ? (
                  <p className="mt-4 text-sm leading-7 text-[var(--inverse-muted)]">
                    {step.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="audience" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={`${frameClass} grid gap-4 lg:grid-cols-[0.45fr_0.55fr]`}>
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <SectionIntro
                eyebrow="Core Values"
                title="The values that shape how the platform is built."
                description="Innovation, integrity, efficiency, accessibility, and customer focus guide every decision."
              />

              <div className="mt-8 space-y-3">
                {coreValues.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--foreground-muted)]"
                  >
                    <span className="font-semibold text-[var(--foreground)]">
                      {value.title}
                    </span>
                    <div className="mt-2">{value.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[26px] sm:p-6 lg:rounded-[30px]">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                  Target Market
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                  Market segments served
                </h3>
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div
                    className="relative h-28 w-28 rounded-full border border-[var(--border)] shadow-[var(--panel-shadow)] sm:h-32 sm:w-32"
                    style={{ background: `conic-gradient(${targetMarketGradient})` }}
                    role="img"
                    aria-label="Target market distribution"
                  />
                  <div className="grid gap-2 text-xs text-[var(--foreground-muted)]">
                    {targetMarketChart.map((segment) => (
                      <div key={segment.label} className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span>{segment.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {targetMarkets.map((market) => (
                <article
                  key={`${market.label}-${market.title}`}
                  className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <IconBadge>
                          {marketIcons[market.title] ?? null}
                        </IconBadge>
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                            {market.label}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                            {market.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="h-px flex-1 bg-[var(--border)] lg:mx-4" />
                    <p className="max-w-md text-sm leading-7 text-[var(--foreground-muted)]">
                      {market.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
      </section>

      <section id="contact" className={`${sectionPadClass} pt-10`}>
        <div className={`${frameClass} rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] px-4 py-8 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:px-6 sm:py-10 lg:rounded-[36px] lg:px-10`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                Start the conversation
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-3xl lg:text-4xl">
                See how TutoY Corp Integrated System supports your team.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--hero-subtext)]">
                Explore how the platform unifies finance, operations, care,
                learning, and booking workflows for efficient operations.
              </p>
            </div>
 
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@tutoyscorp.com"
                className={`${primaryButtonClass} w-full sm:w-auto`}
              >
                Connect
              </a>
              <a href="#top" className={`${secondaryButtonClass} w-full sm:w-auto`}>
                Back to top
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
