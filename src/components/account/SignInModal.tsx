"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/brand/Icons";
import { SignInFlow } from "./SignInFlow";
import { closeSignIn, useSignInOpen } from "@/lib/signInModal";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Sign in as a modal. Opened from the navbar. The same flow also lives at /account/sign-in. */
export function SignInModal() {
  const open = useSignInOpen();
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("input, button[role=tab]")?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return closeSignIn();
    if (e.key !== "Tab") return;
    const items = [...(panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-scrim/70 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeSignIn}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Sign in"
            onKeyDown={onKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 sm:rounded-3xl sm:p-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <button type="button" onClick={closeSignIn} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
              <CloseIcon size={20} />
            </button>
            <SignInFlow
              titleClass="t-display-m"
              onDone={() => {
                closeSignIn();
                router.push("/account");
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
