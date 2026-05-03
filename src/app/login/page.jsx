import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/auth/AdminLoginForm";
import AuthSignOutButton from "@/components/auth/AuthSignOutButton";
import { companyProfile } from "@/data/landingpage-content";
import { getAdminAccessState } from "@/lib/admin-auth";
import {
  getSupabasePublishableKeyOptional,
  getSupabaseUrlOptional,
} from "@/lib/supabase-config";

export const metadata = {
  title: "Admin Login",
  description: "Log in to review contact inquiries.",
};

export const dynamic = "force-dynamic";

function getLoginMessage(error) {
  if (error === "not-authorized") {
    return "This account is signed in but does not have admin access to the dashboard.";
  }

  return "";
}

export default async function LoginPage({ searchParams }) {
  const supabaseUrl = getSupabaseUrlOptional();
  const supabasePublishableKey = getSupabasePublishableKeyOptional();
  const hasSupabaseUrl = Boolean(supabaseUrl);
  const hasSupabaseBrowserKey = Boolean(supabasePublishableKey);
  const isSupabaseConfigured = hasSupabaseUrl && hasSupabaseBrowserKey;
  const access = isSupabaseConfigured
    ? await getAdminAccessState()
    : {
        isAuthenticated: false,
        isAdmin: false,
        email: "",
      };

  if (access.isAdmin) {
    redirect("/dashboard");
  }

  const nextPath =
    typeof searchParams?.next === "string" && searchParams.next.startsWith("/")
      ? searchParams.next
      : "/dashboard";
  const initialMessage = isSupabaseConfigured
    ? getLoginMessage(searchParams?.error)
    : "Supabase auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment file before using /login.";

  return (
    <main className="min-h-screen overflow-x-hidden px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
      <section className="mx-auto w-full max-w-[120rem]">
        <div
          className="relative isolate overflow-hidden rounded-[28px] border border-white/10 shadow-[var(--panel-shadow-strong)] sm:rounded-[32px] lg:min-h-[calc(100dvh-3rem)]"
          role="img"
          aria-label="Global digital network illustration with connected business profiles"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(7, 17, 31, 0.78) 0%, rgba(7, 17, 31, 0.54) 42%, rgba(7, 17, 31, 0.72) 100%), url('/admin.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,245,213,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
          <div className="relative z-10 flex min-h-[calc(100dvh-2rem)] flex-col p-4 sm:p-6 lg:min-h-[calc(100dvh-3rem)] lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                  Secure Dashboard Login
                </p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                  Review inquiries for {companyProfile.name}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base sm:leading-7">
                  One secure place for authorized admins to sign in, review
                  contact submissions, and manage inquiries without leaving the
                  main portal.
                </p>
              </div>

              <div className="grid gap-3 sm:flex sm:flex-wrap lg:justify-end">
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/14 sm:w-auto"
                >
                  Back to Landing Page
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/14 sm:w-auto"
                >
                  View Contact Page
                </Link>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center py-8 sm:py-10 lg:py-12">
              <div className="w-full max-w-[34rem]">
                <div className="grid gap-4">
                  <AdminLoginForm
                    nextPath={nextPath}
                    initialMessage={initialMessage}
                    isSupabaseConfigured={isSupabaseConfigured}
                    supabaseUrl={supabaseUrl}
                    supabasePublishableKey={supabasePublishableKey}
                  />

                  {access.isAuthenticated && !access.isAdmin ? (
                    <div className="rounded-[24px] border border-white/15 bg-[var(--surface)] p-4 shadow-[var(--panel-shadow)] backdrop-blur-xl sm:p-5">
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        Signed in as {access.email}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                        This account does not have permission to open the admin
                        dashboard. Sign out and use an approved admin account.
                      </p>
                      <AuthSignOutButton
                        supabaseUrl={supabaseUrl}
                        supabasePublishableKey={supabasePublishableKey}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
