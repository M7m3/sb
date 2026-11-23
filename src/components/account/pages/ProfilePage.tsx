"use client";

import { useState } from "react";
import { PageHeading, card } from "./Heading";
import { demoCustomer } from "@/content/demo-account";

const field =
  "t-body w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2.5 text-ink focus:border-b-2 focus:border-accent focus:outline-none";

function Toggle({ label, on, set }: { label: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => set(!on)} className="flex min-h-12 w-full items-center justify-between gap-4 border-b border-line text-left">
      <span className="t-body">{label}</span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full border border-accent/60 transition-colors ${on ? "bg-accent/30" : ""}`}>
        <span className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-accent transition-transform ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

/** Profile. Name, phone, email and notification preferences. Demo only. */
export function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({ reminders: true, updates: true, offers: false });

  return (
    <div>
      <PageHeading label="Profile" title="Profile" />
      <form
        className={`${card} grid gap-x-6 gap-y-5 sm:grid-cols-2`}
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        {[
          ["First name", demoCustomer.first],
          ["Last name", demoCustomer.last],
          ["Phone", demoCustomer.phone],
          ["Email", demoCustomer.email],
        ].map(([l, v]) => (
          <label key={l} className="block">
            <span className="t-label mb-1 block text-accent-light">{l}</span>
            <input defaultValue={v} onChange={() => setSaved(false)} className={field} />
          </label>
        ))}
        <div className="sm:col-span-2">
          <h2 className="t-label text-accent-light">Notifications</h2>
          <div className="mt-2 border-t border-line">
            <Toggle label="Booking reminders" on={prefs.reminders} set={(v) => setPrefs({ ...prefs, reminders: v })} />
            <Toggle label="Job updates and invoices" on={prefs.updates} set={(v) => setPrefs({ ...prefs, updates: v })} />
            <Toggle label="Offers and news" on={prefs.offers} set={(v) => setPrefs({ ...prefs, offers: v })} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="accent-bg t-ui min-h-12 rounded-full px-8 text-on-accent">
            Save changes
          </button>
          <p role="status" aria-live="polite" className="t-small mt-3 min-h-5 text-accent-light">
            {saved ? "Demo only: changes are not saved anywhere." : ""}
          </p>
          <p className="t-small text-muted">Customer since {demoCustomer.since}.</p>
        </div>
      </form>
    </div>
  );
}
