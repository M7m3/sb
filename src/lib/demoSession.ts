"use client";

import { useSyncExternalStore } from "react";

// DEMO ONLY. There is no real authentication yet. Any sign in creates this demo customer.
// The session lives in localStorage (plus a cookie flag), so it is shared by both sides of the site.
const KEY = "sb-demo-session";

export type Session = { name: string; first: string; initials: string; email: string; phone: string };

export const DEMO_CUSTOMER: Session = {
  name: "Alex Morgan",
  first: "Alex",
  initials: "AM",
  email: "alex.morgan@example.com",
  phone: "(416) 555-0142",
};

let cache: { raw: string | null | undefined; value: Session | null } = { raw: undefined, value: null };
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function read(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.value;
    cache = { raw, value: raw ? (JSON.parse(raw) as Session) : null };
    return cache.value;
  } catch {
    return null;
  }
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};

export function signIn() {
  try {
    localStorage.setItem(KEY, JSON.stringify(DEMO_CUSTOMER));
  } catch {}
  document.cookie = "sb_demo_session=1; path=/; max-age=2592000; SameSite=Lax";
  notify();
}

export function signOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  document.cookie = "sb_demo_session=; path=/; max-age=0; SameSite=Lax";
  notify();
}

const noop = () => () => {};

/** The demo session (null when signed out) and whether we are on the client yet. */
export function useSessionState() {
  const session = useSyncExternalStore(subscribe, read, () => null);
  const ready = useSyncExternalStore(noop, () => true, () => false);
  return { session, ready };
}
