import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerAuthClient } from "@/lib/supabase-auth-server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export async function getAdminAccessState() {
  const supabase = await createSupabaseServerAuthClient();
  const claimsResponse = await supabase.auth.getClaims();
  const claims = claimsResponse.data?.claims ?? null;
  const claimsError = claimsResponse.error;

  if (claimsError || !claims?.email) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      email: "",
      claims: null,
    };
  }

  const email = normalizeEmail(claims.email);
  const serviceSupabase = createSupabaseServerClient();
  const { data: adminRecord, error: adminError } = await serviceSupabase
    .from("admin_users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (adminError) {
    throw new Error(
      `Failed to verify admin access: ${adminError.message}`
    );
  }

  return {
    isAuthenticated: true,
    isAdmin: Boolean(adminRecord),
    email,
    claims,
  };
}

export async function requireAdminAccess() {
  const access = await getAdminAccessState();

  if (!access.isAuthenticated) {
    redirect("/login?next=%2Fdashboard");
  }

  if (!access.isAdmin) {
    redirect("/login?error=not-authorized");
  }

  return access;
}
