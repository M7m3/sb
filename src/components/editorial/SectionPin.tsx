"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useSide } from "@/components/SideProvider";
import { WarningLight } from "@/components/automotive/art/WarningLight";

/**
 * Tiny inline marker next to a section label (small screens only, the rail covers desktop).
 * Locksmith: a pin that rises when the section enters. Automotive: a warning light that switches off.
 */
export function SectionPin({ className = "" }: { className?: string }) {
  const { side } = useSide();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.9 });

  if (side === "automotive") {
    return (
      <span ref={ref} className={`inline-flex ${className}`}>
        <WarningLight index={0} off={reduce || inView} size={20} />
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
        <rect x="1.5" y="1.5" width="11" height="19" rx="2" opacity="0.4" />
        <path d="M1.5 12h11" strokeDasharray="1.5 2" opacity="0.7" />
        <motion.rect
          x="4"
          width="6"
          height="8"
          rx="1"
          initial={false}
          animate={{ y: reduce || inView ? 4 : 10 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 13 }}
        />
      </svg>
    </span>
  );
}
