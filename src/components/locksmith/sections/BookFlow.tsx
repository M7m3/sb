"use client";

import { useActionState, useState } from "react";
import { createBooking, type BookingState } from "@/app/actions";
import { KeyCut, KeyLoader, KeyProgress } from "@/components/brand/KeyCut";
import { Reveal } from "@/components/Reveal";
import { bookFlow as copy } from "@/content/locksmith-sections";
import { site } from "@/content/site";
import { useSelectedService } from "@/lib/serviceSelection";
import type { ServiceGroup } from "@/content/types";

const initial: BookingState = { status: "idle", message: "" };
const CUTS = [0, 2, 3, 5, 6]; // teeth cut after 0 to 4 completed steps

const field =
  "t-lead w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-ink placeholder:text-muted focus:border-b-2 focus:border-accent focus:outline-none";
const label = "t-label mb-1 block text-accent-light";

/** Book. Four steps in one section. A key blade gets its teeth cut as each step is completed. */
export function BookFlow({ groups }: { groups: ServiceGroup[] }) {
  const [state, action, pending] = useActionState(createBooking, initial);
  const slug = useSelectedService();

  const bySlug: Record<string, { title: string; cat: string }> = {};
  for (const g of groups) for (const s of g.items) bySlug[s.slug] = { title: s.title, cat: g.id };

  const [step, setStep] = useState(0);
  const [cat, setCat] = useState("");
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [win, setWin] = useState(copy.windows[3]);
  const [emergency, setEmergency] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // A ?service= link or a "Book" tap fills steps 1 and 2 and starts at step 3. Everything stays editable.
  const [applied, setApplied] = useState<string | null>(null);
  if (slug !== applied) {
    setApplied(slug);
    const hit = slug ? bySlug[slug] : undefined;
    if (hit) {
      setCat(hit.cat);
      setService(hit.title);
      setStep((s) => Math.max(s, 2));
      setError("");
    }
  }

  const finished = state.status === "saved" || state.status === "demo";
  const group = groups.find((g) => g.id === cat);
  const cuts = finished ? 6 : CUTS[step];
  const needs = ["Please choose car, home or business.", "Please choose a service.", "Please choose your area" + (emergency ? "." : " and a date."), "Please add your name and a phone number."];

  const valid = (s: number) => {
    if (s === 0) return !!cat;
    if (s === 1) return !!service;
    if (s === 2) return !!area && (emergency || !!date);
    return !!name.trim() && phone.replace(/\D/g, "").length >= 7;
  };
  const next = () => {
    if (!valid(step)) return setError(needs[step]);
    setError("");
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const message = [notes.trim(), `Time window: ${emergency ? "Emergency, as soon as possible" : win}`].filter(Boolean).join("\n");
  const fullArea = [address.trim(), area].filter(Boolean).join(", ");

  return (
    <section id="book" className="sec-surface scroll-mt-20 py-20 max-md:pb-40 lg:py-28">
      <div className="story-container">
        <Reveal>
          <p className="t-label text-accent-light">Book</p>
          <h2 className="t-display-m mt-4">{copy.title}</h2>
          <p className="t-lead mt-4 max-w-xl text-ink/80">{copy.line}</p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10 max-w-3xl">
          {finished ? (
            <div className="border border-accent/30 p-6 sm:p-8" role="status">
              <KeyProgress cuts={6} size={240} className="text-accent" />
              <p className="t-heading mt-6">{state.status === "saved" ? copy.success : "Thanks. Almost there."}</p>
              <p className="t-lead mt-3 text-ink/80">{state.status === "saved" ? state.message : state.message}</p>
            </div>
          ) : (
            <form
              action={action}
              onSubmit={(e) => {
                if (!valid(3)) {
                  e.preventDefault();
                  setError(needs[3]);
                }
              }}
            >
              <input type="hidden" name="side" value="LOCKSMITH" />
              <input type="hidden" name="service" value={service} />
              <input type="hidden" name="area" value={fullArea} />
              <input type="hidden" name="preferredDate" value={emergency ? "" : date} />
              <input type="hidden" name="message" value={message} />
              <input type="hidden" name="name" value={name} />
              <input type="hidden" name="phone" value={phone} />
              <input type="hidden" name="email" value={email} />

              {/* Progress: a key blade, one tooth per step */}
              <div className="flex items-center gap-4">
                <KeyProgress cuts={cuts} size={200} className="text-accent" />
                <p className="t-label text-ink/80" aria-live="polite">
                  Step {step + 1} / 4 · {copy.steps[step]}
                </p>
              </div>

              <div className="mt-8 min-h-[320px]">
                <h3 className="t-heading">{copy.steps[step]}</h3>

                {step === 0 && (
                  <div role="radiogroup" aria-label={copy.steps[0]} className="mt-6 border-t border-accent/20">
                    {copy.categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={cat === c.id}
                        onClick={() => {
                          setCat(c.id);
                          if (cat !== c.id) setService("");
                          setError("");
                        }}
                        className="flex w-full min-h-[72px] items-center justify-between border-b border-accent/20 py-2 text-left"
                      >
                        <span className="pick-word t-display-m" data-selected={cat === c.id}>
                          {c.label}
                        </span>
                        <span className="t-label text-accent-light">{cat === c.id ? "Selected" : ""}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div role="radiogroup" aria-label={copy.steps[1]} className="mt-6 border-t border-accent/20">
                    {(group?.items ?? []).map((s) => (
                      <button
                        key={s.slug}
                        type="button"
                        role="radio"
                        aria-checked={service === s.title}
                        onClick={() => {
                          setService(s.title);
                          setError("");
                        }}
                        className={`relative flex w-full min-h-[72px] items-center gap-4 border-b border-accent/20 py-3 pl-4 text-left transition-colors ${
                          service === s.title ? "bg-accent/10" : ""
                        }`}
                      >
                        <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-[3px] origin-center bg-accent transition-transform ${service === s.title ? "scale-y-100" : "scale-y-0"}`} />
                        <KeyCut name={s.slug} size={72} className="w-[72px] shrink-0 text-accent" />
                        <span className="min-w-0">
                          <span className="t-ui block">{s.title}</span>
                          <span className="t-small block text-ink/70">{s.description}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <label className="block">
                      <span className={label}>Area</span>
                      <select value={area} onChange={(e) => setArea(e.target.value)} className={`${field} bg-surface`}>
                        <option value="">Choose your area</option>
                        {site.areas.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                        <option value="Other area">Other area (tell us below)</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className={label}>Street address (optional)</span>
                      <input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" placeholder="123 Example St" className={field} />
                    </label>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={emergency}
                      onClick={() => setEmergency((v) => !v)}
                      className="flex min-h-12 items-center gap-3 text-left sm:col-span-2"
                    >
                      <span className={`relative h-7 w-12 rounded-full border border-accent/60 transition-colors ${emergency ? "bg-accent/30" : ""}`}>
                        <span className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-accent transition-transform ${emergency ? "translate-x-5" : ""}`} />
                      </span>
                      <span className="t-ui">Emergency, as soon as possible</span>
                    </button>

                    <div className={`grid gap-x-8 gap-y-6 sm:col-span-2 sm:grid-cols-2 ${emergency ? "pointer-events-none opacity-40" : ""}`} aria-hidden={emergency}>
                      <label className="block">
                        <span className={label}>Preferred date</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={emergency} className={`${field} [color-scheme:dark]`} />
                      </label>
                      <fieldset disabled={emergency}>
                        <legend className={label}>Time window</legend>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {copy.windows.map((w) => (
                            <button
                              key={w}
                              type="button"
                              role="radio"
                              aria-checked={win === w}
                              onClick={() => setWin(w)}
                              className={`t-ui min-h-11 rounded-full border px-4 ${win === w ? "border-accent bg-accent/15 text-accent-light" : "border-accent/30 text-ink/80"}`}
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <label className="block">
                      <span className={label}>Name</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" className={field} />
                    </label>
                    <label className="block">
                      <span className={label}>Phone</span>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" placeholder="(416) 000 0000" className={field} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className={label}>Email (optional)</span>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com" className={field} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className={label}>Notes (optional)</span>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Tell us what is going on" className={field} />
                    </label>
                  </div>
                )}
              </div>

              <div role="status" aria-live="polite" className="t-small min-h-6 text-danger">
                {error || (state.status === "error" ? state.message : "")}
              </div>

              {/* Back and Next. On phones this bar sticks above the tab bar. */}
              <div className="mt-4 flex gap-3 max-md:sticky max-md:bottom-[calc(96px+env(safe-area-inset-bottom))] max-md:z-30 max-md:-mx-5 max-md:bg-surface/90 max-md:px-5 max-md:py-3 max-md:backdrop-blur-[12px]">
                {step > 0 && (
                  <button type="button" onClick={back} className="t-ui min-h-12 rounded-full border border-accent/60 px-8 text-ink">
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button type="button" onClick={next} className="accent-bg t-ui min-h-12 flex-1 rounded-full px-8 text-on-accent">
                    Next
                  </button>
                ) : (
                  <button type="submit" disabled={pending} className="accent-bg t-ui inline-flex min-h-12 flex-1 items-center justify-center gap-3 rounded-full px-8 text-on-accent disabled:opacity-80">
                    {pending && <KeyLoader size={42} />}
                    {pending ? "Sending..." : "Book now"}
                  </button>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
