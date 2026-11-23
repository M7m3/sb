"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSide } from "@/components/SideProvider";

/**
 * Key turn + keyhole reveal intro. Tweak the timings here (all in seconds).
 * Total should stay under 2s.
 */
const T = {
  keyholeIn: { delay: 0, duration: 0.3 },
  keySlide: { delay: 0.25, duration: 0.5 },
  turn: { delay: 0.75, duration: 0.25 },
  reveal: { delay: 1.0, duration: 0.5 },
  /** When the hero text starts to stagger in (CSS handles the 70ms steps). */
  contentAt: 1.15,
  /** When the overlay is removed from the DOM. */
  endAt: 1.6,
  /** How far the keyhole mask grows. Large enough to cover any viewport. */
  revealScale: 70,
  revealEase: [0.6, 0, 0.3, 1] as [number, number, number, number],
  keyFade: 0.15,
  keyStartX: "-55vw",
};

const STORAGE_KEY = "sb-hero-intro-seen";
const BASE = "var(--base)";

type Phase = "pending" | "playing" | "done";

const HeroCtx = createContext({ ready: false });
/** True once the intro is finished and the hero is visible. */
export const useHeroReady = () => useContext(HeroCtx).ready;

export function HeroShell({ children, withIntro = true }: { children: React.ReactNode; withIntro?: boolean }) {
  const { revealed } = useSide();
  const [phase, setPhase] = useState<Phase>("pending");
  const [contentGo, setContentGo] = useState(false);

  // Decide whether to play: once per session, never with reduced motion.
  useEffect(() => {
    if (phase !== "pending" || !revealed) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!withIntro || seen || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    setPhase("playing");
  }, [phase, revealed, withIntro]);

  // Timers and skip handling while playing.
  useEffect(() => {
    if (phase !== "playing") return;
    // Mark as seen (written here, not in the decide effect, so React Strict Mode re-runs stay correct).
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    const t1 = setTimeout(() => setContentGo(true), T.contentAt * 1000);
    const t2 = setTimeout(() => setPhase("done"), T.endAt * 1000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhase("done");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  const ready = revealed && (phase === "done" || contentGo);
  const ctx = useMemo(() => ({ ready: ready && phase === "done" }), [ready, phase]);
  const playing = phase === "playing";

  return (
    <HeroCtx.Provider value={ctx}>
      <section
        data-hero={ready ? "ready" : "pending"}
        className="relative isolate flex min-h-[100svh] overflow-hidden bg-base"
      >
        {children}
      </section>

      {phase !== "done" && (
        <div
          aria-hidden="true"
          onPointerDown={() => setPhase("done")}
          className="fixed inset-0 z-[90] grid cursor-pointer place-items-center overflow-hidden [--kh:72px] [--kw:140px] md:[--kh:96px] md:[--kw:200px]"
        >
          {/* Black layer with a keyhole-shaped hole. Scaling it grows the hole and reveals the hero. */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundColor: BASE,
              WebkitMaskImage: "linear-gradient(#000,#000), url(/hero-assets/keyhole.svg)",
              maskImage: "linear-gradient(#000,#000), url(/hero-assets/keyhole.svg)",
              WebkitMaskSize: "100% 100%, auto var(--kh)",
              maskSize: "100% 100%, auto var(--kh)",
              WebkitMaskPosition: "center, center",
              maskPosition: "center, center",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
            animate={playing ? { scale: [1, T.revealScale] } : undefined}
            transition={{ delay: T.reveal.delay, duration: T.reveal.duration, ease: T.revealEase }}
          />

          {/* Black plug: fills the hole so the photo never shows before the reveal */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: BASE,
              WebkitMaskImage: "url(/hero-assets/keyhole.svg)",
              maskImage: "url(/hero-assets/keyhole.svg)",
              WebkitMaskSize: "auto var(--kh)",
              maskSize: "auto var(--kh)",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
            animate={playing ? { opacity: [1, 1, 0] } : undefined}
            transition={{
              duration: T.reveal.delay + 0.18,
              times: [0, T.reveal.delay / (T.reveal.delay + 0.18), 1],
              ease: "linear",
            }}
          />

          {/* Gold keyhole */}
          { }
          <motion.img
            src="/hero-assets/keyhole.svg"
            alt=""
            draggable={false}
            className="relative w-auto will-change-transform"
            style={{ height: "var(--kh)", filter: "drop-shadow(0 0 18px color-mix(in srgb, var(--accent) 55%, transparent))", opacity: 0 }}
            animate={
              playing
                ? {
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 1],
                  }
                : undefined
            }
            transition={{
              duration: T.reveal.delay + 0.18,
              times: [
                0,
                T.keyholeIn.duration / (T.reveal.delay + 0.18),
                T.reveal.delay / (T.reveal.delay + 0.18),
                1,
              ],
              ease: "easeOut",
            }}
          />

          {/* Flash ring when the key turns */}
          <motion.div
            className="absolute rounded-full border-2 border-accent-light will-change-transform"
            style={{
              width: "calc(var(--kh) * 1.1)",
              height: "calc(var(--kh) * 1.1)",
              boxShadow: "0 0 24px color-mix(in srgb, var(--accent-light) 60%, transparent)",
              opacity: 0,
            }}
            animate={playing ? { opacity: [0, 0.9, 0], scale: [0.6, 1.1, 2.4] } : undefined}
            transition={{ delay: T.turn.delay + 0.1, duration: 0.5, ease: "easeOut" }}
          />

          {/* Key. Its tip (90% along the shaft) ends at the keyhole circle. */}
          { }
          <motion.img
            src="/hero-assets/key.svg"
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              width: "var(--kw)",
              height: "auto",
              marginLeft: "calc(var(--kw) * -0.9)",
              marginTop: "calc(var(--kw) * -0.1667 - var(--kh) * 0.217)",
              transformOrigin: "90% 50%",
              opacity: 0,
              filter: "drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 35%, transparent))",
            }}
            initial={{ x: T.keyStartX }}
            animate={
              playing
                ? {
                    x: [T.keyStartX, 0],
                    opacity: [0, 1, 1, 0],
                    scaleY: [1, 0.2, 1],
                    rotate: [0, -6, 2, 0],
                  }
                : undefined
            }
            transition={{
              x: { delay: T.keySlide.delay, duration: T.keySlide.duration, ease: [0.16, 1, 0.3, 1] },
              opacity: {
                delay: T.keySlide.delay,
                duration: T.reveal.delay + T.keyFade - T.keySlide.delay,
                times: [
                  0,
                  0.1 / (T.reveal.delay + T.keyFade - T.keySlide.delay),
                  (T.reveal.delay - T.keySlide.delay) / (T.reveal.delay + T.keyFade - T.keySlide.delay),
                  1,
                ],
              },
              scaleY: { delay: T.turn.delay, duration: T.turn.duration, ease: "easeInOut" },
              rotate: { delay: T.turn.delay, duration: T.turn.duration, times: [0, 0.4, 0.7, 1], ease: "easeOut" },
            }}
          />
        </div>
      )}
    </HeroCtx.Provider>
  );
}
