import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  getSupabasePublishableKeyOptional,
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase-config";

export async function updateSupabaseSession(request) {
  if (!getSupabasePublishableKeyOptional()) {
    return NextResponse.next({
      request,
    });
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  await supabase.auth.getClaims();

  return response;
}
