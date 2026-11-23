"use client";

import { useState } from "react";
import { SidePill } from "../SidePill";
import { PageHeading, card } from "./Heading";
import { demoBookings, fmtDate } from "@/content/demo-account";

/** Bookings. Upcoming and past. Reschedule and Cancel are demo only. */
export function BookingsPage() {
  const [cancelled, setCancelled] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const upcoming = demoBookings.filter((b) => b.status === "Confirmed");
  const past = demoBookings.filter((b) => b.status === "Completed");

  return (
    <div>
      <PageHeading label="Bookings" title="Bookings" />
      <p role="status" aria-live="polite" className="t-small mb-4 min-h-5 text-accent-light">
        {note}
      </p>

      <h2 className="t-label text-accent-light">Upcoming</h2>
      <ul className="mt-4 grid gap-4">
        {upcoming.map((b) => {
          const gone = cancelled.includes(b.id);
          return (
            <li key={b.id} className={`${card} ${gone ? "opacity-50" : ""}`}>
              <SidePill side={b.side} />
              <p className="t-heading mt-3">{b.service}</p>
              <p className="t-lead mt-2 text-ink/80">
                {fmtDate(b.date)} · {b.window}
              </p>
              <p className="t-small mt-1 text-muted">{b.where}</p>
              <p className="t-small mt-3">{gone ? "Cancelled (demo)" : b.status}</p>
              {!gone && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setNote("Demo only: rescheduling is not live yet.")} className="t-ui min-h-11 rounded-full border border-accent/50 px-5 text-ink">
                    Reschedule
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCancelled((c) => [...c, b.id]);
                      setNote("Demo only: booking cancelled in this tab.");
                    }}
                    className="t-ui min-h-11 rounded-full border border-danger/60 px-5 text-danger"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <h2 className="t-label mt-10 text-accent-light">Past</h2>
      <ul className="mt-4 border-t border-line">
        {past.map((b) => (
          <li key={b.id} className="flex flex-wrap items-center gap-3 border-b border-line py-4">
            <SidePill side={b.side} />
            <span className="t-ui">{b.service}</span>
            <span className="t-small text-muted">
              {fmtDate(b.date)} · {b.window}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
