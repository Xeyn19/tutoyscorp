import { getAdminAccessState } from "@/lib/admin-auth";
import { getInquiryRows } from "@/lib/dashboard-data";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const access = await getAdminAccessState();

    if (!access.isAuthenticated) {
      return Response.json({ error: "Authentication required." }, { status: 401 });
    }

    if (!access.isAdmin) {
      return Response.json({ error: "Admin access required." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";
    const { inquiries, error } = await getInquiryRows(query);

    if (error) {
      return Response.json({ inquiries, error }, { status: 500 });
    }

    return Response.json({ inquiries, error: "" });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Unexpected server error while loading records.";

    return Response.json({ inquiries: [], error: message }, { status: 500 });
  }
}
