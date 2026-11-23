"use client";

import { useEffect, useState } from "react";

/**
 * Scroll helpers for the header.
 * scrolled: scrolled past `threshold` px.
 * hidden: scrolling down past the threshold (shows again on any scroll up).
 */
export function useScrollState(threshold = 80) {
  const [state, setState] = useState({ scrolled: false, hidden: false });

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - last;
      setState((s) => {
        const scrolled = y > threshold;
        let hidden = s.hidden;
        if (y <= threshold) hidden = false;
        else if (dy > 6) hidden = true;
        else if (dy < -6) hidden = false;
        return scrolled === s.scrolled && hidden === s.hidden ? s : { scrolled, hidden };
      });
      if (Math.abs(dy) > 6) last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return state;
}
