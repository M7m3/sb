"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { KeyCut } from "@/components/brand/KeyCut";
import { ArrowIcon, PhoneIcon } from "@/components/brand/Icons";
import type { Editorial } from "@/content/types";

const step = (n: number) => ({ "--i": n }) as React.CSSProperties;

type Props = { ed: Editorial; phone: string; phoneHref: string };

/** Giant CAR / HOME / BUSINESS words (links), the call to action and the hover description. */
export function HeroMain({ ed, phone, phoneHref }: Props) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const current = ed.words.find((w) => w.id === hovered) ?? null;

  const enter = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(id);
  };

  return (
    <div className="relative z-10 mx-auto grid w-full max-w-[1600px] content-center gap-5 px-5 pb-[128px] pt-[60px] sm:px-8 md:pb-10 md:pt-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-10">
      <div className="min-w-0">
        <p className="hero-item t-label text-accent-light" style={step(0)}>
          {ed.heroLabel}
        </p>
        <p className="hero-item t-body mt-2 text-ink/85" style={step(1)}>
          {ed.heroLine}
        </p>
        <p className="hero-item t-prompt mt-4 text-accent lg:mt-5" style={step(2)}>
          {ed.heroPrompt}
        </p>

        <nav aria-label="What is locked?" className="mt-2 lg:mt-3" onPointerLeave={() => setHovered(null)}>
          <ul className="border-t border-accent/25 lg:border-0">
            {ed.words.map((w, i) => (
              <li
                key={w.id}
                className="hero-item border-b border-accent/25 lg:border-0"
                style={step(3 + i)}
              >
                <a
                  href={`#${w.id}`}
                  data-dim={hovered !== null && hovered !== w.id}
                  onPointerEnter={enter(w.id)}
                  onFocus={() => setHovered(w.id)}
                  onBlur={() => setHovered(null)}
                  className="hero-word-link group flex min-h-[72px] items-center justify-between gap-3 py-2 lg:block lg:min-h-0 lg:py-0"
                >
                  <span className="min-w-0">
                    <span className="hero-word t-display-xl block">{w.label}</span>
                    <span className="t-small mt-1 block max-w-[30ch] text-ink/70 lg:hidden [@media(max-height:760px)]:hidden">{w.blurb}</span>
                  </span>
                  <ArrowIcon className="shrink-0 text-accent lg:hidden" size={26} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right column on desktop: description, then the buttons */}
      <div className="hero-item flex flex-col gap-4 lg:gap-6" style={step(6)}>
        <div className="hidden min-h-[120px] lg:block" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <KeyCut name={current.id} size={150} animate className="text-accent" />
                <p className="t-body mt-3 text-ink/90">{current.blurb}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-col gap-3 lg:mt-0">
          <a href={phoneHref} className="hero-call call-btn w-full">
            <span className="call-glow" aria-hidden="true" />
            <span className="call-frame">
              <span className="call-ring" aria-hidden="true" />
              <span className="call-fill t-ui">
                <PhoneIcon size={20} />
                <span className="lg:hidden">{ed.callLabel}</span>
                <span className="hidden lg:inline">Call {phone}</span>
              </span>
            </span>
          </a>
          <a href="#book" className="hero-secondary t-ui">
            {ed.bookLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
