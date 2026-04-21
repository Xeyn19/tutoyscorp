import InquiryForm from "@/components/landingpage/InquiryForm";
import { companyProfile, contactServiceOptions } from "@/data/landingpage-content";

export const metadata = {
  title: "Contact Us",
  description: "Send an inquiry to TutoY Corp Integrated System.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden py-4 sm:py-6 lg:py-8">
      <section className="flex min-h-screen px-2 sm:px-4 lg:px-6">
        <div className="mx-auto grid w-full max-w-[120rem] gap-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch">
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] p-4 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:sticky lg:top-8 lg:min-h-[calc(100vh-4rem)] lg:rounded-[32px] lg:p-10">
            <div className="flex h-full flex-col">
              <div>
                <div className="mb-8 flex flex-wrap gap-3">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm text-[var(--foreground)] transition hover:-translate-y-0.5"
                  >
                    Back to Landing Page
                  </a>
                  <a
                    href="/#pricing"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm text-[var(--foreground)] transition hover:-translate-y-0.5"
                  >
                    View Plans
                  </a>
                </div>

                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                  Contact / Inquiry
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-4xl">
                  Connect with {companyProfile.name}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--hero-subtext)] sm:text-base sm:leading-8">
                  Tell us your requirements and preferred plan. We will
                  review your request and get back to you.
                </p>
              </div>

              <div
                className="mt-8 min-h-64 flex-1 overflow-hidden rounded-[18px] border border-[var(--border)] shadow-[var(--panel-shadow)] sm:rounded-[24px]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(6, 17, 32, 0.04) 0%, rgba(6, 17, 32, 0.18) 100%), url('/handshake.jpg')",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
                role="img"
                aria-label="Handshake representing collaboration"
              />
            </div>
          </div>

          <div className="min-w-0 lg:min-h-[calc(100vh-4rem)]">
            <InquiryForm services={contactServiceOptions} />
          </div>
        </div>
      </section>
    </main>
  );
}
