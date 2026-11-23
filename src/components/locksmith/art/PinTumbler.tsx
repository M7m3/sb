"use client";

import { motion, useReducedMotion } from "framer-motion";

const CX = [34, 67, 100, 133, 166]; // chamber centres
const LIFT = [14, 22, 10, 26, 18]; // how far each stack rises to reach the shear line
const SHEAR = 140;
const DRIVER_H = 46;
const KEY_H = 44;
const SPRING_TOP = 20;
const PLUG_C = { x: 100, y: 284 };

const spring = (cx: number, top: number, bottom: number) => {
  const turns = 6;
  const step = (bottom - top) / turns;
  let d = `M${cx} ${top}`;
  for (let i = 0; i < turns; i++) {
    d += `L${cx + (i % 2 ? -6 : 6)} ${top + step * (i + 0.5)}`;
  }
  return d + `L${cx} ${bottom}`;
};

const KEYHOLE = "M50 8a26 26 0 0 1 14.5 47.6L72 112H28l7.5-56.4A26 26 0 0 1 50 8Z";

/**
 * Cutaway of a pin tumbler lock with 5 pin stacks and a front view of the plug.
 * `lifted` pins sit at the shear line. `unlocked` turns the plug 90 degrees.
 */
export function PinTumbler({ lifted, unlocked, className }: { lifted: number; unlocked: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const pinSpring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 320, damping: 11, mass: 0.7 };

  return (
    <svg viewBox="0 0 200 340" className={className} role="img" aria-label={`Lock with ${lifted} of 5 pins lifted${unlocked ? ", unlocked" : ""}`}>
      <g fill="none" className="stroke-accent" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* housing and plug */}
        <rect x="10" y="12" width="180" height={SHEAR - 12} rx="8" opacity="0.9" />
        <rect x="10" y={SHEAR} width="180" height="100" rx="8" opacity="0.9" />
        <path d={`M10 ${SHEAR}H190`} className="stroke-accent-light" strokeDasharray="3 4" opacity="0.8" />

        {CX.map((cx, i) => {
          const up = i < lifted;
          const B = SHEAR + LIFT[i]; // boundary of driver and key pin when resting
          const full = B - DRIVER_H - SPRING_TOP;
          const compressed = full - LIFT[i];
          return (
            <g key={cx}>
              <rect x={cx - 10} y={SPRING_TOP - 4} width="20" height={SHEAR - SPRING_TOP + 4 + 0} opacity="0.25" strokeWidth="1" />
              {/* spring */}
              <motion.path
                d={spring(cx, SPRING_TOP, SPRING_TOP + full)}
                style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
                animate={{ scaleY: up ? compressed / full : 1 }}
                transition={pinSpring}
                strokeWidth="1.1"
                opacity="0.75"
              />
              {/* driver and key pin move together */}
              <motion.g animate={{ y: up ? -LIFT[i] : 0 }} transition={pinSpring}>
                <rect
                  x={cx - 8}
                  y={B - DRIVER_H}
                  width="16"
                  height={DRIVER_H}
                  rx="2"
                  className={up ? "fill-accent-light/20 stroke-accent-light" : "fill-none stroke-accent"}
                />
                <path
                  d={`M${cx - 8} ${B}h16v${KEY_H - 10}l-8 10l-8-10Z`}
                  className={up ? "fill-accent-light/20 stroke-accent-light" : "fill-none stroke-accent"}
                />
              </motion.g>
              {/* flash at the shear line when the pin sets */}
              <motion.rect
                x={cx - 10}
                y={SHEAR - 2}
                width="20"
                height="4"
                rx="2"
                className="fill-accent-light stroke-none"
                initial={false}
                animate={{ opacity: up && !reduce ? [0, 1, 0] : 0 }}
                transition={{ duration: 0.7 }}
              />
            </g>
          );
        })}

        {/* front view of the plug */}
        <circle cx={PLUG_C.x} cy={PLUG_C.y} r="40" opacity="0.9" />
        <circle cx={PLUG_C.x} cy={PLUG_C.y} r="33" opacity="0.45" strokeWidth="1" />
        <motion.circle
          cx={PLUG_C.x}
          cy={PLUG_C.y}
          r="40"
          className="fill-accent-light stroke-none"
          initial={false}
          animate={{ opacity: unlocked && !reduce ? [0, 0.35, 0.08] : 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.g
          style={{ transformOrigin: `${PLUG_C.x}px ${PLUG_C.y}px` }}
          animate={{ rotate: unlocked && !reduce ? 90 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <path
            d={KEYHOLE}
            transform={`translate(${PLUG_C.x - 12} ${PLUG_C.y - 15}) scale(0.24)`}
            className={unlocked ? "fill-accent-light stroke-accent-light" : "fill-none stroke-accent-light"}
            strokeWidth="5"
          />
        </motion.g>
      </g>
    </svg>
  );
}
