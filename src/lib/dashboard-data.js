import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase-server";
export {
  buildTrendData,
  buildTrendGeometry,
  filterInquiriesByQuery,
  formatInquiryDate,
  getCompanyLeadCount,
  getInitials,
  getLatestSubmissionLabel,
  getRecentSevenDayCount,
  getUniqueServiceCount,
  getUniqueCompanyCount,
  truncateText,
} from "@/lib/dashboard-utils";

export async function getInquiryRows() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contact_inquiries")
    .select(
      "id, full_name, email, contact_number, company_name, selected_service, message, created_at"
    )
    .order("created_at", { ascending: false });

  return {
    inquiries: data ?? [],
    error: error?.message ?? "",
  };
}
