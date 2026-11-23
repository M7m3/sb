"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/Reveal";
import { KeyCut } from "@/components/brand/KeyCut";
import { ArrowIcon } from "@/components/brand/Icons";
import { KeyBlank } from "./KeyBlank";
import { carPhotoBySlug, images } from "@/content/images";
import { carPicker } from "@/content/locksmith-sections";
import { bookService } from "@/lib/serviceSelection";
import type { SectionCopy, ServiceGroup } from "@/content/types";

function Photo({ slug, sizes, priority }: { slug: string; sizes: string; priority?: boolean }) {
  const slot = carPhotoBySlug[slug] ?? images.car.lockout;
  return <Image src={slot.src} alt={slot.alt} fill sizes={sizes} priority={priority} className="object-cover" />;
}

/** 01 / CAR. Rows on the left, one big key blank photo on the right that swaps on hover or focus. Cards on phones. */
export function CarSection({ group, copy }: { group: ServiceGroup; copy: SectionCopy }) {
  const reduce = useReducedMotion();
  const items = group.items;
  const [st, setSt] = useState({ cur: 0, prev: 0, moved: false });
  const [ticks, setTicks] = useState<number[]>(() => items.map(() => 0));
  const [make, setMake] = useState("");

  const activate = (i: number) => {
    setSt((s) => (s.cur === i ? s : { cur: i, prev: s.cur, moved: true }));
    setTicks((t) => t.map((n, k) => (k === i && st.cur !== i ? n + 1 : n)));
  };
  const active = items[st.cur];

  return (
    <section id={group.id} className="sec-light scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead {...copy} tone="light" />
        </Reveal>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          {/* Desktop rows */}
          <div className="hidden lg:block">
            <ul className="border-t border-light-ink/15" onPointerLeave={undefined}>
              {items.map((s, i) => (
                <li key={s.slug}>
                  <a
                    href={`/?service=${s.slug}#book`}
                    onClick={(e) => {
                      e.preventDefault();
                      bookService(s.slug);
                    }}
                    onPointerEnter={(e) => e.pointerType === "mouse" && activate(i)}
                    onFocus={() => activate(i)}
                    className="group relative flex items-center gap-6 border-b border-light-ink/15 py-6 pl-5 transition-colors"
                  >
                    {/* gold bar for the active row */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-[3px] origin-center bg-accent transition-transform duration-300 ${
                        st.cur === i ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <KeyCut name={s.slug} size={104} animate replay={ticks[i]} className="w-[104px] shrink-0 text-accent-on-light" />
                    <span className="min-w-0 flex-1">
                      <span className="t-row-title block">{s.title}</span>
                      <span className="t-small mt-1 block text-light-muted">{s.description}</span>
                    </span>
                    <ArrowIcon size={24} className="shrink-0 text-accent-on-light transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Phones and tablets: swipe cards */}
          <div className="min-w-0 lg:hidden">
            <p className="t-label mb-3 flex items-center gap-2 text-accent-on-light">
              Swipe <ArrowIcon size={16} />
            </p>
            <ul
              className="swipe-row -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6"
              aria-label="Car services"
            >
              {items.map((s) => (
                <li key={s.slug} className="w-[78vw] max-w-[360px] shrink-0 snap-start">
                  <a
                    href={`/?service=${s.slug}#book`}
                    onClick={(e) => {
                      e.preventDefault();
                      bookService(s.slug);
                    }}
                    className="block"
                  >
                    <KeyBlank orientation="h" className="w-full">
                      <Photo slug={s.slug} sizes="78vw" />
                    </KeyBlank>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <KeyCut name={s.slug} size={72} className="text-accent-on-light" />
                        <p className="t-row-title mt-2">{s.title}</p>
                        <p className="t-small mt-1 text-light-muted">{s.description}</p>
                      </div>
                      <ArrowIcon size={24} className="mt-8 shrink-0 text-accent-on-light" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop sticky key blank photo */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <KeyBlank className="mx-auto h-[min(68vh,620px)] w-auto">
                <Photo slug={items[st.prev].slug} sizes="400px" priority />
                <motion.div
                  key={st.cur}
                  className="absolute inset-0"
                  initial={st.moved ? { clipPath: "inset(0 100% 0 0)" } : false}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: reduce ? 0.01 : 0.4, ease: [0.76, 0, 0.24, 1] }}
                  onAnimationComplete={() => setSt((s) => (s.prev === s.cur ? s : { ...s, prev: s.cur }))}
                >
                  <Photo slug={active.slug} sizes="400px" priority />
                </motion.div>
              </KeyBlank>
              <p className="t-label mt-3 text-center text-accent-on-light" aria-live="polite">
                {active.title}
              </p>
            </div>
          </div>
        </div>

        {/* What do you drive? */}
        <Reveal className="mt-12 max-w-xl">
          <label htmlFor="car-make" className="t-label block text-accent-on-light">
            {carPicker.label}
          </label>
          <select
            id="car-make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="t-lead mt-2 w-full border-0 border-b border-light-ink/40 bg-transparent py-3 text-light-ink focus:border-b-2 focus:border-accent-on-light focus:outline-none"
          >
            <option value="">{carPicker.placeholder}</option>
            {carPicker.makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <div className="mt-4 min-h-14" aria-live="polite">
            <AnimatePresence mode="wait">
              {make && (
                <motion.div
                  key={make}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="t-lead">{carPicker.yes.replace("{make}", make)}</p>
                  <a
                    href={`/?service=${carPicker.ctaService}#book`}
                    onClick={(e) => {
                      e.preventDefault();
                      bookService(carPicker.ctaService);
                    }}
                    className="t-ui mt-2 inline-flex items-center gap-2 text-accent-on-light underline underline-offset-4"
                  >
                    {carPicker.cta} <ArrowIcon size={18} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
