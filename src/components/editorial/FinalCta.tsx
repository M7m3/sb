"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon, PhoneIcon } from "@/components/brand/Icons";
import { useLockStory } from "@/lib/lockStory";
import { business } from "@/content/business";
import type { Editorial } from "@/content/types";

/** Final moment. When the story completes the headline fills in (and gains its prefix, for example UN + LOCKED). */
export function FinalCta({
  final,
  callLabel,
  bookLabel,
}: {
  final: Editorial["final"];
  callLabel: string;
  bookLabel: string;
}) {
  const story = useLockStory();
  const reduce = useReducedMotion();
  const open = reduce || story.unlocked;
  const prefix = final.prefix ?? "";
  const base = prefix ? final.headline.slice(prefix.length) : final.headline;

  return (
    <section id="final" className="sec-ink scroll-mt-20 py-24 lg:py-36">
      <div className="story-container text-center lg:text-left">
        <h2 className="t-display-xl" aria-label={final.headline}>
          <span aria-hidden="true" className="inline-flex flex-wrap justify-center lg:justify-start">
            {prefix && (
              <motion.span
                className="inline-block overflow-hidden"
                initial={false}
                animate={{ maxWidth: open ? "2.2em" : "0em", opacity: open ? 1 : 0, x: open ? 0 : 20 }}
                transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.45 }}
                style={{ color: "var(--accent)" }}
              >
                {prefix}
              </motion.span>
            )}
            <span className={open ? "accent-metal" : "text-transparent [-webkit-text-stroke:2px_var(--accent)]"}>{base}</span>
          </span>
        </h2>
        <p className="t-lead mx-auto mt-6 max-w-lg text-ink/85 lg:mx-0">{final.line}</p>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <a href={business.phoneHref} className="hero-call call-btn sm:min-w-[260px]">
            <span className="call-glow" aria-hidden="true" />
            <span className="call-frame">
              <span className="call-ring" aria-hidden="true" />
              <span className="call-fill t-ui">
                <PhoneIcon size={20} /> {callLabel}
              </span>
            </span>
          </a>
          <a href="#book" className="hero-secondary hero-secondary-block t-ui inline-flex items-center justify-center gap-2">
            {bookLabel} <ArrowIcon size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
