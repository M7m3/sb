"use client";

import { useReducedMotion } from "framer-motion";
import { PinTumbler } from "@/components/locksmith/art/PinTumbler";
import { DashCluster } from "@/components/automotive/art/DashCluster";
import { useSide } from "@/components/SideProvider";
import { useLockStory } from "@/lib/lockStory";

/**
 * Desktop only. Sticky card on the right edge of the story area.
 * Locksmith: pin tumbler lock. Automotive: instrument cluster with warning lights.
 */
export function StoryRail({ names, finalLabel }: { names: string[]; finalLabel: string }) {
  const { side } = useSide();
  const story = useLockStory();
  const reduce = useReducedMotion();
  const lifted = reduce ? 5 : story.lifted;
  const current = Math.max(0, Math.min(names.length - 1, lifted - 1));
  const lock = side === "locksmith";
  const done = story.unlocked && !reduce;

  return (
    <aside aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 mx-auto hidden w-full max-w-7xl px-6 lg:block">
      <div className="sticky top-24 ml-auto w-[216px]">
        <div
          className={`rounded-3xl border bg-base/95 p-4 shadow-2xl transition-[border-color,box-shadow] duration-700 ${
            done ? "border-accent shadow-[0_0_50px_var(--glow-strong)]" : "border-accent/25"
          }`}
        >
          {lock ? (
            <PinTumbler lifted={lifted} unlocked={done} className="h-auto w-full" />
          ) : (
            <DashCluster off={lifted} done={done} className="h-auto w-full" />
          )}
          <p className="t-label mt-2 text-center text-accent-light">
            {done
              ? finalLabel
              : lifted === 0
                ? lock
                  ? "Scroll to pick the lock"
                  : "Scroll to clear the lights"
                : `${lock ? "Pin" : "Light"} ${lifted} / 5 · ${names[current]}`}
          </p>
        </div>
      </div>
    </aside>
  );
}
