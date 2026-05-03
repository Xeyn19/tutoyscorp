"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ToastCard from "@/components/ToastCard";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

function showSuccessToast(title, message) {
  const durationMs = 4700;

  toast(
    <ToastCard
      key={`success-${title}-${durationMs}`}
      tone="success"
      title={title}
      message={message}
      durationMs={durationMs}
    />,
    {
      type: "success",
      autoClose: durationMs,
      closeButton: true,
      icon: false,
    }
  );
}

export default function AuthSignOutButton({
  redirectTo = "/login",
  className = "",
  supabaseUrl = "",
  supabasePublishableKey = "",
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onClick() {
    startTransition(async () => {
      if (supabaseUrl && supabasePublishableKey) {
        const supabase = createSupabaseBrowserClient(
          supabaseUrl,
          supabasePublishableKey
        );
        await supabase.auth.signOut();
      }
      showSuccessToast(
        "Logout successful",
        "You have been signed out of the dashboard."
      );
      router.replace(redirectTo);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className={className}
    >
      {isPending ? "Signing out..." : "Log Out"}
    </button>
  );
}
