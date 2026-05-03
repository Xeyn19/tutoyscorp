"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getLinkClassName(isActive) {
  if (isActive) {
    return "flex items-center justify-between rounded-[18px] border border-[#ff9d4d]/30 bg-[rgba(255,157,77,0.16)] px-4 py-3 text-sm text-[#ffd3aa] transition";
  }

  return "flex items-center justify-between rounded-[18px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--inverse-text)] transition hover:-translate-y-0.5 hover:border-white/14 hover:bg-[rgba(255,255,255,0.05)]";
}

export default function DashboardSidebarNav({ totalInquiries = 0 }) {
  const pathname = usePathname();

  return (
    <div className="mt-4 grid gap-3">
      <Link
        href="/dashboard"
        className={getLinkClassName(pathname === "/dashboard")}
      >
        <span className="font-semibold">Overview</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--inverse-muted)]">
          {totalInquiries}
        </span>
      </Link>
      <Link
        href="/dashboard/records"
        className={getLinkClassName(pathname === "/dashboard/records")}
      >
        <span className="font-semibold">Records</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--inverse-muted)]">
          {totalInquiries}
        </span>
      </Link>
    </div>
  );
}
