"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const manualColor = "rgba(151, 164, 178, 0.88)";
const systemColor = "#ff9d4d";

function wrapTaskLabel(value, maxLineLength = 18) {
  const words = value.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length > maxLineLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function TaskAxisTick({ x, y, payload }) {
  const lines = wrapTaskLabel(payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="rgba(154,172,191,0.92)"
        fontSize={11}
      >
        {lines.map((line, index) => (
          <tspan key={`${payload.value}-${line}`} x={0} dy={index === 0 ? 0 : 14}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function EfficiencyTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0]?.payload;

  if (!row) {
    return null;
  }

  return (
    <div className="rounded-[16px] border border-white/10 bg-[rgba(10,23,39,0.96)] px-4 py-3 shadow-[0_18px_36px_rgba(0,0,0,0.28)]">
      <p className="max-w-[16rem] font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--inverse-muted)]">
        {row.task}
      </p>
      <div className="mt-3 space-y-1.5 text-sm">
        <p className="text-[var(--inverse-text)]">
          Manual Method: {row.manualMinutes} min
        </p>
        <p className="text-[var(--inverse-text)]">
          TutoY Corp System: {row.systemMinutes} min
        </p>
        <p className="font-semibold text-[#ffd4ae]">
          Saved {row.minutesSaved} min ({row.reductionPercent}% faster)
        </p>
      </div>
    </div>
  );
}

export default function EfficiencyProofChart({ data }) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: manualColor }} />
          Manual Method
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: systemColor }} />
          TutoY Corp System
        </span>
      </div>

      <div className="mt-5 h-[25rem] w-full rounded-[20px] border border-[var(--border)] bg-[var(--surface-strong)] p-3 shadow-[var(--panel-shadow)] sm:rounded-[24px] sm:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 16, left: 72, bottom: 6 }}
            barCategoryGap={18}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(154,172,191,0.92)", fontSize: 11 }}
              unit="m"
            />
            <YAxis
              type="category"
              dataKey="task"
              tickLine={false}
              axisLine={false}
              width={138}
              tick={<TaskAxisTick />}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={<EfficiencyTooltip />}
            />
            <Bar
              dataKey="manualMinutes"
              name="Manual Method"
              fill={manualColor}
              radius={[0, 8, 8, 0]}
              barSize={12}
            />
            <Bar
              dataKey="systemMinutes"
              name="TutoY Corp System"
              fill={systemColor}
              radius={[0, 8, 8, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
