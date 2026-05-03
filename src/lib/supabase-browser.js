"use client";

import { createBrowserClient } from "@supabase/ssr";

let browserClient;

export function createSupabaseBrowserClient(url, publishableKey) {
  if (!url || !publishableKey) {
    throw new Error(
      "Supabase browser auth is not configured. Missing URL or publishable key."
    );
  }

  if (!browserClient) {
    browserClient = createBrowserClient(url, publishableKey);
  }

  return browserClient;
}
