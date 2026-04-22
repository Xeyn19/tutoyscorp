import Link from "next/link";
import InquiryForm from "@/components/landingpage/InquiryForm";
import { companyProfile, contactServiceOptions } from "@/data/landingpage-content";

export const metadata = {
  title: "Contact Us",
  description: "Send an inquiry to TutoY Corp Integrated System.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden py-4 sm:py-6 lg:py-8">
      <section className="px-4 sm:px-4 lg:px-6">
        <div className="mx-auto grid w-full max-w-[120rem] gap-4 sm:gap-6 xl:min-h-[calc(100vh-4rem)] xl:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] xl:items-stretch">
          <div className="order-2 rounded-[20px] border border-[var(--border)] bg-[var(--hero-background)] p-4 shadow-[var(--panel-shadow-strong)] sm:rounded-[28px] sm:p-6 lg:p-8 xl:order-1 xl:sticky xl:top-8 xl:min-h-[calc(100vh-4rem)] xl:rounded-[32px] xl:p-10">
            <div className="flex h-full flex-col">
              <div>
                <div className="mb-6 grid gap-3 sm:mb-8 sm:flex sm:flex-wrap">
                  <Link
                    href="/"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm text-[var(--foreground)] transition hover:-translate-y-0.5 sm:w-auto"
                  >
                    Back to Landing Page
                  </Link>
                  <Link
                    href="/#pricing"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm text-[var(--foreground)] transition hover:-translate-y-0.5 sm:w-auto"
                  >
                    View Plans
                  </Link>
                </div>

                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
                  Contact / Inquiry
                </p>
                <h1 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-[var(--hero-text)] sm:text-4xl lg:text-[2.75rem]">
                  Connect with {companyProfile.name}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--hero-subtext)] sm:text-base sm:leading-8">
                  Tell us your requirements and preferred plan. We will
                  review your request and get back to you.
                </p>
              </div>

              <div
                className="mt-6 min-h-[12rem] overflow-hidden rounded-[18px] border border-[var(--border)] shadow-[var(--panel-shadow)] sm:mt-8 sm:min-h-[16rem] sm:rounded-[24px] lg:min-h-[22rem] xl:flex-1"
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

          <div className="order-1 min-w-0 xl:order-2 xl:min-h-[calc(100vh-4rem)]">
            <InquiryForm services={contactServiceOptions} />
          </div>
        </div>
      </section>
    </main>
  );
}
