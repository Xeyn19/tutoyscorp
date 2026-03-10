export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[var(--header-border)] bg-[var(--header-surface)] shadow-[0_18px_40px_var(--shadow-soft)] sm:h-11 sm:w-11 sm:rounded-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--glow),transparent_45%)]" />
        <img
          src="/tutoy-logo.jpeg"
          alt="Tutoy Corp logo"
          className="relative h-full w-full object-cover"
        />
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--brand-mark)] sm:text-[11px] sm:tracking-[0.38em]">
          TUTOY CORP
        </p>
        {!compact ? (
          <p className="text-sm text-[var(--foreground-muted)]">
            Integrated System Platform
          </p>
        ) : null}
      </div>
    </div>
  );
}
