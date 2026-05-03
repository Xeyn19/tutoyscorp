"use client";

import { useEffect, useRef, useState } from "react";

export default function ToastCard({
  tone,
  title,
  message,
  durationMs = 0,
}) {
  const badgeLabel =
    tone === "success" ? "SUCCESS" : tone === "error" ? "!" : "...";
  const [remainingMs, setRemainingMs] = useState(durationMs);
  const lastTickRef = useRef(0);

  useEffect(() => {
    if (!durationMs) {
      return undefined;
    }

    lastTickRef.current = Date.now();

    const intervalId = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      lastTickRef.current = now;

      setRemainingMs((current) => Math.max(0, current - elapsed));
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [durationMs]);

  const progressWidth = durationMs
    ? `${Math.max(0, (remainingMs / durationMs) * 100)}%`
    : "100%";

  return (
    <div className={`tutoy-toast-card tutoy-toast-card--${tone}`}>
      <span
        className={`tutoy-toast-card__badge tutoy-toast-card__badge--${tone}`}
        aria-hidden="true"
      >
        {badgeLabel}
      </span>
      <div className="min-w-0">
        <p className="tutoy-toast-card__title">{title}</p>
        <p className="tutoy-toast-card__message">{message}</p>
        {durationMs ? (
          <div className="tutoy-toast-card__timer" aria-hidden="true">
            <div className="tutoy-toast-card__track">
              <span
                className={`tutoy-toast-card__fill tutoy-toast-card__fill--${tone}`}
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
