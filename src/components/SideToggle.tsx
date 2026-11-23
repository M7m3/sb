"use client";

import { useEffect, useId, useRef } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { AutomotiveIcon, LocksmithIcon } from "./brand/SideIcons";
import { useSide } from "./SideProvider";
import type { Side } from "@/content/site";

const options: { side: Side; label: string }[] = [
  { side: "locksmith", label: "Locksmith" },
  { side: "automotive", label: "Automotive" },
];

/** Desktop segmented switch between the two sides. (Mobile uses the bottom tab bar.) */
export function SideToggle({ className = "" }: { className?: string }) {
  const { shown, busy, fx, switchSide } = useSide();
  const reduce = useReducedMotion();
  const id = useId();
  const refs = useRef<Record<Side, HTMLButtonElement | null>>({ locksmith: null, automotive: null });
  const keyCtl = useAnimationControls();
  const carCtl = useAnimationControls();

  // Quarter turn for the key, small nudge for the car, when the switch happens.
  useEffect(() => {
    if (!fx.n || reduce) return;
    if (fx.kind === "key") {
      keyCtl.start({ rotate: [0, 90, 90, 0], transition: { duration: 0.75, times: [0, 0.35, 0.6, 1], ease: "easeInOut" } });
    } else if (fx.kind === "car") {
      carCtl.start({ x: [0, 7, 0], transition: { duration: 0.5, ease: "easeInOut" } });
    }
  }, [fx, reduce, keyCtl, carCtl]);

  const choose = (to: Side, el: HTMLElement | null) => {
    if (busy || to === shown) return;
    const r = el?.getBoundingClientRect();
    switchSide(to, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let to: Side | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") to = "locksmith";
    if (e.key === "ArrowRight" || e.key === "ArrowDown") to = "automotive";
    if (!to) return;
    e.preventDefault();
    const el = refs.current[to];
    el?.focus();
    choose(to, el);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Choose a service side"
      onKeyDown={onKeyDown}
      className={`relative inline-flex rounded-full bg-scrim/35 p-0.5 shadow-[inset_0_2px_8px_color-mix(in_srgb,var(--scrim)_60%,transparent)] ${className}`}
    >
      {options.map(({ side, label }) => {
        const active = shown === side;
        return (
          <button
            key={side}
            ref={(el) => {
              refs.current[side] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} services`}
            tabIndex={active ? 0 : -1}
            onClick={(e) => choose(side, e.currentTarget)}
            className={`t-ui group relative z-10 flex h-9 items-center justify-center gap-2 rounded-full px-3.5 transition-colors duration-200 lg:px-4 ${
              active ? "text-on-accent" : "text-muted hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-thumb`}
                className="accent-bg absolute inset-0 -z-10 rounded-full shadow-[0_0_22px_var(--glow-strong),inset_0_1px_0_color-mix(in_srgb,var(--ink)_45%,transparent)]"
                transition={reduce ? { duration: 0.12 } : { type: "spring", stiffness: 520, damping: 38, mass: 0.8 }}
              />
            )}
            <motion.span animate={side === "locksmith" ? keyCtl : carCtl} className="inline-flex">
              {side === "locksmith" ? <LocksmithIcon size={20} /> : <AutomotiveIcon size={22} />}
            </motion.span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
