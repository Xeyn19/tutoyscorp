export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[var(--header-border)] bg-[var(--header-surface)] shadow-[0_18px_40px_var(--shadow-soft)] sm:h-11 sm:w-11 sm:rounded-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--glow),transparent_45%)]" />
        <div className="grid grid-cols-2 gap-0.5 sm:gap-1">
          <span className="h-2 w-2 rounded-sm bg-[var(--accent)] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-sm bg-[var(--header-text)] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-sm bg-[var(--border-strong)] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-sm bg-[var(--accent-strong)] sm:h-2.5 sm:w-2.5" />
        </div>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--brand-mark)] sm:text-[11px] sm:tracking-[0.38em]">
          TUTOYSCORP
        </p>
        {!compact ? (
          <p className="text-sm text-[var(--foreground-muted)]">
            Technology Systems Company
          </p>
        ) : null}
      </div>
    </div>
  );
}
