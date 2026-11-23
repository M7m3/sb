"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionHead } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/Reveal";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { howItWorks as how } from "@/content/locksmith-sections";

/** Thin stroke van, facing right. */
function Van({ className = "" }: { className?: string }) {
  return (
    <svg width="64" height="30" viewBox="0 0 64 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 22V8a3 3 0 0 1 3-3h30v17M36 10h13l9 7v5h-3M3 22h8M21 22h22" />
      <path d="M41 10v8h13" />
      <circle cx="16" cy="23" r="4" />
      <circle cx="49" cy="23" r="4" />
    </svg>
  );
}

/** 04 / HOW IT WORKS. Three giant steps joined by a gold line that draws as you scroll, with a van riding along it. */
export function HowItWorks() {
  const reduce = useReducedMotion();
  const horizontal = useMediaQuery("(min-width: 1024px)");
  const area = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const size = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: area, offset: ["start 75%", "end 55%"] });
  const done = useMotionValue(1);
  const p = reduce ? done : scrollYProgress;
  const vanPos = useTransform([p, size], ([a, s]: number[]) => a * s);
  const lineScaleX = p;

  // Measure the track so the van can move with transform only.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => size.set(horizontal ? el.clientWidth - 64 : el.clientHeight - 64);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [horizontal, size]);

  return (
    <section id="why" className="sec-ink scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead n={how.n} name={how.name} title={how.title} tone="dark" />
        </Reveal>

        <div ref={area} className="relative mt-12 lg:mt-16">
          {/* Track: horizontal on desktop, vertical on phones */}
          <div
            ref={track}
            aria-hidden="true"
            className="absolute bottom-0 left-[18px] top-0 w-px bg-accent/20 lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[calc(min(14vw,9rem)*0.9+0.75rem)] lg:h-px lg:w-auto"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-accent lg:origin-left"
              style={horizontal ? { scaleX: lineScaleX } : { scaleY: lineScaleX }}
            />
            <motion.span
              className="absolute left-0 top-0 -ml-8 -mt-[15px] text-accent-light lg:ml-0 lg:-mt-[28px]"
              style={horizontal ? { x: vanPos } : { y: vanPos }}
            >
              <Van className="max-lg:rotate-90" />
            </motion.span>
          </div>

          <ol className="grid gap-12 max-lg:pl-14 lg:grid-cols-3 lg:gap-8">
            {how.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative">
                  <span className="t-display-l block text-transparent [-webkit-text-stroke:1.5px_var(--accent)]">{s.n}</span>
                  <h3 className="t-heading mt-4 lg:mt-12">{s.title}</h3>
                  <p className="t-body mt-3 max-w-xs text-ink/75">{s.text}</p>
                  <span aria-hidden="true" className="absolute -left-[44px] top-5 h-3 w-3 rounded-full border-2 border-accent bg-base lg:left-0 lg:top-[calc(min(14vw,9rem)*0.9+0.75rem-5px)]" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <ul className="mt-14 grid border-y border-accent/25 sm:grid-cols-2 lg:grid-cols-4">
          {how.promises.map((t) => (
            <li key={t} className="t-label border-b border-accent/15 py-4 text-accent-light last:border-b-0 sm:border-b-0 sm:px-4 sm:first:pl-0">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
