"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSessionState } from "@/lib/demoSession";

const NAV = [
  { href: "/account", label: "Overview" },
  { href: "/account/garage", label: "My Garage" },
  { href: "/account/places", label: "My Places" },
  { href: "/account/history", label: "History" },
  { href: "/account/bookings", label: "Bookings" },
  { href: "/account/profile", label: "Profile" },
];

/**
 * Account area frame. Neutral dark theme (data-side="account") that works for both sides.
 * Protected by the DEMO session: without one you are sent to the sign in page.
 */
export function AccountShell({ children }: { children: React.ReactNode }) {
  const { session, ready } = useSessionState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !session) router.replace("/account/sign-in");
  }, [ready, session, router]);

  return (
    <div data-side="account" className="min-h-screen bg-base pb-[calc(128px+env(safe-area-inset-bottom))] pt-[72px] text-ink md:pb-24 md:pt-24">
      {!ready || !session ? (
        <p className="t-small px-5 py-16 text-center text-muted" role="status">
          Loading your account...
        </p>
      ) : (
        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:grid lg:grid-cols-[210px_1fr] lg:gap-12">
          <p className="t-small mb-4 border-l-2 border-accent pl-3 text-ink/80 lg:col-span-2" role="note">
            Demo account. Sign in is not live yet and none of this data is real.
          </p>

          {/* Desktop: vertical nav. Phones: scrolling tab row. */}
          <nav aria-label="Account" className="swipe-row -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 lg:sticky lg:top-24 lg:mx-0 lg:mb-0 lg:block lg:self-start lg:overflow-visible lg:px-0 lg:[-webkit-mask-image:none] lg:[mask-image:none]">
            {NAV.map((n) => {
              const active = n.href === "/account" ? pathname === "/account" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`t-ui flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 transition-colors lg:mb-1 lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 ${
                    active ? "border-accent bg-accent/15 text-accent-light" : "border-accent/25 text-ink/80 hover:text-ink lg:border-transparent"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <main className="min-w-0">{children}</main>
        </div>
      )}
    </div>
  );
}
