import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireAdminAccess } from "@/lib/admin-auth";
import { getInquiryRows } from "@/lib/dashboard-data";
import {
  getSupabasePublishableKeyOptional,
  getSupabaseUrlOptional,
} from "@/lib/supabase-config";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  const access = await requireAdminAccess();
  const { inquiries } = await getInquiryRows();
  const supabaseUrl = getSupabaseUrlOptional();
  const supabasePublishableKey = getSupabasePublishableKeyOptional();

  return (
    <DashboardShell
      accessEmail={access.email}
      totalInquiries={inquiries.length}
      supabaseUrl={supabaseUrl}
      supabasePublishableKey={supabasePublishableKey}
    >
      {children}
    </DashboardShell>
  );
}
