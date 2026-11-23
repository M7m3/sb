"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { openSignIn } from "@/lib/signInModal";
import { signOut, useSessionState } from "@/lib/demoSession";

/**
 * Navbar entry to the account. Signed out: a "Sign in" button that opens the modal.
 * Signed in: avatar with initials and a small dropdown (Dashboard, History, Sign out).
 */
export function AccountEntry({ className = "" }: { className?: string }) {
  const { session, ready } = useSessionState();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  if (!ready) return <span className={`inline-block h-9 w-16 ${className}`} aria-hidden="true" />;

  if (!session) {
    return (
      <button type="button" onClick={openSignIn} className={`t-ui-nav whitespace-nowrap px-2 text-ink/90 underline-offset-4 transition-colors hover:text-accent-light hover:underline ${className}`}>
        Sign in
      </button>
    );
  }

  return (
    <div ref={box} className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="accent-bg t-ui flex h-9 w-9 items-center justify-center rounded-full text-on-accent"
      >
        {session.initials}
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-10 mt-3 w-48 border border-line bg-surface p-2 shadow-2xl">
          <p className="t-small px-3 py-2 text-muted">{session.name}</p>
          <Link role="menuitem" href="/account" onClick={() => setOpen(false)} className="t-ui block rounded-lg px-3 py-2.5 hover:bg-accent/10">
            Dashboard
          </Link>
          <Link role="menuitem" href="/account/history" onClick={() => setOpen(false)} className="t-ui block rounded-lg px-3 py-2.5 hover:bg-accent/10">
            History
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              signOut();
              setOpen(false);
              router.push("/");
            }}
            className="t-ui block w-full rounded-lg px-3 py-2.5 text-left hover:bg-accent/10"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
