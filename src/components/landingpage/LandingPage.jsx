import LandingHeader from "@/components/landingpage/LandingHeader";
import SectionIntro from "@/components/landingpage/SectionIntro";
import {
  capabilityCards,
  companyProfile,
  featuredSignals,
  heroMetrics,
  industrySignals,
  operatingModel,
  operatingPrinciples,
  trustPoints,
  workbenchStats,
} from "@/data/landingpage-content";

const navigation = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Impact", href: "#impact" },
];

const deliveryLayers = [
  { label: "Strategy", value: 92 },
  { label: "Architecture", value: 86 },
  { label: "Product Delivery", value: 81 },
  { label: "Operations", value: 76 },
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
                    Book a strategy session
                  </a>
                  <a
                    href="#capabilities"
                    className={`${secondaryButtonClass} w-full sm:w-auto`}
                  >
                    Explore our capabilities
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
                          Delivery command center
                        </p>
                        <h2 className="mt-3 max-w-sm text-lg font-semibold tracking-tight text-[var(--hero-text)] sm:mt-4 sm:text-2xl lg:text-3xl">
                          Modern product operations, visible in one place.
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
                            Roadmap confidence
                          </p>
                          <p className="text-3xl font-semibold text-[var(--foreground)]">
                            92%
                          </p>
                        </div>
                        <div className="mt-5 h-2 rounded-full bg-[var(--background-secondary)]">
                          <div className="h-2 w-[92%] rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-strong)_100%)]" />
                        </div>
                        <p className="mt-5 text-sm leading-6 text-[var(--foreground-muted)]">
                          Architecture, product scope, and delivery rituals all
                          visible before execution starts to drift.
                        </p>
                      </div>

                      <div className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 text-[var(--inverse-text)] shadow-[0_18px_50px_var(--shadow-soft)] sm:rounded-[26px] sm:p-5">
                        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                          Principles
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
                          Core delivery layers
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--foreground-muted)]">
                          synced weekly
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

      <section className={`${sectionPadClass} py-10`}>
        <div className={frameClass}>
          <div className="grid gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 xl:grid-cols-[0.88fr_1.12fr] lg:rounded-[32px] lg:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                Designed for modern teams
              </p>
              <h2 className="mt-3 max-w-lg text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:mt-4 sm:text-3xl">
                UX that feels more like a product cockpit than a brochure.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {industrySignals.map((signal) => (
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
        </div>
      </section>

      <section
        id="capabilities"
        className={`${sectionPadClass} py-14 lg:py-18`}
      >
        <div className={frameClass}>
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <SectionIntro
                eyebrow="Capabilities"
                title="A more premium, structured presentation of what TUTOYSCORP actually delivers."
                description="The layout now behaves like a modern technology brand: sharper hierarchy, richer spacing, clearer actions, and reusable content blocks."
              />
            </div>

            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 text-[var(--inverse-text)] shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
                Featured advantage
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                One partner across architecture, AI, delivery, and operations.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--inverse-muted)]">
                That reduces context switching for stakeholders and keeps the
                system design aligned with the actual release plan.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
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

      <section id="process" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={`${frameClass} rounded-[20px] border border-[var(--border)] bg-[var(--surface-inverse)] p-4 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[36px] lg:p-10`}>
          <SectionIntro
            eyebrow="Execution Model"
            title="The delivery path is clearer, more visual, and easier to trust."
            description="Instead of generic marketing sections, the page now explains how TUTOYSCORP works in a way that feels operational and credible."
            tone="dark"
          />

          <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {operatingModel.map((step) => (
              <article
                key={step.phase}
                className="rounded-[18px] border border-white/10 bg-[var(--inverse-card)] p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-6 lg:rounded-[28px]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                  Phase {step.phase}
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--inverse-text)]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--inverse-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className={`${sectionPadClass} py-14 lg:py-18`}>
        <div className={frameClass}>
          <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-8">
              <SectionIntro
                eyebrow="Impact"
                title="Built for teams that need cleaner systems, not decorative buzzwords."
                description="The UX is now more useful for decision-makers: strong scanning, more differentiated sections, and a clearer path from headline to action."
              />

              <div className="mt-8 space-y-3">
                {operatingPrinciples.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-4 text-sm text-[var(--foreground-muted)]"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {industrySignals.map((signal) => (
                <article
                  key={signal.title}
                  className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:rounded-[26px] sm:p-6 lg:rounded-[30px]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">
                      {signal.title}
                    </h3>
                    <div className="h-px flex-1 bg-[var(--border)] lg:mx-4" />
                    <p className="max-w-md text-sm leading-7 text-[var(--foreground-muted)]">
                      {signal.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
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
                Build a cleaner, faster technology foundation with TUTOYSCORP.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--hero-subtext)]">
                The page is now organized for growth. You can add case studies,
                testimonials, forms, or service detail pages without rebuilding
                the structure again.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@tutoyscorp.com"
                className={`${primaryButtonClass} w-full sm:w-auto`}
              >
                hello@tutoyscorp.com
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
