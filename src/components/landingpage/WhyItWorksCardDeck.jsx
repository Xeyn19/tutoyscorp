"use client";

import CardSwap, { Card } from "@/components/landingpage/CardSwap";

function BenefitIcon({ variant }) {
  if (variant === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 text-[var(--accent-strong)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 text-[var(--accent-strong)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h6l2-3 2 6 2-3h4" />
        <path d="M4 6h16" />
        <path d="M4 18h16" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-[var(--accent-strong)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M14 15h6" />
    </svg>
  );
}

export default function WhyItWorksCardDeck({ items }) {
  return (
    <CardSwap
      width="100%"
      height={248}
      cardDistance={26}
      verticalDistance={22}
      skewAmount={0}
      easing="power2.out"
      stackClassName="h-[248px] w-full max-w-[29rem]"
      buttonClassName="bg-[var(--hero-card-strong)]"
    >
      {items.map((item, index) => (
        <Card
          key={item.title}
          customClass="w-full bg-[linear-gradient(180deg,var(--hero-card-strong)_0%,var(--surface)_100%)]"
        >
          <article className="flex h-full flex-col rounded-[22px] border border-white/40 bg-[var(--hero-card-strong)]/95 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--panel-shadow)]">
                <BenefitIcon variant={index} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                  Why it works
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-xl">
                  {item.title}
                </h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--foreground-muted)] sm:text-[0.95rem]">
              {item.description}
            </p>
          </article>
        </Card>
      ))}
    </CardSwap>
  );
}
