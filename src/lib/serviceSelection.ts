"use client";

import { useSyncExternalStore } from "react";

// Tiny shared store for the service chosen via quick-pick chips or a ?service= link.
let current: string | null | undefined; // undefined = not read from the URL yet
const listeners = new Set<() => void>();

const read = (): string | null => {
  if (typeof window === "undefined") return null;
  if (current === undefined) {
    current = new URLSearchParams(window.location.search).get("service");
  }
  return current;
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export function selectService(slug: string) {
  current = slug;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("service", slug);
    url.hash = "book";
    window.history.replaceState(null, "", url.toString());
  } catch {}
  listeners.forEach((l) => l());
}

/** Slug of the selected service, or null. Always null during server render and hydration. */
export const useSelectedService = () => useSyncExternalStore(subscribe, read, () => null);

/** Pick a service and scroll to the booking section. Used by every "Book" link on the page. */
export function bookService(slug: string) {
  selectService(slug);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("book")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
