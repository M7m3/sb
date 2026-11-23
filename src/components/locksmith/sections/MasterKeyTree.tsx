"use client";

import { motion, useReducedMotion } from "framer-motion";
import { KeyCut } from "@/components/brand/KeyCut";

const KEY_X = [140, 400, 660];

/** A thin stroke door: frame, panel line and a knob. Drawn at (x, y). */
function Door({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 18} ${y})`} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 64V6a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v58M-6 64h48" />
      <path d="M8 14h20M8 30h20" opacity="0.5" />
      <circle cx="29" cy="40" r="1.8" />
    </g>
  );
}

/** Master key at the top. Lines draw down to three keys, then to a door each. Draws when scrolled into view. */
export function MasterKeyTree({ labels }: { labels: string[] }) {
  const reduce = useReducedMotion();
  const draw = (delay: number) => ({
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: "easeInOut" as const },
  });

  return (
    <svg viewBox="0 0 800 380" className="h-auto w-full text-accent-on-light" role="img" aria-label="Master key tree: one master key opens three levels of access">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* branches */}
        <motion.path d="M400 70V118" {...draw(0.1)} />
        <motion.path d="M140 118H660" {...draw(0.4)} />
        {KEY_X.map((x, i) => (
          <motion.path key={`b${x}`} d={`M${x} 118V150`} {...draw(0.9 + i * 0.12)} />
        ))}
        {KEY_X.map((x, i) => (
          <motion.path key={`d${x}`} d={`M${x} 200V236`} {...draw(1.4 + i * 0.12)} />
        ))}
      </g>

      {/* master key */}
      <g transform="translate(325 18)" className="text-accent-on-light">
        <KeyCut name="master-key-systems" size={150} variant="solid" />
      </g>
      <text x="400" y="14" textAnchor="middle" fontSize="12" letterSpacing="2.2" fill="currentColor" fontWeight="600">
        MASTER
      </text>

      {/* the three keys, their labels and doors */}
      {KEY_X.map((x, i) => (
        <g key={x}>
          <g transform={`translate(${x - 55} 152)`}>
            <KeyCut name={`tree-${labels[i]?.toLowerCase()}`} size={110} />
          </g>
          <text x={x} y="226" textAnchor="middle" fontSize="12" letterSpacing="2.2" fill="currentColor" fontWeight="600">
            {labels[i]?.toUpperCase()}
          </text>
          <g stroke="currentColor">
            <Door x={x} y={244} />
          </g>
        </g>
      ))}
    </svg>
  );
}
