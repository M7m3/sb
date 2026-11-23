"use client";

import Link from "next/link";
import { SidePill } from "../SidePill";
import { PageHeading, card } from "./Heading";
import { ArrowIcon, PhoneIcon } from "@/components/brand/Icons";
import { KeyCut } from "@/components/brand/KeyCut";
import { demoBookings, demoJobs, fmtDate } from "@/content/demo-account";
import { business } from "@/content/business";
import { useSessionState } from "@/lib/demoSession";

export function OverviewPage() {
  const { session } = useSessionState();
  const next = demoBookings.find((b) => b.status === "Confirmed");
  const last = demoJobs.slice(0, 3);

  return (
    <div>
      <PageHeading label="Overview" title={`Hi, ${session?.first ?? "there"}`} />

      <div className="grid gap-5 md:grid-cols-2">
        <section className={card} aria-labelledby="next-booking">
          <h2 id="next-booking" className="t-label text-accent-light">
            Next booking
          </h2>
          {next ? (
            <div className="mt-4">
              <SidePill side={next.side} />
              <p className="t-heading mt-3">{next.service}</p>
              <p className="t-lead mt-2 text-ink/80">
                {fmtDate(next.date)} · {next.window}
              </p>
              <p className="t-small mt-1 text-muted">{next.where}</p>
              <Link href="/account/bookings" className="t-ui mt-4 inline-flex items-center gap-2 text-accent-light underline underline-offset-4">
                Manage booking <ArrowIcon size={18} />
              </Link>
            </div>
          ) : (
            <p className="t-body mt-4 text-ink/70">Nothing booked yet.</p>
          )}
        </section>

        <section className={card} aria-labelledby="quick">
          <h2 id="quick" className="t-label text-accent-light">
            Quick actions
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/#book" data-side="locksmith" className="accent-bg t-ui flex min-h-12 items-center justify-center rounded-full px-6 text-on-accent">
              Book a locksmith
            </Link>
            <Link href="/automotive#book" data-side="automotive" className="accent-bg t-ui flex min-h-12 items-center justify-center rounded-full px-6 text-on-accent">
              Book automotive
            </Link>
            <a href={business.phoneHref} className="t-ui flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/40 px-6 text-ink">
              <PhoneIcon size={18} /> Call {business.phone}
            </a>
          </div>
        </section>
      </div>

      <section className="mt-8" aria-labelledby="recent">
        <div className="flex items-center justify-between">
          <h2 id="recent" className="t-label text-accent-light">
            Last 3 jobs
          </h2>
          <Link href="/account/history" className="t-small text-accent-light underline underline-offset-4">
            See all
          </Link>
        </div>
        <ul className="mt-4 border-t border-line">
          {last.map((j) => (
            <li key={j.id} className="flex items-center gap-4 border-b border-line py-4">
              <KeyCut name={j.service.toLowerCase().replace(/[^a-z0-9]+/g, "-")} size={72} className="hidden w-[72px] shrink-0 text-accent sm:block" />
              <div className="min-w-0 flex-1">
                <p className="t-ui">{j.service}</p>
                <p className="t-small text-muted">
                  {fmtDate(j.date)} · {j.tech}
                </p>
              </div>
              <SidePill side={j.side} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
