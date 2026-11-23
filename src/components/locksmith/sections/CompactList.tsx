"use client";

import { KeyCut } from "@/components/brand/KeyCut";
import { bookService } from "@/lib/serviceSelection";
import type { Service } from "@/content/types";

/** Compact service list with key cuts. Every item links to booking with the service chosen. */
export function CompactList({ items, tone, cols = 2 }: { items: Service[]; tone: "dark" | "light"; cols?: 1 | 2 }) {
  const light = tone === "light";
  return (
    <ul className={`grid gap-x-6 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((s) => (
        <li key={s.slug}>
          <a
            href={`/?service=${s.slug}#book`}
            onClick={(e) => {
              e.preventDefault();
              bookService(s.slug);
            }}
            className={`group flex min-h-14 items-center gap-3 border-b py-3 ${light ? "border-light-ink/15" : "border-accent/20"}`}
          >
            <KeyCut name={s.slug} size={64} className={`w-16 shrink-0 ${light ? "text-accent-on-light" : "text-accent"}`} />
            <span className="t-body min-w-0 flex-1 font-medium underline-offset-4 group-hover:underline">{s.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
