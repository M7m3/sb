"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { motion, useAnimate } from "framer-motion";
import type { Side } from "@/content/site";

export type OverlayState = {
  to: Side;
  from: Side;
  x: number;
  y: number;
  target: string;
  reduced: boolean;
};

// Destination side colours come from the theme tokens (set by data-side on the overlay).
const background =
  "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 16%, var(--base)) 0%, color-mix(in srgb, var(--accent) 6%, var(--base)) 45%, var(--base) 80%)";

const MIN_HOLD_MS = 220;
const SAFETY_MS = 3000;

type Props = {
  overlay: OverlayState;
  routeReady: boolean;
  onCovered: () => void;
  onReveal: () => void;
  onDone: () => void;
};

export function TransitionOverlay({ overlay, routeReady, onCovered, onReveal, onDone }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [phase, setPhase] = useState<"cover" | "hold" | "reveal">("cover");
  const [held, setHeld] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  // The logo starts in the old side colours and animates to the new ones while it is on screen.
  const [logoSide, setLogoSide] = useState<Side>(overlay.from);
  useEffect(() => {
    const t = setTimeout(() => setLogoSide(overlay.to), 300);
    return () => clearTimeout(t);
  }, [overlay.to]);
  const cb = useRef({ onCovered, onReveal, onDone });
  useEffect(() => {
    cb.current = { onCovered, onReveal, onDone };
  });

  const { x, y, reduced } = overlay;

  const radius = useMemo(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return Math.ceil(Math.hypot(Math.max(x, w - x), Math.max(y, h - y))) + 8;
  }, [x, y]);

  const closed = `circle(0px at ${x}px ${y}px)`;
  const open = `circle(${radius}px at ${x}px ${y}px)`;

  // 1. Cover the screen.
  useEffect(() => {
    let cancelled = false;
    const el = scope.current;
    if (!el) return;
    const run = reduced
      ? animate(el, { opacity: [0, 1] }, { duration: 0.14, ease: "easeOut" })
      : animate(el, { clipPath: [closed, open] }, { duration: 0.46, delay: 0.12, ease: [0.76, 0, 0.24, 1] });
    run.then(() => {
      if (cancelled) return;
      cb.current.onCovered();
      setPhase("hold");
    });
    return () => {
      cancelled = true;
      run.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Hold on the logo until the new route is mounted.
  useEffect(() => {
    if (phase !== "hold") return;
    const t1 = setTimeout(() => setHeld(true), reduced ? 0 : MIN_HOLD_MS);
    const t2 = setTimeout(() => setTimedOut(true), SAFETY_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, reduced]);

  const revealing = phase === "reveal" || (phase === "hold" && ((held && routeReady) || timedOut));

  // 3. Reveal the new page.
  useEffect(() => {
    if (!revealing) return;
    let cancelled = false;
    const el = scope.current;
    if (!el) return;
    cb.current.onReveal();
    const run = animate(
      el,
      { opacity: [1, 0] },
      { duration: reduced ? 0.16 : 0.3, ease: "easeOut" },
    );
    run.then(() => {
      if (!cancelled) cb.current.onDone();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealing]);

  return (
    <div
      ref={scope}
      aria-hidden="true"
      data-side={overlay.to}
      className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center will-change-[clip-path,opacity]"
      style={{
        background,
        clipPath: reduced ? undefined : closed,
        opacity: reduced ? 0 : 1,
      }}
    >
      {!reduced && (
        <motion.div
          className="logo-shell relative aspect-[3156/1542] w-[min(68vw,320px)]"
          data-logo={logoSide}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.38 }}
        >
          <Logo className="absolute inset-0 h-full w-full" title="" />
          {/* Shimmer, masked to the logo shape */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: "url(/brand/logo-gold.webp)",
              maskImage: "url(/brand/logo-gold.webp)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background:
                  "linear-gradient(105deg, transparent 0%, var(--ink) 50%, transparent 100%)",
              }}
              initial={{ x: "-130%" }}
              animate={{ x: "330%" }}
              transition={{ duration: 0.75, delay: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
