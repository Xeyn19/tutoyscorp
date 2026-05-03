import Image from "next/image";
import AuthSignOutButton from "@/components/auth/AuthSignOutButton";
import DashboardSidebarNav from "@/components/dashboard/DashboardSidebarNav";

function DashboardMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/95 shadow-[0_16px_32px_rgba(0,0,0,0.18)]">
        <Image
          src="/tutoy-logo.jpeg"
          alt="TutoY mascot logo"
          width={60}
          height={60}
          className="h-[3.75rem] w-[3.75rem] object-cover"
          priority
        />
      </div>
      <div>
        <p className="text-xl font-semibold tracking-[0.18em] text-[var(--inverse-text)]">
          TUTOY
        </p>
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--inverse-muted)]">
          Admin Workspace
        </p>
      </div>
    </div>
  );
}

export default function DashboardShell({
  children,
  accessEmail,
  totalInquiries = 0,
  supabaseUrl = "",
  supabasePublishableKey = "",
}) {
  return (
    <main className="min-h-screen overflow-x-hidden px-4 py-4 sm:px-5 sm:py-5 lg:h-[100dvh] lg:overflow-hidden lg:px-6">
      <div className="mx-auto grid h-full w-full max-w-[120rem] overflow-hidden rounded-[30px] border border-white/8 bg-[var(--surface-inverse)] shadow-[0_34px_90px_rgba(0,0,0,0.34)] xl:grid-cols-[17.5rem_minmax(0,1fr)]">
        <aside className="border-b border-white/8 bg-[rgba(5,12,24,0.84)] xl:h-full xl:border-b-0 xl:border-r">
          <div className="flex h-full flex-col p-5 sm:p-6">
            <DashboardMark />

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--inverse-muted)]">
                Navigation
              </p>
              <DashboardSidebarNav totalInquiries={totalInquiries} />
            </div>

            <div className="mt-8 rounded-[22px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4 backdrop-blur-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--inverse-muted)]">
                Signed In
              </p>
              <p className="mt-3 break-all text-sm font-semibold text-[var(--inverse-text)]">
                {accessEmail}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--inverse-muted)]">
                Admin access verified.
              </p>
            </div>

            <div className="mt-auto pt-6">
              <AuthSignOutButton
                supabaseUrl={supabaseUrl}
                supabasePublishableKey={supabasePublishableKey}
                className="inline-flex w-full items-center justify-center rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-5 py-3 text-sm font-semibold text-[var(--inverse-text)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>
        </aside>

        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </main>
  );
}
