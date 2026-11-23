"use client";

import { useState } from "react";
import Image from "next/image";
import { SidePill } from "../SidePill";
import { PageHeading } from "./Heading";
import { KeyCut } from "@/components/brand/KeyCut";
import { demoJobs, demoPlaces, demoVehicles, fmtDate } from "@/content/demo-account";
import { slugify } from "@/content/helpers";

type Filter = "all" | "locksmith" | "automotive";

/** History. A timeline of every job from both sides, newest first. Filter by side, vehicle or place. */
export function HistoryPage() {
  const [side, setSide] = useState<Filter>("all");
  const [where, setWhere] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const nameOf = (id?: string, pid?: string) => {
    const v = demoVehicles.find((x) => x.id === id);
    if (v) return `${v.year} ${v.make} ${v.model}`;
    const p = demoPlaces.find((x) => x.id === pid);
    return p ? `${p.label}: ${p.address}` : "";
  };

  const jobs = demoJobs.filter((j) => (side === "all" || j.side === side) && (!where || j.vehicleId === where || j.placeId === where));

  return (
    <div>
      <PageHeading label="History" title="History" />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div role="radiogroup" aria-label="Filter by side" className="flex gap-2">
          {(["all", "locksmith", "automotive"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={side === f}
              onClick={() => setSide(f)}
              className={`t-ui min-h-11 rounded-full border px-4 capitalize ${side === f ? "border-accent bg-accent/15 text-accent-light" : "border-accent/25 text-ink/80"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2">
          <span className="t-label text-accent-light">Vehicle or place</span>
          <select value={where} onChange={(e) => setWhere(e.target.value)} className="t-small min-h-11 border border-accent/30 bg-surface px-3 text-ink">
            <option value="">All</option>
            {demoVehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model}
              </option>
            ))}
            {demoPlaces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {jobs.length === 0 && <p className="t-body text-ink/70">No jobs match these filters.</p>}

      <ol className="relative ml-2 border-l border-accent/30 pl-6 sm:pl-8">
        {jobs.map((j) => {
          const isOpen = open === j.id;
          return (
            <li key={j.id} className="relative pb-8">
              <span aria-hidden="true" className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-accent bg-base sm:-left-[39px]" />
              <div className="border border-line bg-surface">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`job-${j.id}`}
                  onClick={() => setOpen(isOpen ? null : j.id)}
                  className="flex w-full items-start gap-4 p-5 text-left"
                >
                  <KeyCut name={slugify(j.service)} size={72} className="hidden w-[72px] shrink-0 text-accent sm:block" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <SidePill side={j.side} />
                      <span className="t-small text-muted">{fmtDate(j.date)}</span>
                    </span>
                    <span className="t-heading mt-2 block">{j.service}</span>
                    <span className="t-small mt-1 block text-ink/75">
                      {nameOf(j.vehicleId, j.placeId)} · {j.tech} · {j.status}
                    </span>
                  </span>
                  <span className="t-label shrink-0 text-accent-light">{isOpen ? "Close" : "Details"}</span>
                </button>

                <div id={`job-${j.id}`} className="grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="border-t border-line p-5">
                      <p className="t-body text-ink/90">{j.notes}</p>
                      <dl className="t-small mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div>
                          <dt className="t-label text-accent-light">Technician</dt>
                          <dd className="mt-1">{j.tech}</dd>
                        </div>
                        <div>
                          <dt className="t-label text-accent-light">Status</dt>
                          <dd className="mt-1">{j.status}</dd>
                        </div>
                        <div>
                          <dt className="t-label text-accent-light">Price</dt>
                          <dd className="mt-1">{j.price} (placeholder)</dd>
                        </div>
                        <div>
                          <dt className="t-label text-accent-light">Invoice</dt>
                          <dd className="mt-1">
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-accent-light underline underline-offset-4">
                              Download invoice
                            </a>
                          </dd>
                        </div>
                      </dl>
                      {j.photos.length > 0 && (
                        <ul className="mt-4 flex gap-2">
                          {j.photos.slice(0, 3).map((p, i) => (
                            <li key={i} className="relative h-20 w-28 overflow-hidden border border-line">
                              <Image src={p.src} alt={p.alt} fill sizes="112px" className="object-cover" />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Always show a short preview of the notes when closed */}
                {!isOpen && <p className="t-small line-clamp-1 border-t border-line px-5 py-3 text-ink/70">{j.notes}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
