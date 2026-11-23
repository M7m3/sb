"use client";

import { useSyncExternalStore } from "react";
import type { Side } from "@/content/site";

// The account pages belong to both sides. They show the side you came from.
const KEY = "sb-last-side";
const listeners = new Set<() => void>();

export function rememberSide(side: Side) {
  try {
    sessionStorage.setItem(KEY, side);
  } catch {}
  listeners.forEach((l) => l());
}

const read = (): Side => {
  try {
    return sessionStorage.getItem(KEY) === "automotive" ? "automotive" : "locksmith";
  } catch {
    return "locksmith";
  }
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export const useLastSide = (): Side => useSyncExternalStore(subscribe, read, () => "locksmith");
