"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fade and rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 120, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
