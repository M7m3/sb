"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHT_PATHS } from "./lightPaths";

/** One warning light. Glows amber while on, calms to an accent outline with a soft click when it switches off. */
export function WarningLight({ index, off, size = 24 }: { index: number; off: boolean; size?: number }) {
  const reduce = useReducedMotion();
  const { name, d } = LIGHT_PATHS[index];
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={`${name} light ${off ? "off" : "on"}`}
      className={off ? "stroke-accent/50" : "stroke-status-closed"}
      style={off ? undefined : { filter: "drop-shadow(0 0 3px color-mix(in srgb, var(--status-closed) 70%, transparent))" }}
      initial={false}
      animate={reduce ? undefined : { scale: off ? [1, 0.78, 1] : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <path d={d} />
    </motion.svg>
  );
}
