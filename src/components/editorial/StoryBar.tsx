"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSide } from "@/components/SideProvider";
import { WarningLight } from "@/components/automotive/art/WarningLight";
import { useLockStory } from "@/lib/lockStory";

/**
 * Phones only. Slim bar under the top bar.
 * Locksmith: 5 pins rise, then the cylinder turns. Automotive: 5 warning lights switch off, then the needle sweeps.
 */
export function StoryBar() {
  const { side } = useSide();
  const story = useLockStory();
  const reduce = useReducedMotion();
  const show = story.active && story.started;
  const lifted = reduce ? 5 : story.lifted;
  const lock = side === "locksmith";
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 340, damping: 13 };

  return (
    <div
      aria-hidden="true"
      className={`relative h-7 border-t border-accent/15 bg-base/90 backdrop-blur-md transition-[opacity,transform] duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
      style={{ marginBottom: show ? 0 : -28 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6">
        <div className="flex items-center gap-5">
          {[0, 1, 2, 3, 4].map((i) => {
            const up = i < lifted;
            return lock ? (
              <svg key={i} width="14" height="22" viewBox="0 0 14 22" fill="none" className="stroke-accent" strokeWidth="1.2" strokeLinecap="round">
                <rect x="1.5" y="1.5" width="11" height="19" rx="2" opacity="0.35" />
                <path d="M1.5 12h11" className="stroke-accent-light" strokeDasharray="1.5 2" opacity="0.7" />
                <motion.rect
                  x="4"
                  width="6"
                  height="8"
                  rx="1"
                  initial={false}
                  animate={{ y: up ? 4 : 10 }}
                  transition={spring}
                  className={up ? "fill-accent-light/35 stroke-accent-light" : "fill-none stroke-accent"}
                />
              </svg>
            ) : (
              <WarningLight key={i} index={i} off={up} size={18} />
            );
          })}
        </div>
        {lock ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="stroke-accent" strokeWidth="1.3" strokeLinecap="round">
            <circle cx="11" cy="11" r="9" opacity={story.unlocked ? 1 : 0.6} className={story.unlocked ? "stroke-accent-light" : "stroke-accent"} />
            <motion.g
              style={{ transformOrigin: "11px 11px" }}
              animate={{ rotate: story.unlocked && !reduce ? 90 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            >
              <circle cx="11" cy="8.5" r="2.2" className="stroke-accent-light" />
              <path d="M11 10.7v5" className="stroke-accent-light" />
            </motion.g>
          </svg>
        ) : (
          <svg width="26" height="22" viewBox="0 0 26 22" fill="none" className="stroke-accent" strokeWidth="1.3" strokeLinecap="round">
            <path d="M3 18a10 10 0 0 1 20 0" opacity={story.unlocked ? 1 : 0.6} className={story.unlocked ? "stroke-accent-light" : "stroke-accent"} />
            <motion.path
              d="M13 18L7 10"
              style={{ transformOrigin: "13px 18px" }}
              initial={false}
              animate={{ rotate: story.unlocked && !reduce ? [0, 95, 78] : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, ease: "easeOut", times: [0, 0.6, 1] }}
              className="stroke-accent-light"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
