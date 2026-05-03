"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-[16px] border border-white/10 bg-[rgba(10,23,39,0.96)] px-4 py-3 shadow-[0_18px_36px_rgba(0,0,0,0.28)]">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--inverse-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-[var(--inverse-text)]">
        {payload[0].value} request{payload[0].value === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export default function DashboardTrendChart({ data }) {
  return (
    <div className="h-[18rem] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 12, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff9d4d" stopOpacity={0.38} />
              <stop offset="100%" stopColor="#ff9d4d" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "rgba(154,172,191,0.92)", fontSize: 11 }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "rgba(154,172,191,0.92)", fontSize: 11 }}
            width={28}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.14)", strokeWidth: 1 }}
            content={<TrendTooltip />}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#ff9d4d"
            strokeWidth={3}
            fill="url(#trendFill)"
            dot={{ fill: "#ff9d4d", stroke: "rgba(11,18,32,0.9)", strokeWidth: 2, r: 5 }}
            activeDot={{ fill: "#ff9d4d", stroke: "#fff", strokeWidth: 2, r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
