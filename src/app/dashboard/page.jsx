import {
  getInquiryRows,
  getLatestSubmissionLabel,
  getUniqueCompanyCount,
} from "@/lib/dashboard-data";
import DashboardTrendPanel from "@/components/dashboard/DashboardTrendPanel";

export const metadata = {
  title: "Dashboard Overview",
  description: "Overview dashboard for contact inquiries.",
};

function StatCard({ label, value, tone, icon, detail }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-[rgba(10,23,39,0.88)] p-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--inverse-text)]">
            {value}
          </p>
        </div>
        <div
          className={`inline-flex h-11 w-11 items-center justify-center rounded-[14px] ${tone}`}
        >
          {icon}
        </div>
      </div>
      {detail ? (
        <p className="mt-3 text-sm leading-6 text-[var(--inverse-muted)]">
          {detail}
        </p>
      ) : null}
    </div>
  );
}

export default async function DashboardOverviewPage() {
  const { inquiries, error } = await getInquiryRows();
  const totalInquiries = inquiries.length;
  const uniqueCompanies = getUniqueCompanyCount(inquiries);
  const latestSubmission = getLatestSubmissionLabel(inquiries);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-white/8 bg-[var(--surface-inverse)]/96 px-5 py-5 backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-7">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--inverse-muted)]">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--inverse-text)]">
            Inquiry overview
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--inverse-muted)]">
            Live stats and chart from contact inquiry data.
          </p>
        </div>

        <div className="rounded-[16px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--inverse-text)] backdrop-blur-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--inverse-muted)]">
            Latest
          </p>
          <p className="mt-2 font-semibold">{latestSubmission}</p>
        </div>
      </header>

      <div className="grid flex-1 gap-5 overflow-y-auto px-5 py-5 sm:px-6 lg:px-7 lg:py-6">
        {error ? (
          <div className="rounded-[18px] border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm leading-6 text-red-200">
            Unable to load contact inquiries: {error}
          </div>
        ) : null}

        <section className="grid gap-4 lg:grid-cols-2">
          <StatCard
            label="Total Inquiries"
            value={String(totalInquiries)}
            detail="All saved records"
            tone="bg-[rgba(255,157,77,0.12)] text-[#ffaf66]"
            icon={
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5Z" />
                <path d="M8 9h8" />
                <path d="M8 13h5" />
              </svg>
            }
          />
          <StatCard
            label="Unique Companies"
            value={String(uniqueCompanies)}
            detail="Distinct company names"
            tone="bg-[rgba(99,179,255,0.12)] text-[#7cc7ff]"
            icon={
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20V8a2 2 0 0 1 2-2h5v14" />
                <path d="M11 20V4h7a2 2 0 0 1 2 2v14" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
                <path d="M15 8h.01" />
                <path d="M15 12h.01" />
              </svg>
            }
          />
        </section>

        <DashboardTrendPanel inquiries={inquiries} />
      </div>
    </div>
  );
}
