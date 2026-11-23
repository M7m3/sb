"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/Reveal";
import { areasCopy } from "@/content/locksmith-sections";
import { site } from "@/content/site";

type Pt = { x: number; y: number };

// Approximate positions on a simplified map (800 x 520, north is up, Lake Ontario at the bottom).
const BASE = "Scarborough";
const POINTS: Record<string, Pt> = {
  Scarborough: { x: 520, y: 292 },
  Toronto: { x: 385, y: 322 },
  "North York": { x: 385, y: 240 },
  "East York": { x: 442, y: 300 },
  Etobicoke: { x: 290, y: 334 },
  Mississauga: { x: 185, y: 356 },
  Vaughan: { x: 300, y: 205 },
  "Richmond Hill": { x: 410, y: 150 },
  Markham: { x: 505, y: 195 },
  Pickering: { x: 640, y: 262 },
  Ajax: { x: 700, y: 238 },
  Whitby: { x: 765, y: 210 },
};

const route = (to: Pt) => {
  const from = POINTS[BASE];
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - 36;
  return `M${from.x} ${from.y}Q${mx} ${my} ${to.x} ${to.y}`;
};

/** 05 / AREAS. Line art map of the GTA. Routes draw from Scarborough to every area. Names and dots light up together. */
export function AreasMap() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const areas = site.areas.filter((a) => POINTS[a]);
  const others = areas.filter((a) => a !== BASE);

  return (
    <section id="areas" className="sec-light scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead n={areasCopy.n} name={areasCopy.name} title={areasCopy.title} tone="light" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <svg viewBox="0 0 800 520" className="block h-auto w-full min-w-0 text-accent-on-light" role="img" aria-label="Map of the Greater Toronto Area with Scarborough at the centre of our service areas">
            {/* Lake Ontario */}
            <path d="M0 440C150 420 260 390 380 352S600 322 800 262V520H0Z" className="fill-accent-on-light/10" />
            <path d="M0 440C150 420 260 390 380 352S600 322 800 262" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Highways: 401, 404 and 427 */}
            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 5" opacity="0.7">
              <path d="M40 330C170 305 310 275 450 262S690 225 800 190" />
              <path d="M446 40C452 120 458 200 462 262" />
              <path d="M262 300C268 340 272 372 276 392" />
            </g>
            <g fontSize="11" letterSpacing="1.6" fill="currentColor" opacity="0.65" fontWeight="600">
              <text x="48" y="318">401</text>
              <text x="452" y="36">404</text>
              <text x="244" y="298">427</text>
            </g>

            {/* Routes from Scarborough */}
            <g fill="none" strokeLinecap="round">
              {others.map((a, i) => (
                <motion.path
                  key={a}
                  d={route(POINTS[a])}
                  stroke="currentColor"
                  strokeWidth={active === a ? 2.4 : 1.3}
                  opacity={active && active !== a ? 0.25 : 0.9}
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.2 + i * 0.12, ease: "easeInOut" }}
                />
              ))}
            </g>

            {/* Dots */}
            {areas.map((a) => {
              const { x, y } = POINTS[a];
              const base = a === BASE;
              const on = active === a;
              return (
                <g
                  key={a}
                  onPointerEnter={() => setActive(a)}
                  onPointerLeave={() => setActive(null)}
                  onClick={() => setActive(a)}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={x} cy={y} r="22" fill="transparent" />
                  {base && !reduce && (
                    <motion.circle cx={x} cy={y} r="9" fill="none" stroke="currentColor" strokeWidth="1.5" animate={{ scale: [1, 2.6], opacity: [0.7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }} style={{ transformOrigin: `${x}px ${y}px` }} />
                  )}
                  <circle cx={x} cy={y} r={base ? 9 : on ? 8 : 5} fill="currentColor" opacity={base || on ? 1 : active ? 0.4 : 0.85} style={{ transition: "r 200ms" }} />
                  {(on || base) && (
                    <text x={x} y={y - 16} textAnchor="middle" fontSize="12" letterSpacing="1.4" fontWeight="700" fill="currentColor">
                      {a.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <ul className="columns-1 gap-6 sm:columns-2 lg:columns-1" onPointerLeave={() => setActive(null)}>
            {site.areas.map((a) => (
              <li key={a} className="break-inside-avoid border-b border-light-ink/15">
                <button
                  type="button"
                  onPointerEnter={() => setActive(a)}
                  onFocus={() => setActive(a)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(a)}
                  className={`t-row-title block w-full py-3 text-left transition-[color,transform] duration-300 ${
                    active === a ? "translate-x-2 text-accent-on-light" : ""
                  }`}
                >
                  {a}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="t-lead mt-8 text-light-muted">{areasCopy.note}</p>
      </div>
    </section>
  );
}
