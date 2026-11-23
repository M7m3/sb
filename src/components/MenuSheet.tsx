"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";
import { ArrowIcon, CloseIcon, PhoneIcon } from "./brand/Icons";
import { useSide } from "./SideProvider";
import { sideContent } from "@/content";
import { business } from "@/content/business";
import { sidePath, site, sideMeta, type Side } from "@/content/site";
import { signOut, useSessionState } from "@/lib/demoSession";
import { hoursSummary } from "@/lib/businessStatus";

type Props = { open: boolean; onClose: () => void; returnFocusTo: React.RefObject<HTMLButtonElement | null> };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Bottom sheet for phones: section links, areas, hours, phone and the other side. Drag the handle down, tap outside or press Escape to close. */
export function MenuSheet({ open, onClose, returnFocusTo }: Props) {
  const { side, switchSide, busy } = useSide();
  const reduce = useReducedMotion();
  const controls = useDragControls();
  const panel = useRef<HTMLDivElement>(null);
  const links = sideContent[side].editorial.menuLinks;
  const other: Side = side === "locksmith" ? "automotive" : "locksmith";
  const hours = hoursSummary();
  const { session } = useSessionState();
  const router = useRouter();
  const prefix = usePathname().startsWith("/account") ? sidePath[side] : "";

  // Lock page scroll, move focus into the sheet, give it back when closed.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const returnTo = returnFocusTo.current;
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus(), 50);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus();
    };
  }, [open, returnFocusTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
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

  const goOther = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (busy) return;
    const r = e.currentTarget.getBoundingClientRect();
    onClose();
    switchSide(other, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-[55] bg-scrim/60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onKeyDown={onKeyDown}
            className="fixed inset-x-0 bottom-0 z-[60] max-h-[86svh] overflow-y-auto rounded-t-3xl border-t border-line bg-surface md:hidden"
            style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 380, damping: 38 }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) onClose();
            }}
          >
            {/* Drag handle */}
            <div className="flex touch-none justify-center pb-2 pt-3" onPointerDown={(e) => controls.start(e)}>
              <span className="h-1.5 w-12 rounded-full bg-accent/40" />
            </div>

            <div className="flex items-center justify-between px-6">
              <p className="t-label text-accent-light">{sideMeta[side].label} menu</p>
              <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Account */}
            <div className="mx-6 mt-3 border border-line p-4">
              {session ? (
                <div className="flex items-center justify-between gap-3">
                  <Link href="/account" onClick={onClose} className="flex min-w-0 items-center gap-3">
                    <span className="accent-bg t-ui flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-on-accent">{session.initials}</span>
                    <span className="min-w-0">
                      <span className="t-ui block truncate">Hi, {session.first}</span>
                      <span className="t-small block text-muted">Dashboard and history</span>
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      onClose();
                      router.push("/");
                    }}
                    className="t-small min-h-11 px-2 text-accent-light underline underline-offset-4"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link href="/account/sign-in" onClick={onClose} className="flex min-h-11 items-center justify-between">
                  <span className="t-ui">Sign in</span>
                  <ArrowIcon size={20} className="text-accent" />
                </Link>
              )}
            </div>

            <nav aria-label="Sections" className="mt-2 px-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={`${prefix}${l.href}`}
                  onClick={onClose}
                  className="flex min-h-14 items-center justify-between border-b border-line"
                >
                  <span className="t-heading">{l.label}</span>
                  <ArrowIcon size={22} className="text-accent" />
                </Link>
              ))}
            </nav>

            <div className="mt-8 px-6">
              <p className="t-label text-accent-light">Areas we serve</p>
              <ul className="t-small mt-3 flex flex-wrap gap-x-4 gap-y-1 text-ink/85">
                {site.areas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 px-6">
              <p className="t-label text-accent-light">Hours</p>
              <ul className="t-small mt-3 space-y-1 text-ink/85">
                {hours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.time}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 px-6">
              <a href={business.phoneHref} className="accent-bg t-ui flex min-h-12 items-center justify-center gap-2 rounded-full text-on-accent">
                <PhoneIcon size={20} /> {business.phone}
              </a>
              <button
                type="button"
                onClick={goOther}
                className="t-ui flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/60 text-ink"
              >
                Switch to {sideMeta[other].label} <ArrowIcon size={20} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
