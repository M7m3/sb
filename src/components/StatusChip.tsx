"use client";

import { useSyncExternalStore } from "react";
import { statusSnapshot } from "@/lib/businessStatus";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};

/** Small live status chip: dot plus "Available now" or "Opens 8:00 AM ...". Neutral on the server. */
export function StatusChip({ className = "" }: { className?: string }) {
  const snap = useSyncExternalStore(subscribe, statusSnapshot, () => "");
  const known = snap !== "";
  const open = snap.startsWith("1|");
  const label = known ? snap.slice(2) : "Available now";

  return (
    <p className={`t-micro flex items-center gap-2 whitespace-nowrap text-ink/90 ${className}`}>
      <span
        aria-hidden="true"
        className={`status-dot ${known ? (open ? "status-open" : "status-closed") : "status-unknown"}`}
      />
      <span className={`font-medium ${known ? "" : "opacity-0"}`}>{label}</span>
    </p>
  );
}
