"use client";

import { useSyncExternalStore } from "react";

/** Scroll story state shared by the sticky lock, the mobile progress bar and the final CTA. */
export type Story = {
  active: boolean; // the locksmith story is on the page
  started: boolean; // first story section has reached the viewport
  lifted: number; // pins lifted, 0 to 5
  unlocked: boolean; // final CTA reached, cylinder turns
};

const initial: Story = { active: false, started: false, lifted: 0, unlocked: false };
let state = initial;
const listeners = new Set<() => void>();

export function setStory(next: Partial<Story>) {
  const n = { ...state, ...next };
  if (n.active === state.active && n.started === state.started && n.lifted === state.lifted && n.unlocked === state.unlocked) return;
  state = n;
  listeners.forEach((l) => l());
}

export function resetStory() {
  setStory(initial);
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

export const useLockStory = () => useSyncExternalStore(subscribe, () => state, () => initial);
