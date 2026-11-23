"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHeading, card } from "./Heading";
import { images } from "@/content/images";
import { demoVehicles, fmtDate, type Vehicle } from "@/content/demo-account";

const field =
  "t-body w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2.5 text-ink placeholder:text-muted focus:border-b-2 focus:border-accent focus:outline-none";

/** My Garage. Saved vehicles. "Add vehicle" saves to local state only (demo). */
export function GaragePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(demoVehicles);
  const [adding, setAdding] = useState(false);
  const [f, setF] = useState({ make: "", model: "", year: "", colour: "" });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.make.trim() || !f.model.trim()) return;
    setVehicles((v) => [
      ...v,
      {
        id: `v${v.length + 1}-${Date.now()}`,
        make: f.make.trim(),
        model: f.model.trim(),
        year: Number(f.year) || new Date().getFullYear(),
        colour: f.colour.trim() || "Not set",
        photo: images.account.vehicleA,
        keysOnFile: 0,
        lastService: "",
      },
    ]);
    setF({ make: "", model: "", year: "", colour: "" });
    setAdding(false);
  };

  return (
    <div>
      <PageHeading label="My Garage" title="My Garage">
        <button type="button" onClick={() => setAdding((a) => !a)} aria-expanded={adding} className="accent-bg t-ui min-h-11 rounded-full px-6 text-on-accent">
          {adding ? "Cancel" : "Add vehicle"}
        </button>
      </PageHeading>

      {adding && (
        <form onSubmit={add} className={`${card} mb-6 grid gap-x-6 gap-y-4 sm:grid-cols-2`}>
          <p className="t-small text-muted sm:col-span-2">Demo only. Saved in this browser tab, not on a server.</p>
          {(["make", "model", "year", "colour"] as const).map((k) => (
            <label key={k} className="block">
              <span className="t-label mb-1 block text-accent-light">{k}</span>
              <input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} inputMode={k === "year" ? "numeric" : undefined} className={field} />
            </label>
          ))}
          <button type="submit" className="accent-bg t-ui min-h-12 rounded-full px-6 text-on-accent sm:col-span-2">
            Save vehicle
          </button>
        </form>
      )}

      <ul className="grid gap-5 sm:grid-cols-2">
        {vehicles.map((v) => (
          <li key={v.id} className="border border-line bg-surface">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image src={v.photo.src} alt={v.photo.alt} fill sizes="(min-width: 640px) 400px, 100vw" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="t-heading">
                {v.make} {v.model}
              </p>
              <p className="t-small mt-1 text-muted">
                {v.year} · {v.colour}
              </p>
              <dl className="t-small mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                <div>
                  <dt className="t-label text-accent-light">Keys on file</dt>
                  <dd className="mt-1">{v.keysOnFile}</dd>
                </div>
                <div>
                  <dt className="t-label text-accent-light">Last service</dt>
                  <dd className="mt-1">{v.lastService ? fmtDate(v.lastService) : "None yet"}</dd>
                </div>
              </dl>
              <p className="t-small mt-3 text-muted">Key codes are never shown. We only note that a key code is on file.</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
