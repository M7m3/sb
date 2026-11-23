import type { Side } from "@/content/site";

/** Tag for which side a job belongs to: gold for Locksmith, blue for Automotive (each pill uses its own side tokens). */
export function SidePill({ side }: { side: Side }) {
  return (
    <span data-side={side} className="t-label inline-block rounded-full border border-accent/50 bg-accent/15 px-2.5 py-0.5 text-accent-light">
      {side === "locksmith" ? "Locksmith" : "Automotive"}
    </span>
  );
}
