import InquiryForm from "@/components/landingpage/InquiryForm";
import { companyProfile, contactServiceOptions } from "@/data/landingpage-content";

export const metadata = {
  title: "Contact Us",
  description: "Send an inquiry to TutoY Corp Integrated System.",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden pb-16 pt-6 sm:pt-8">
      <section className="px-2 sm:px-4 lg:px-6">
        <div className="mx-auto grid w-full max-w-[96rem] gap-6">
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] p-4 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:rounded-[32px] lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
              Contact / Inquiry
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-4xl">
              Connect with {companyProfile.name}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--hero-subtext)] sm:text-base sm:leading-8">
              Tell us your requirements and preferred product or service. We will
              review your request and get back to you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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
          </div>

          <InquiryForm services={contactServiceOptions} />
        </div>
      </section>
    </main>
  );
}
