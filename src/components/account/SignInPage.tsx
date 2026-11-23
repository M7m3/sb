"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInFlow } from "./SignInFlow";
import { useSessionState } from "@/lib/demoSession";

/** /account/sign-in. If you are already signed in you go straight to the dashboard. */
export function SignInPage() {
  const router = useRouter();
  const { session, ready } = useSessionState();

  useEffect(() => {
    if (ready && session) router.replace("/account");
  }, [ready, session, router]);

  return (
    <div data-side="account" className="min-h-screen bg-base px-5 pb-[calc(128px+env(safe-area-inset-bottom))] pt-[88px] text-ink md:pt-32">
      <div className="mx-auto max-w-md">
        <SignInFlow onDone={() => router.push("/account")} />
      </div>
    </div>
  );
}
