"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Large photo with a slight parallax on desktop only. */
export function ParallaxPhoto({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const move = desktop && !reduce;

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[28px] ${className}`}>
      <motion.div className="absolute inset-[-8%]" style={move ? { y } : undefined}>
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero-assets/hero-desktop.webp" type="image/webp" />
          <img
            src="/hero-assets/hero-mobile.webp"
            alt="Hands using a key on a car door lock"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-scrim/40 to-transparent" />
    </div>
  );
}
