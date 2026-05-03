import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase-config";

export async function createSupabaseServerAuthClient() {
  const cookieStore = await cookies();

  return createServerClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot persist cookies directly.
          }
        },
      },
    }
  );
}

