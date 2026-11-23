"use client";

import { useActionState, useState } from "react";
import { createBooking, type BookingState } from "@/app/actions";
import { KeyLoader } from "@/components/brand/KeyCut";
import { ServiceSelect } from "@/components/ServiceSelect";
import type { Side } from "@/content/site";
import { useSelectedService } from "@/lib/serviceSelection";

const initial: BookingState = { status: "idle", message: "" };

const fieldDefault =
  "t-small w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const fieldEditorial =
  "t-lead w-full border-0 border-b border-light-ink/40 bg-transparent px-0 py-3 text-light-ink placeholder:text-light-faint focus:border-b-2 focus:border-accent-on-light focus:outline-none focus:ring-0";

type Props = {
  side: Side;
  serviceOptions: string[];
  /** slug (from ?service= or a service row) to service name */
  presets?: Record<string, string>;
  /** "editorial" = bottom border inputs on cream, with key cut dropdown */
  variant?: "default" | "editorial";
};

export function BookingForm({ side, serviceOptions, presets, variant = "default" }: Props) {
  const [state, action, pending] = useActionState(createBooking, initial);
  const slug = useSelectedService();
  const preset = slug && presets?.[slug] ? presets[slug] : "";
  // A manual choice wins until a different link or row changes the slug.
  const [manual, setManual] = useState<{ slug: string | null; value: string } | null>(null);
  const service = manual && manual.slug === slug ? manual.value : preset;
  const isAuto = side === "automotive";
  const ed = variant === "editorial";
  const field = ed ? fieldEditorial : fieldDefault;
  const labelCls = ed ? "t-label mb-1 block text-light-muted" : "t-small mb-1.5 block text-muted";
  const slugOf = presets
    ? Object.fromEntries(Object.entries(presets).map(([s, t]) => [t, s]))
    : ({} as Record<string, string>);

  return (
    <form
      action={action}
      className={
        ed
          ? "grid gap-x-8 gap-y-6 sm:grid-cols-2"
          : "grid gap-4 rounded-3xl border border-line bg-surface p-6 sm:grid-cols-2 sm:p-8"
      }
    >
      <input type="hidden" name="side" value={isAuto ? "AUTOMOTIVE" : "LOCKSMITH"} />

      <label className="block">
        <span className={labelCls}>Name</span>
        <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="block">
        <span className={labelCls}>Phone</span>
        <input name="phone" type="tel" required autoComplete="tel" placeholder="(416) 000 0000" className={field} />
      </label>

      <div className="block sm:col-span-2">
        <span className={labelCls}>Service</span>
        {ed ? (
          <ServiceSelect
            name="service"
            options={serviceOptions.map((t) => ({ title: t, slug: slugOf[t] ?? t.toLowerCase().replace(/[^a-z0-9]+/g, "-") }))}
            value={service}
            onChange={(v) => setManual({ slug, value: v })}
          />
        ) : (
          <select
            name="service"
            required
            value={service}
            onChange={(e) => setManual({ slug, value: e.target.value })}
            className={field}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      <label className="block">
        <span className={labelCls}>Vehicle make{isAuto ? "" : " (if a car)"}</span>
        <input name="vehicleMake" placeholder="e.g. Honda" className={field} />
      </label>
      <label className="block">
        <span className={labelCls}>Vehicle model{isAuto ? "" : " (if a car)"}</span>
        <input name="vehicleModel" placeholder="e.g. Civic" className={field} />
      </label>

      <label className="block">
        <span className={labelCls}>{isAuto ? "Your area" : "Address or area"}</span>
        <input name="area" required placeholder="e.g. Scarborough" className={field} />
      </label>
      <label className="block">
        <span className={labelCls}>Preferred date (optional)</span>
        <input name="preferredDate" type="date" className={`${field} ${ed ? "" : "[color-scheme:dark]"}`} />
      </label>

      <label className="block sm:col-span-2">
        <span className={labelCls}>Email (optional)</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={labelCls}>Message (optional)</span>
        <textarea name="message" rows={3} placeholder="Tell us what is going on" className={field} />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="accent-bg t-ui inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-80"
        >
          {pending && <KeyLoader size={42} />}
          {pending ? "Sending..." : "Send Request"}
        </button>

        <div role="status" aria-live="polite" className="t-small mt-4 min-h-6">
          {state.status !== "idle" && (
            <p
              className={`border-l-2 pl-3 ${
                state.status === "saved"
                  ? ed ? "border-success-light text-success-light" : "border-success text-success"
                  : state.status === "error"
                    ? ed ? "border-danger-light text-danger-light" : "border-danger text-danger"
                    : ed
                      ? "border-accent-on-light text-light-muted"
                      : "border-accent text-accent-light"
              }`}
            >
              {state.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
