export default function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
}) {
  const isDark = tone === "dark";

  return (
    <div className="max-w-2xl">
      <p
        className={`font-mono text-xs uppercase tracking-[0.34em] ${
          isDark ? "text-[var(--accent)]" : "text-[var(--accent-strong)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl ${
          isDark ? "text-[var(--inverse-text)]" : "text-[var(--foreground)]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-8 sm:text-lg ${
          isDark ? "text-[var(--inverse-muted)]" : "text-[var(--foreground-muted)]"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
