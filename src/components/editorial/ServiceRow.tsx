"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { KeyCut } from "@/components/brand/KeyCut";
import { ArrowIcon } from "@/components/brand/Icons";
import { selectService } from "@/lib/serviceSelection";

type Props = { title: string; description: string; slug: string; tone: "dark" | "light" };

/** Editorial service row. The key cut is unique to the service. Links to booking with the service chosen. */
export function ServiceRow({ title, description, slug, tone }: Props) {
  const reduce = useReducedMotion();
  const [replay, setReplay] = useState(0);
  const light = tone === "light";

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    selectService(slug);
    document.getElementById("book")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <li>
      <a
        href={`/?service=${slug}#book`}
        onClick={go}
        onPointerEnter={() => setReplay((n) => n + 1)}
        className={`group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border-b py-5 transition-colors sm:flex after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 sm:gap-6 sm:py-6 ${
          light ? "border-light-ink/15" : "border-accent/20"
        }`}
      >
        <KeyCut
          name={slug}
          size={104}
          animate
          replay={replay}
          className={`w-[84px] shrink-0 sm:w-[104px] ${light ? "text-accent-on-light" : "text-accent"}`}
        />
        <span className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:row-start-auto sm:flex-1">
          <span className="t-row-title block">{title}</span>
          <span className={`t-small mt-1 block ${light ? "text-light-muted" : "text-ink/65"}`}>
            {description}
          </span>
        </span>
        <ArrowIcon
          size={24}
          className={`col-start-2 row-start-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 sm:col-start-auto sm:row-start-auto ${light ? "text-accent-on-light" : "text-accent"}`}
        />
      </a>
    </li>
  );
}
