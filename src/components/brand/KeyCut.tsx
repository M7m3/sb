"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

const W = 120;
const H = 36;
const TOP = 11;
const BASE = 26;
const PITCH = 11;
const X0 = 42;
const CUTS = 6;
const STEP = 2.2; // svg units per depth level

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic key cut: 6 depths (1 to 6) and a bow style from the name. */
export function keyCutShape(name: string) {
  let h = hash(name);
  const depths: number[] = [];
  for (let k = 0; k < CUTS; k++) {
    h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
    h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
    h ^= h >>> 15;
    depths.push(1 + ((h >>> 0) % 6));
  }
  return { depths, bow: hash(name + "-bow") % 3 };
}

/** Blade outline. Same command structure for any depths, so it can be animated. */
function bladePath(dep: number[]) {
  let d = `M34 ${TOP}H114L117 16L112 ${BASE}`;
  for (let k = CUTS - 1; k >= 0; k--) {
    const cx = X0 + k * PITCH;
    const y = (BASE - dep[k] * STEP).toFixed(2);
    d += `H${cx + 9}L${cx + 6} ${y}H${cx + 1}L${cx - 2} ${BASE}`;
  }
  return d + "H34Z";
}

const BOWS = [
  "M15 5a13 13 0 1 0 0 26a13 13 0 1 0 0-26ZM15 14a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z",
  "M10 5h12a7 7 0 0 1 7 7v12a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7V12a7 7 0 0 1 7-7ZM16 14a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z",
  "M15 5l12 7v12l-12 7l-12-7V12ZM15 14a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z",
];
const NECK = "M26 15.5H36V21.5H26Z";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (n: number) => 1 - Math.pow(1 - n, 3);

type Props = {
  /** Service slug. Same name always gives the same key. */
  name: string;
  /** Width in px. Height follows. */
  size?: number;
  variant?: "line" | "solid";
  /** Re-cut the teeth into place when scrolled into view and on replay. */
  animate?: boolean;
  /** Change this number to replay the cut (for example on row hover). */
  replay?: number;
  /** Keep cutting and uncutting (loader). */
  loop?: boolean;
  className?: string;
};

/** Unique key shape per service, used in place of icons. Colour comes from currentColor. */
export function KeyCut({ name, size = 96, variant = "line", animate: doAnimate = false, replay = 0, loop = false, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: !loop, amount: 0.6 });
  const { depths, bow } = keyCutShape(name);
  const t = useMotionValue(reduce || !doAnimate ? 1 : 0);
  const d = useTransform(t, (v) =>
    bladePath(depths.map((x, k) => x * easeOut(clamp01((v * 1.5 - k * 0.1) / 0.6)))),
  );

  useEffect(() => {
    if (reduce || !doAnimate || !inView) return;
    if (loop) {
      const c = animate(t, [0, 1, 1, 0], { duration: 1.8, times: [0, 0.35, 0.65, 1], repeat: Infinity, ease: "easeInOut" });
      return () => c.stop();
    }
    t.set(0);
    const c = animate(t, 1, { duration: 0.5, ease: "linear" });
    return () => c.stop();
  }, [reduce, doAnimate, inView, replay, loop, t]);

  const solid = variant === "solid";
  const common = solid
    ? { fill: "currentColor", stroke: "none" }
    : { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" as const };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      aria-hidden="true"
      focusable="false"
      className={className}
      {...(solid ? {} : {})}
    >
      <path d={BOWS[bow]} fillRule="evenodd" {...common} />
      <path d={NECK} {...common} />
      <motion.path d={reduce || !doAnimate ? bladePath(depths) : d} {...common} />
    </svg>
  );
}

/** Small loader: a key that keeps cutting itself. */
export function KeyLoader({ size = 44, className }: { size?: number; className?: string }) {
  return <KeyCut name="loading" size={size} animate loop variant="solid" className={className} />;
}

/**
 * Progress indicator: a key blade whose teeth are cut one by one. `cuts` is how many of the 6 teeth are cut.
 */
export function KeyProgress({ name = "booking-key", cuts, size = 220, className }: { name?: string; cuts: number; size?: number; className?: string }) {
  const reduce = useReducedMotion();
  const { depths, bow } = keyCutShape(name);
  const c = useMotionValue(cuts);
  const d = useTransform(c, (v) => bladePath(depths.map((x, k) => x * easeOut(clamp01(v - k)))));

  useEffect(() => {
    if (reduce) {
      c.set(cuts);
      return;
    }
    const a = animate(c, cuts, { duration: 0.25 + 0.2 * Math.abs(cuts - c.get()), ease: "easeOut" });
    return () => a.stop();
  }, [cuts, reduce, c]);

  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" as const };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={size} height={(size * H) / W} aria-hidden="true" focusable="false" className={className}>
      <path d={BOWS[bow]} fillRule="evenodd" {...common} />
      <path d={NECK} {...common} />
      <motion.path d={d} {...common} />
    </svg>
  );
}
