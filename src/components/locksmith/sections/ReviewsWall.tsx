"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { KeyCut } from "@/components/brand/KeyCut";
import { reviewsWall as w } from "@/content/locksmith-sections";

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z" />
    </svg>
  );
}

function Row({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const cards = [...names, ...names]; // second copy makes the loop seamless
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
      <ul className="marquee-track">
        {cards.map((n, i) => (
          <li
            key={`${n}-${i}`}
            data-dup={i >= names.length ? "" : undefined}
            aria-hidden={i >= names.length ? true : undefined}
            className="flex w-[280px] shrink-0 flex-col border border-dashed border-accent/30 p-5"
          >
            <div className="flex items-center justify-between">
              <KeyCut name={`review-${n}`} size={72} className="text-accent" />
              <span className="t-label text-muted">Placeholder</span>
            </div>
            <p className="t-lead mt-5 flex-1 text-ink/90">{w.text}</p>
            <p className="t-small mt-4 text-muted">{n}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reviews. Two rows of placeholder cards drifting in opposite directions. Pauses on hover and off screen. */
export function ReviewsWall() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.paused = e.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const half = Math.ceil(w.names.length / 2);
  return (
    <section ref={ref} id="reviews" className="sec-ink scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <p className="t-label text-accent-light">Reviews</p>
          <h2 className="t-display-m mt-4">{w.title}</h2>
          {/* TODO(client): replace with the real Google rating once reviews exist. */}
          <div className="mt-6 inline-flex items-center gap-4 border border-accent/30 px-4 py-3">
            <span className="t-label text-ink">{w.badge.label}</span>
            <span className="flex gap-0.5 text-accent" aria-label="Stars coming soon">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </span>
            <span className="t-small text-muted">{w.badge.note}</span>
          </div>
        </Reveal>
      </div>

      {/* Full width rows, outside the story container so they run edge to edge */}
      <div className="mt-10 space-y-5">
        <Row names={w.names.slice(0, half)} />
        <Row names={w.names.slice(half)} reverse />
      </div>
    </section>
  );
}
