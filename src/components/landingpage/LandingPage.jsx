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
  operatingPrinciples,
  subsystemHighlights,
  trustPoints,
  targetMarkets,
  workbenchStats,
} from "@/data/landingpage-content";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Mission", href: "#mission" },
  { label: "Audience", href: "#audience" },
];

const deliveryLayers = [
  { label: "Financial management", value: 92 },
  { label: "Business operations", value: 88 },
  { label: "Healthcare services", value: 84 },
  { label: "Education monitoring", value: 86 },
  { label: "Bookings and transport", value: 90 },
];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-semibold text-slate-950 shadow-[0_20px_50px_var(--glow)] transition hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-sm";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--foreground)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-strong)] sm:px-6 sm:py-3.5 sm:text-sm";

const frameClass = "mx-auto w-full max-w-[96rem]";
const sectionPadClass = "px-2 sm:px-4 lg:px-6";

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden pb-16" id="top">
      <section className={`${sectionPadClass} pt-4 reveal`}>
        <div className={frameClass}>
          <div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] lg:rounded-[36px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--glow),transparent_26%),radial-gradient(circle_at_90%_22%,var(--accent-soft),transparent_25%)]" />
            <div className="absolute -left-20 top-28 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl" />

            <LandingHeader
              navigation={navigation}
              primaryButtonClass={primaryButtonClass}
            />

            <div className="relative z-10 grid gap-8 px-4 pb-6 pt-8 sm:gap-10 sm:px-8 sm:pb-10 sm:pt-12 xl:grid-cols-[1.05fr_0.95fr] xl:px-10 xl:pb-12 xl:pt-16">
              <div className="max-w-3xl xl:max-w-none">
                <p className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent-strong)] shadow-[0_14px_34px_var(--shadow-soft)] sm:px-4 sm:py-2 sm:text-[11px]">
                  {companyProfile.label}
                </p>

                <h1 className="mt-6 text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--hero-text)] sm:mt-8 sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl 2xl:text-7xl">
                  {companyProfile.headline}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--hero-subtext)] sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
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
                  <a href="#contact" className={`${primaryButtonClass} w-full sm:w-auto`}>
                    Request a demo
                  </a>
                  <a
                    href="#features"
                    className={`${secondaryButtonClass} w-full sm:w-auto`}
                  >
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

              <div className="relative min-w-0">
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

                    <div className="mt-5 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="rounded-[18px] border border-[var(--hero-card-border)] bg-[var(--hero-card-strong)] p-4 shadow-[0_16px_40px_var(--shadow-soft)] sm:rounded-[26px] sm:p-5">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[var(--foreground-muted)]">
                              Subsystem coverage
                            </p>
                            <p className="text-3xl font-semibold text-[var(--foreground)]">
                              5/5
                            </p>
                          </div>
                          <div className="mt-5 h-2 rounded-full bg-[var(--background-secondary)]">
                            <div className="h-2 w-full rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-strong)_100%)]" />
                          </div>
                          <p className="mt-5 text-sm leading-6 text-[var(--foreground-muted)]">
                            All five service domains are connected within the
                            same platform.
                          </p>
                        </div>

                        <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 text-[var(--inverse-text)] shadow-[0_18px_50px_var(--shadow-soft)] sm:rounded-[26px] sm:p-5">
                          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                            Guiding values
                          </p>
                          <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                            {operatingPrinciples.map((principle) => (
                              <div
                                key={principle}
                              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--inverse-muted)]"
                            >
                              {principle}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

                    <div className="mt-3 rounded-[18px] border border-[var(--hero-card-border)] bg-[var(--hero-card)] p-4 sm:mt-4 sm:rounded-[26px] sm:p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[var(--hero-text)]">
                          System coverage layers
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                          synced daily
                        </p>
                      </div>

                      <div className="mt-5 space-y-4">
                        {deliveryLayers.map((item) => (
                          <div key={item.label}>
                            <div className="flex items-center justify-between text-sm text-[var(--foreground-muted)]">
                              <span>{item.label}</span>
                              <span>{item.value}%</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-[var(--background-secondary)]">
                              <div
                                className="h-2 rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-strong)_100%)]"
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {trustPoints.map((point) => (
                      <div
                        key={point}
                        className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[26px] sm:p-5"
                      >
                        <div className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)]" />
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

      <section className={`${sectionPadClass} py-10 reveal-delayed`}>
        <div className={`${frameClass} space-y-4`}>
          <div className="grid gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch lg:gap-6 lg:rounded-[32px] lg:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                Integrated subsystems
              </p>
              <h2 className="mt-3 max-w-lg text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:mt-4 sm:text-3xl">
                Five subsystems coordinated through a shared workflow.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subsystemHighlights.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-[16px] border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-3 text-sm leading-7 text-[var(--foreground-muted)] sm:rounded-[24px] sm:px-4 sm:py-4"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {signal.title}
                  </span>
                  <div>{signal.detail}</div>
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
        className={`${sectionPadClass} py-14 lg:py-18 reveal`}
      >
        <div className={`${frameClass} space-y-4`}>
          <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch lg:gap-6">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <SectionIntro
                eyebrow="Key Features"
                title="Everything needed to run daily operations from one system."
                description="From secure access to analytics, each feature keeps teams aligned across finance, operations, healthcare, education, and transport services."
              />
            </div>

            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 text-[var(--inverse-text)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
                Platform advantage
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                One platform across schools, clinics, businesses, and transport.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--inverse-muted)]">
                Shared records and schedules reduce manual work and keep every
                team aligned with accurate data.
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
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                    {card.tag}
                  </p>
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

      <section id="mission" className={`${sectionPadClass} py-14 lg:py-18 reveal-delayed`}>
        <div className={`${frameClass} rounded-[20px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[36px] lg:p-10`}>
          <SectionIntro
            eyebrow="Mission and Vision"
            title="A platform built to help communities manage daily work."
            description="Tutoy Corp Integrated System is guided by clear commitments to productivity, care, and reliable service delivery."
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

      <section id="audience" className={`${sectionPadClass} py-14 lg:py-18 reveal`}>
        <div className={`${frameClass} grid gap-4 lg:grid-cols-[0.45fr_0.55fr]`}>
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <SectionIntro
                eyebrow="Core Values"
                title="Principles that keep the system practical and trusted."
                description="These values guide every feature of the platform, from security to usability."
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
                  Primary and secondary audiences
                </h3>
              </div>
              {targetMarkets.map((market) => (
                <article
                  key={`${market.label}-${market.title}`}
                  className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                        {market.label} market
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">
                        {market.title}
                      </h3>
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

      <section id="contact" className={`${sectionPadClass} pt-10 reveal-delayed`}>
        <div className={`${frameClass} rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] px-4 py-8 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:px-6 sm:py-10 lg:rounded-[36px] lg:px-10`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                Start the conversation
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-3xl lg:text-4xl">
                See how Tutoy Corp Integrated System supports your team.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--hero-subtext)]">
                Book a walkthrough to see how the platform unifies finance,
                operations, healthcare, education, and transport workflows.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@tutoyscorp.com"
                className={`${primaryButtonClass} w-full sm:w-auto`}
              >
                Request a demo
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
