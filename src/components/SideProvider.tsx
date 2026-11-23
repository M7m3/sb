"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { sidePath, type Side } from "@/content/site";
import { TransitionOverlay, type OverlayState } from "./TransitionOverlay";
import { rememberSide, useLastSide } from "@/lib/lastSide";

type Fx = { kind: "key" | "car" | null; n: number };

type SideContextValue = {
  /** Side that matches the current route. */
  side: Side;
  /** Side to highlight in the toggle (updates instantly while switching). */
  shown: Side;
  busy: boolean;
  /** False while the overlay covers the screen, so page content can wait to animate in. */
  revealed: boolean;
  fx: Fx;
  switchSide: (to: Side, origin?: { x: number; y: number }, hash?: string) => void;
};

const SideContext = createContext<SideContextValue | null>(null);

export function useSide() {
  const ctx = useContext(SideContext);
  if (!ctx) throw new Error("useSide must be used inside SideProvider");
  return ctx;
}

export function SideProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  // The account pages belong to both sides, so they show the side you came from.
  const onAccount = pathname.startsWith("/account");
  const lastSide = useLastSide();
  const side: Side = pathname.startsWith("/automotive") ? "automotive" : onAccount ? lastSide : "locksmith";

  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const [pending, setPending] = useState<Side | null>(null);
  const [revealed, setRevealed] = useState(true);
  const [fx, setFx] = useState<Fx>({ kind: null, n: 0 });
  const busyRef = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.side = side;
    if (!onAccount) rememberSide(side);
  }, [side, onAccount]);

  // Warm both routes so the first switch is as fast as the rest.
  useEffect(() => {
    router.prefetch(sidePath.locksmith);
    router.prefetch(sidePath.automotive);
  }, [router]);

  const switchSide = useCallback<SideContextValue["switchSide"]>(
    (to, origin, hash = "") => {
      if (busyRef.current) return;
      if (to === side) {
        // On the same side we only scroll, except from the account pages, where we go back to the side's page.
        if (hash || onAccount) router.push(sidePath[to] + hash);
        return;
      }
      busyRef.current = true;
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 40;
      setPending(to);
      setRevealed(false);
      setFx((f) => ({ kind: to === "automotive" ? "key" : "car", n: f.n + 1 }));
      setOverlay({ to, from: side, x, y, target: sidePath[to] + hash, reduced: !!reduce });
    },
    [side, router, reduce, onAccount],
  );

  const onCovered = useCallback(() => {
    if (overlay) router.push(overlay.target);
  }, [overlay, router]);

  const onReveal = useCallback(() => setRevealed(true), []);

  const onDone = useCallback(() => {
    busyRef.current = false;
    setOverlay(null);
    setPending(null);
    setRevealed(true);
  }, []);

  const value = useMemo<SideContextValue>(
    () => ({
      side,
      shown: pending ?? side,
      busy: overlay !== null,
      revealed,
      fx,
      switchSide,
    }),
    [side, pending, overlay, revealed, fx, switchSide],
  );

  return (
    <SideContext.Provider value={value}>
      <div data-side={side} data-logo={pending ?? side} className="logo-shell min-h-screen bg-base text-ink">
        {children}
      </div>
      {overlay && (
        <TransitionOverlay
          overlay={overlay}
          routeReady={pathname === sidePath[overlay.to]}
          onCovered={onCovered}
          onReveal={onReveal}
          onDone={onDone}
        />
      )}
    </SideContext.Provider>
  );
}
