"use client";

import { PageHeading, card } from "./Heading";
import { demoPlaces } from "@/content/demo-account";

/** My Places. Saved home and business addresses with the locks fitted there. */
export function PlacesPage() {
  return (
    <div>
      <PageHeading label="My Places" title="My Places" />
      <ul className="grid gap-5 md:grid-cols-2">
        {demoPlaces.map((p) => (
          <li key={p.id} className={card}>
            <p className="t-label text-accent-light">{p.label}</p>
            <p className="t-heading mt-3">{p.address}</p>
            <ul className="mt-5 border-t border-line">
              {p.locks.map((l) => (
                <li key={l} className="t-body border-b border-line py-3 text-ink/85">
                  {l}
                </li>
              ))}
            </ul>
            <p className="t-small mt-4 text-muted">Key code on file. Codes are never displayed.</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
