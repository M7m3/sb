"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { faq } from "@/content/locksmith-sections";

/** Questions. Accordion, one open at a time, smooth height. Includes FAQPage structured data. */
export function Faq() {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="sec-light scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <p className="t-label text-accent-on-light">FAQ</p>
          <h2 className="t-display-m mt-4">{faq.title}</h2>
        </Reveal>
        <div className="mt-10 max-w-3xl border-t border-light-ink/15">
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="border-b border-light-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${base}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="t-row-title">{it.q}</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-accent-on-light">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" className={`origin-center transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`${base}-a${i}`}
                  role="region"
                  aria-labelledby={`${base}-q${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="t-lead max-w-2xl pb-5 text-light-muted">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
