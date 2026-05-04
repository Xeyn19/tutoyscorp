"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import DashboardRecordsTable from "@/components/dashboard/DashboardRecordsTable";

function getPollingErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to refresh contact inquiries.";
}

export default function DashboardRecordsLiveSection({
  initialInquiries,
  initialError,
  searchQuery,
}) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [error, setError] = useState(initialError);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const requestIdRef = useRef(0);

  useEffect(() => {
    setInquiries(initialInquiries);
    setError(initialError);
    setSearchValue(searchQuery);
  }, [initialError, initialInquiries, searchQuery]);

  const pollRecords = useEffectEvent(async (signal) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    try {
      const params = new URLSearchParams();

      if (searchQuery) {
        params.set("q", searchQuery);
      }

      const queryString = params.toString();
      const response = await fetch(
        queryString
          ? `/api/dashboard/records?${queryString}`
          : "/api/dashboard/records",
        {
          method: "GET",
          cache: "no-store",
          headers: {
            accept: "application/json",
          },
          signal,
        }
      );

      const payload = await response.json();

      if (signal.aborted || requestId !== requestIdRef.current) {
        return;
      }

      if (response.ok && !payload?.error && Array.isArray(payload?.inquiries)) {
        setInquiries(payload.inquiries);
      }

      setError(
        response.ok && !payload?.error
          ? ""
          : payload?.error || `Unable to load contact inquiries (${response.status}).`
      );
    } catch (error) {
      if (signal.aborted || requestId !== requestIdRef.current) {
        return;
      }

      setError(getPollingErrorMessage(error));
    }
  });

  useEffect(() => {
    let isPolling = false;
    let disposed = false;
    let activeController = null;

    const runPoll = async () => {
      if (disposed || isPolling) {
        return;
      }

      isPolling = true;
      const controller = new AbortController();
      activeController = controller;

      try {
        await pollRecords(controller.signal);
      } finally {
        if (activeController === controller) {
          activeController = null;
        }

        isPolling = false;
      }
    };

    const intervalId = window.setInterval(runPoll, 5000);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
      requestIdRef.current += 1;

      if (activeController) {
        activeController.abort();
      }
    };
  }, [searchQuery]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-white/8 bg-[var(--surface-inverse)]/96 px-5 py-5 backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-7">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--inverse-muted)]">
            Records
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--inverse-text)]">
            Submission records
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--inverse-muted)]">
            Search and review contact submissions.
          </p>
        </div>

        <div className="rounded-[16px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--inverse-text)] backdrop-blur-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--inverse-muted)]">
            Results
          </p>
          <p className="mt-2 font-semibold">
            {inquiries.length} matching requests
          </p>
        </div>
      </header>

      <div className="grid flex-1 gap-5 overflow-y-auto px-5 py-5 sm:px-6 lg:px-7 lg:py-6">
        <section className="overflow-hidden rounded-[26px] border border-white/8 bg-[rgba(10,23,39,0.88)] shadow-[0_20px_46px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <div className="p-5">
            <form action="/dashboard/records" method="get">
              <div className="flex flex-col gap-3 xl:flex-row">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--inverse-muted)]">
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
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="q"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search by name, company, email, contact, service, or message"
                    className="w-full rounded-[16px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-12 py-3 text-sm text-[var(--inverse-text)] outline-none placeholder:text-[var(--inverse-muted)] focus:border-[#ff9d4d]"
                  />
                </div>

                <div className="flex flex-col gap-3 xl:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-[16px] bg-[#ff9d4d] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Search
                  </button>
                  <Link
                    href="/dashboard/records"
                    className="inline-flex items-center justify-center rounded-[16px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-5 py-3 text-sm font-semibold text-[var(--inverse-text)] transition hover:-translate-y-0.5"
                  >
                    Clear
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {error ? (
            <div className="px-5 pb-5">
              <div className="rounded-[18px] border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm leading-6 text-red-200">
                Unable to load contact inquiries: {error}
              </div>
            </div>
          ) : null}

          {!error && inquiries.length === 0 ? (
            <div className="px-5 pb-5">
              <div className="rounded-[20px] border border-white/8 bg-[rgba(255,255,255,0.03)] px-5 py-6 text-sm leading-6 text-[var(--inverse-muted)]">
                No inquiries matched your current search.
              </div>
            </div>
          ) : null}

          {inquiries.length > 0 ? (
            <DashboardRecordsTable inquiries={inquiries} />
          ) : null}
        </section>
      </div>
    </div>
  );
}
