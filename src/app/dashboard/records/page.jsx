import DashboardRecordsLiveSection from "@/components/dashboard/DashboardRecordsLiveSection";
import { getInquiryRows } from "@/lib/dashboard-data";

export const metadata = {
  title: "Dashboard Records",
  description: "Inquiry records table for contact submissions.",
};

export default async function DashboardRecordsPage({ searchParams }) {
  const searchQuery =
    typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
  const { inquiries, error } = await getInquiryRows(searchQuery);

  return (
    <DashboardRecordsLiveSection
      initialInquiries={inquiries}
      initialError={error}
      searchQuery={searchQuery}
    />
  );
}
