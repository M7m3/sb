"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LIGHT_PATHS } from "./lightPaths";

const CX = [28, 64, 100, 136, 172];
const DIAL = { x: 100, y: 214, r: 80 };
const START = 135; // degrees, lower left. The dial runs clockwise through the top to 45 degrees.
const SWEEP = 270;

const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [DIAL.x + r * Math.cos(a), DIAL.y + r * Math.sin(a)] as const;
};

const ticks = Array.from({ length: 28 }, (_, i) => {
  const major = i % 3 === 0;
  const deg = START + (SWEEP / 27) * i;
  const [x1, y1] = polar(deg, DIAL.r - (major ? 12 : 7));
  const [x2, y2] = polar(deg, DIAL.r - 1);
  return { d: `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`, major };
});

const [ax, ay] = polar(START, DIAL.r);
const [bx, by] = polar(START + SWEEP, DIAL.r);
const [nx, ny] = polar(START, DIAL.r - 18);

/**
 * Instrument cluster: 5 warning lights across the top and a rev counter below.
 * `off` lights are calm. When `done` the needle sweeps up and settles.
 */
export function DashCluster({ off, done, className }: { off: number; done: boolean; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 320" className={className} role="img" aria-label={`Dashboard with ${5 - off} of 5 warning lights on${done ? ", all clear" : ""}`}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
        {CX.map((cx, i) => {
          const isOff = i < off;
          return (
            <g key={cx}>
              <circle cx={cx} cy="34" r="16" className={isOff ? "stroke-accent/25" : "stroke-status-closed/60"} strokeWidth="1" />
              {/* soft glow while the light is on */}
              <motion.circle
                cx={cx}
                cy="34"
                r="16"
                className="fill-status-closed stroke-none"
                initial={false}
                animate={{ opacity: isOff ? 0 : 0.22 }}
                transition={{ duration: 0.5 }}
              />
              <g transform={`translate(${cx - 11} 23) scale(0.92)`}>
                <motion.g
                  initial={false}
                  animate={reduce ? undefined : { scale: isOff ? [1, 0.8, 1] : 1 }}
                  transition={{ duration: 0.35 }}
                  style={{ transformOrigin: "12px 12px" }}
                >
                  <path d={LIGHT_PATHS[i].d} className={isOff ? "stroke-accent/55" : "stroke-status-closed"} />
                </motion.g>
              </g>
            </g>
          );
        })}

        {/* rev counter */}
        <path d={`M${ax.toFixed(1)} ${ay.toFixed(1)}A${DIAL.r} ${DIAL.r} 0 1 1 ${bx.toFixed(1)} ${by.toFixed(1)}`} className="stroke-accent" opacity="0.85" />
        <circle cx={DIAL.x} cy={DIAL.y} r={DIAL.r - 26} className="stroke-accent" opacity="0.25" strokeWidth="1" />
        {ticks.map((t, i) => (
          <path key={i} d={t.d} className={t.major ? "stroke-accent-light" : "stroke-accent"} opacity={t.major ? 0.95 : 0.55} strokeWidth={t.major ? 1.6 : 1} />
        ))}
        {/* glow on completion */}
        <motion.circle
          cx={DIAL.x}
          cy={DIAL.y}
          r={DIAL.r}
          className="fill-accent-light stroke-none"
          initial={false}
          animate={{ opacity: done && !reduce ? [0, 0.28, 0.06] : 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.g
          style={{ transformOrigin: `${DIAL.x}px ${DIAL.y}px` }}
          initial={false}
          animate={{ rotate: done ? (reduce ? 200 : [0, 262, 205]) : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1.4, ease: "easeOut", times: [0, 0.55, 1] }}
        >
          <path d={`M${DIAL.x} ${DIAL.y}L${nx.toFixed(1)} ${ny.toFixed(1)}`} className="stroke-accent-light" strokeWidth="2.2" />
        </motion.g>
        <circle cx={DIAL.x} cy={DIAL.y} r="6" className="fill-base stroke-accent-light" />
      </g>
    </svg>
  );
}
