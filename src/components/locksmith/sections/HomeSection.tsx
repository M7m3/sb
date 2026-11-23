"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/Reveal";
import { KeyCut } from "@/components/brand/KeyCut";
import { ArrowIcon } from "@/components/brand/Icons";
import { CompactList } from "./CompactList";
import { images } from "@/content/images";
import { doorHotspots } from "@/content/locksmith-sections";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { bookService } from "@/lib/serviceSelection";
import type { SectionCopy, ServiceGroup } from "@/content/types";

/** 02 / HOME. One front door photo with glowing hotspots. Each opens a glass card for that service. */
export function HomeSection({ group, copy }: { group: ServiceGroup; copy: SectionCopy }) {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const bySlug = Object.fromEntries(group.items.map((s) => [s.slug, s]));
  const current = doorHotspots.find((h) => h.id === open) ?? null;

  // Close on outside tap or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cardStyle = (h: { x: number; y: number }): React.CSSProperties => {
    if (!wide) return {};
    const shift = h.x < 30 ? "-12%" : h.x > 70 ? "-88%" : "-50%";
    return {
      left: `${h.x}%`,
      transform: `translateX(${shift})`,
      ...(h.y > 50 ? { bottom: `calc(${100 - h.y}% + 22px)` } : { top: `calc(${h.y}% + 22px)` }),
    };
  };

  return (
    <section id={group.id} className="sec-ink scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead {...copy} tone="dark" />
        </Reveal>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          {/* Door photo with hotspots */}
          <div ref={box} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-accent/20">
              <Image src={images.home.door.src} alt={images.home.door.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" priority={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-scrim/50 to-transparent" />
            </div>

            {doorHotspots.map((h) => (
              <button
                key={h.id}
                type="button"
                aria-label={`${h.label}: ${bySlug[h.slug]?.title ?? h.label}`}
                aria-expanded={open === h.id}
                onClick={() => setOpen((o) => (o === h.id ? null : h.id))}
                className="absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span className={`relative block h-4 w-4 rounded-full border-2 border-accent bg-accent/30 ${reduce ? "" : "hotspot-ring"}`} />
              </button>
            ))}

            <AnimatePresence>
              {current && bySlug[current.slug] && (
                <motion.div
                  key={current.id}
                  role="dialog"
                  aria-label={bySlug[current.slug].title}
                  className="absolute z-20 w-[min(240px,70%)] border border-line bg-base/80 p-4 backdrop-blur-[16px] max-md:inset-x-3 max-md:bottom-3 max-md:w-auto"
                  style={cardStyle(current)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <KeyCut name={current.slug} size={90} animate className="text-accent" />
                  <p className="t-row-title mt-2">{bySlug[current.slug].title}</p>
                  <p className="t-small mt-1 text-ink/75">{bySlug[current.slug].description}</p>
                  <a
                    href={`/?service=${current.slug}#book`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(null);
                      bookService(current.slug);
                    }}
                    className="t-ui mt-3 inline-flex items-center gap-2 text-accent-light underline underline-offset-4"
                  >
                    Book <ArrowIcon size={18} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden min-w-0 md:block">
            <CompactList items={group.items} tone="dark" cols={1} />
          </div>
        </div>

        {/* Phones: compact list below the photo */}
        <div className="mt-8 md:hidden">
          <CompactList items={group.items} tone="dark" cols={1} />
        </div>
      </div>
    </section>
  );
}
