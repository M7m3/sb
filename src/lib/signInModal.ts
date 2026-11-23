"use client";

import { useSyncExternalStore } from "react";

let open = false;
const listeners = new Set<() => void>();
const set = (v: boolean) => {
  open = v;
  listeners.forEach((l) => l());
};

export const openSignIn = () => set(true);
export const closeSignIn = () => set(false);

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export const useSignInOpen = () => useSyncExternalStore(subscribe, () => open, () => false);
