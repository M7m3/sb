"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { AutomotiveIcon, LocksmithIcon } from "./brand/SideIcons";
import { BookIcon, MenuIcon, PhoneIcon } from "./brand/Icons";
import { MenuSheet } from "./MenuSheet";
import { useSide } from "./SideProvider";
import { business } from "@/content/business";
import { sidePath, type Side } from "@/content/site";

const HINT_KEY = "sb-tab-hint-seen";

/** Phones only. Floating bottom tab bar. The Locksmith and Automotive tabs are the side switch. */
export function TabBar() {
  const { shown, busy, switchSide } = useSide();
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // First visit only: a pulsing dot on the Automotive tab hints that it can be switched.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(HINT_KEY) === "1";
    } catch {}
    if (seen) return;
    const t1 = setTimeout(() => setHint(true), 1800);
    const t2 = setTimeout(() => {
      setHint(false);
      try {
        sessionStorage.setItem(HINT_KEY, "1");
      } catch {}
    }, 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const choose = (to: Side, el: HTMLElement) => {
    if (busy || to === shown) return;
    setHint(false);
    try {
      sessionStorage.setItem(HINT_KEY, "1");
    } catch {}
    const r = el.getBoundingClientRect();
    switchSide(to, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  const goBook = () => {
    const el = document.getElementById("book");
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    else router.push(`${sidePath[shown]}#book`); // on the account pages
  };

  const tab = (side: Side, label: string, Icon: typeof LocksmithIcon) => {
    const active = shown === side;
    return (
      <button
        type="button"
        role="radio"
        aria-checked={active}
        aria-label={`${label} services`}
        onClick={(e) => choose(side, e.currentTarget)}
        className={`group relative flex h-full flex-col items-center justify-center gap-0.5 rounded-full transition-colors ${
          active ? "text-accent" : "text-muted"
        }`}
      >
        {active && (
          <motion.span
            layoutId="tab-pill"
            className="absolute inset-x-1 inset-y-1.5 rounded-full border border-accent/40 bg-accent/15"
            transition={reduce ? { duration: 0.1 } : { type: "spring", stiffness: 500, damping: 38 }}
          />
        )}
        <span className="relative">
          <Icon size={22} />
          {side === "automotive" && hint && !active && (
            <span aria-hidden="true" className="status-dot status-open absolute -right-1.5 -top-0.5 !h-2 !w-2 !bg-accent after:!bg-accent" />
          )}
        </span>
        <span className="t-tab relative">{label}</span>
      </button>
    );
  };

  const plain = (label: string, icon: React.ReactNode, props: React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> }) => (
    <button type="button" {...props} className="group flex h-full flex-col items-center justify-center gap-0.5 text-muted transition-colors active:text-accent">
      {icon}
      <span className="t-tab">{label}</span>
    </button>
  );

  return (
    <>
      <nav
        aria-label="Main"
        className="fixed inset-x-4 z-50 md:hidden"
        style={{ bottom: "calc(16px + env(safe-area-inset-bottom))" }}
      >
        <div className="relative grid h-16 grid-cols-5 items-center rounded-full border border-line bg-base/70 px-1 shadow-[0_10px_30px_color-mix(in_srgb,var(--scrim)_55%,transparent)] backdrop-blur-[16px]">
          <div role="radiogroup" aria-label="Choose a service side" className="contents">
            {tab("locksmith", "Locksmith", LocksmithIcon)}
            {tab("automotive", "Automotive", AutomotiveIcon)}
          </div>

          {/* CALL: larger, raised, overlaps the top edge of the bar */}
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.phone}`}
            className="call-breathe accent-bg relative mx-auto flex h-14 w-14 -translate-y-3.5 items-center justify-center rounded-full text-on-accent shadow-[0_8px_26px_var(--glow-strong)] transition-transform active:scale-95"
          >
            <PhoneIcon size={26} />
          </a>

          {plain("Book", <BookIcon size={22} />, { onClick: goBook, "aria-label": "Book" })}
          {plain("Menu", <MenuIcon size={22} />, {
            onClick: () => setMenuOpen(true),
            "aria-label": "Open menu",
            "aria-haspopup": "dialog",
            "aria-expanded": menuOpen,
            ref: menuBtn,
          })}
        </div>
      </nav>

      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusTo={menuBtn} />
    </>
  );
}
