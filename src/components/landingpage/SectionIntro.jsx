export default function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  descriptionClassName = "",
}) {
  const isDark = tone === "dark";
  const isMedia = tone === "media";
  const isCentered = align === "center";

  return (
    <div className={`max-w-2xl ${isCentered ? "mx-auto text-center" : ""}`}>
      <p
        className={`font-mono text-xs uppercase tracking-[0.34em] ${
          isMedia
            ? "text-[var(--media-intro-accent)]"
            : isDark
              ? "text-[var(--accent)]"
              : "text-[var(--accent-strong)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl ${
          isMedia
            ? "text-[var(--media-intro-text)]"
            : isDark
              ? "text-[var(--inverse-text)]"
              : "text-[var(--foreground)]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-8 sm:text-lg ${
            isMedia
              ? "text-[var(--media-intro-muted)]"
              : isDark
                ? "text-[var(--inverse-muted)]"
                : "text-[var(--foreground-muted)]"
          } ${descriptionClassName}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
