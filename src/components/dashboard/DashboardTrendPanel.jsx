"use client";

import { useState } from "react";
import DashboardTrendChart from "@/components/dashboard/DashboardTrendChart";
import { buildTrendSeries } from "@/lib/dashboard-utils";

const FILTER_OPTIONS = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "custom", label: "Custom Range" },
];

function getButtonClassName(isActive) {
  if (isActive) {
    return "inline-flex items-center justify-center rounded-[14px] bg-[#ff9d4d] px-4 py-2.5 text-sm font-semibold text-slate-950 transition";
  }

  return "inline-flex items-center justify-center rounded-[14px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm font-semibold text-[var(--inverse-text)] transition hover:-translate-y-0.5";
}

function getDescription(mode) {
  if (mode === "weekly") {
    return "Weekly inquiry totals from live submission dates.";
  }

  if (mode === "monthly") {
    return "Monthly inquiry totals from live submission dates.";
  }

  if (mode === "custom") {
    return "Daily inquiry totals for your selected date range.";
  }

  return "Daily inquiry movement for the last seven days.";
}

export default function DashboardTrendPanel({ inquiries }) {
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);

  const [mode, setMode] = useState("daily");
  const [customStart, setCustomStart] = useState(
    weekAgo.toISOString().slice(0, 10)
  );
  const [customEnd, setCustomEnd] = useState(today);

  const trendData = buildTrendSeries(inquiries, mode, customStart, customEnd);

  return (
    <section className="rounded-[26px] border border-white/8 bg-[rgba(10,23,39,0.88)] p-5 shadow-[0_20px_46px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--inverse-muted)]">
            Request Trend
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--inverse-text)]">
            Activity over time
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--inverse-muted)]">
            {getDescription(mode)}
          </p>
        </div>

        <div className="grid gap-3 xl:min-w-[28rem]">
          <div className="flex flex-wrap gap-2 xl:justify-end">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={getButtonClassName(mode === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {mode === "custom" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[var(--inverse-muted)]">
                Start Date
                <input
                  type="date"
                  value={customStart}
                  max={customEnd || today}
                  onChange={(event) => setCustomStart(event.target.value)}
                  className="rounded-[14px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-3 py-2.5 text-[var(--inverse-text)] outline-none focus:border-[#ff9d4d]"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--inverse-muted)]">
                End Date
                <input
                  type="date"
                  value={customEnd}
                  min={customStart || undefined}
                  max={today}
                  onChange={(event) => setCustomEnd(event.target.value)}
                  className="rounded-[14px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-3 py-2.5 text-[var(--inverse-text)] outline-none focus:border-[#ff9d4d]"
                />
              </label>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[22px] border border-white/6 bg-[rgba(255,255,255,0.02)] p-3 sm:p-4">
        {trendData.length > 0 ? (
          <DashboardTrendChart data={trendData} />
        ) : (
          <div className="flex h-[18rem] items-center justify-center text-sm text-[var(--inverse-muted)]">
            Select a valid date range to display chart data.
          </div>
        )}
      </div>
    </section>
  );
}
