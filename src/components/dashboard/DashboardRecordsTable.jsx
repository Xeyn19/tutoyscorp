"use client";

import { useState } from "react";
import {
  formatInquiryDate,
  getInitials,
  truncateText,
} from "@/lib/dashboard-utils";

function ServiceBadge({ value }) {
  return (
    <span className="inline-flex rounded-full border border-[#2a3b55] bg-[#13243a] px-3 py-1 text-xs font-semibold text-[#8dc0ff]">
      {value || "General inquiry"}
    </span>
  );
}

function MessageModal({ inquiry, onClose }) {
  if (!inquiry) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,8,18,0.72)] p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[24px] border border-white/10 bg-[rgba(10,23,39,0.98)] shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
              Message
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] text-[var(--inverse-text)] transition hover:bg-[rgba(255,255,255,0.08)]"
            aria-label="Close message modal"
          >
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--inverse-text)]">
            {inquiry.message || "No message provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardRecordsTable({ inquiries }) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-[22px] border border-white/8 bg-[rgba(12,24,39,0.94)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[96rem] border-separate border-spacing-0">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.02)]">
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Name
                </th>
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Company
                </th>
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Email
                </th>
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Contact Number
                </th>
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Service
                </th>
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Message
                </th>
                <th className="border-b border-white/8 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--inverse-muted)]">
                  Request Date
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr
                  key={inquiry.id}
                  className={
                    index % 2 === 0
                      ? "bg-transparent"
                      : "bg-[rgba(255,255,255,0.015)]"
                  }
                >
                  <td className="border-b border-white/8 px-5 py-4 align-top">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/8 bg-[rgba(255,255,255,0.03)] text-sm font-semibold text-[var(--inverse-text)]">
                        {getInitials(inquiry.full_name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[var(--inverse-text)]">
                          {inquiry.full_name}
                        </p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--inverse-muted)]">
                          #{inquiry.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-white/8 px-5 py-4 align-top text-sm text-[var(--inverse-muted)]">
                    {inquiry.company_name || "No company"}
                  </td>
                  <td className="border-b border-white/8 px-5 py-4 align-top">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-sm font-medium text-[#ffad66] transition hover:text-[#ffc58f]"
                    >
                      {inquiry.email}
                    </a>
                  </td>
                  <td className="border-b border-white/8 px-5 py-4 align-top text-sm text-[var(--inverse-muted)]">
                    {inquiry.contact_number || "No contact number"}
                  </td>
                  <td className="border-b border-white/8 px-5 py-4 align-top">
                    <ServiceBadge value={inquiry.selected_service} />
                  </td>
                  <td className="border-b border-white/8 px-5 py-4 align-top">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="max-w-[24rem] text-left text-sm leading-6 text-[#ffad66] transition hover:text-[#ffc58f]"
                    >
                      {truncateText(inquiry.message, 96)}
                    </button>
                  </td>
                  <td className="border-b border-white/8 px-5 py-4 align-top">
                    <p className="text-sm font-semibold text-[var(--inverse-text)]">
                      {formatInquiryDate(inquiry.created_at)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MessageModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
      />
    </>
  );
}
