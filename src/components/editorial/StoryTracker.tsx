"use client";

import { useEffect } from "react";
import { resetStory, setStory } from "@/lib/lockStory";

const TRIGGER = 0.6; // a section counts once its top passes this fraction of the viewport

/**
 * Watches scroll position and publishes story progress (pins on Locksmith, warning lights on Automotive).
 * `ids` are the 5 section ids in order, `finalId` is the closing CTA. Renders nothing.
 */
export function StoryTracker({ ids, finalId }: { ids: string[]; finalId: string }) {
  useEffect(() => {
    let raf = 0;
    const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let lifted = 0;
      for (const id of ids) {
        if (top(id) < vh * TRIGGER) lifted++;
        else break;
      }
      setStory({
        active: true,
        started: top(ids[0]) < vh * 0.85,
        lifted,
        unlocked: top(finalId) < vh * 0.55,
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      resetStory();
    };
  }, [ids, finalId]);

  return null;
}
