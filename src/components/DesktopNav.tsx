"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "./brand/Logo";
import { PhoneIcon } from "./brand/Icons";
import { SideToggle } from "./SideToggle";
import { StatusChip } from "./StatusChip";
import { AccountEntry } from "./account/AccountMenu";
import { useSide } from "./SideProvider";
import { sideContent } from "@/content";
import { business } from "@/content/business";
import { sidePath } from "@/content/site";
import { useScrollState } from "@/lib/useScrollState";

/** Floating islands header for 768px and up: logo, switch and links, status and call. No full width bar. */
export function DesktopNav() {
  const { side } = useSide();
  const reduce = useReducedMotion();
  const links = sideContent[side].navLinks;
  // On the account pages the section links lead back to the side page.
  const prefix = usePathname().startsWith("/account") ? sidePath[side] : "";
  const { scrolled } = useScrollState(80);
  const [hover, setHover] = useState<string | null>(null);
  const [active, setActive] = useState<{ side: string; id: string | null }>({ side, id: null });

  // Which section is under the middle of the screen? The deepest (last in DOM order) wins.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el)
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    if (!els.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        const current = els.filter((el) => visible.has(el)).pop();
        setActive({ side, id: current?.id ?? null });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [side, links]);

  const activeHref = active.side === side && active.id ? `#${active.id}` : null;
  const underlineAt = hover ?? activeHref;
  const shrink = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 30 };
  const island = "pointer-events-auto relative flex h-12 items-center rounded-full border border-line";
  const glass = "absolute inset-0 -z-10 rounded-full bg-base/55 backdrop-blur-[16px]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 hidden md:block">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 lg:px-8">
        {/* LEFT: logo */}
        <motion.div
          className={`${island} justify-self-start px-4`}
          style={{ transformOrigin: "left top" }}
          animate={{ scale: scrolled ? 0.88 : 1 }}
          transition={shrink}
        >
          <span aria-hidden="true" className={glass} />
          <Link href={sidePath[side]} aria-label="SB home">
            <Logo className="h-9 w-auto" />
          </Link>
        </motion.div>

        {/* CENTRE: switch, divider, section links */}
        <motion.div
          className={`${island} gap-2 px-1.5`}
          style={{ transformOrigin: "center top" }}
          animate={{ scale: scrolled ? 0.92 : 1 }}
          transition={shrink}
        >
          <span aria-hidden="true" className={glass} />
          <span
            aria-hidden="true"
            className={`absolute inset-0 -z-10 rounded-full bg-base/60 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
          />
          <SideToggle />
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line lg:block" />
          <nav aria-label="Sections" className="hidden items-center gap-5 pr-4 lg:flex xl:gap-6" onMouseLeave={() => setHover(null)}>
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={`${prefix}${l.href}`}
                onMouseEnter={() => setHover(l.href)}
                onFocus={() => setHover(l.href)}
                onBlur={() => setHover(null)}
                className={`t-ui-nav relative whitespace-nowrap py-1.5 transition-colors ${
                  underlineAt === l.href ? "text-accent-light" : "text-ink/80"
                } ${i >= 3 ? "hidden xl:block" : ""}`}
              >
                {l.label}
                {underlineAt === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="accent-bg absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full"
                    transition={reduce ? { duration: 0.1 } : { type: "spring", stiffness: 500, damping: 36 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* RIGHT: status and call */}
        <motion.div
          className={`${island} gap-4 justify-self-end pl-4 pr-1.5`}
          style={{ transformOrigin: "right top" }}
          animate={{ scale: scrolled ? 0.88 : 1 }}
          transition={shrink}
        >
          <span aria-hidden="true" className={glass} />
          <AccountEntry />
          <StatusChip className="hidden lg:flex" />
          <a
            href={business.phoneHref}
            className="accent-bg t-ui flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-on-accent shadow-[0_0_20px_var(--glow)] transition-transform hover:-translate-y-0.5"
          >
            <PhoneIcon size={18} />
            <span className="lg:hidden">Call</span>
            <span className="hidden lg:inline">{business.phone}</span>
          </a>
        </motion.div>
      </div>
    </header>
  );
}
