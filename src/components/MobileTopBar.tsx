"use client";

import Link from "next/link";
import { Logo } from "./brand/Logo";
import { StatusChip } from "./StatusChip";
import { useSessionState } from "@/lib/demoSession";
import { StoryBar } from "./editorial/StoryBar";
import { useSide } from "./SideProvider";
import { sidePath } from "@/content/site";
import { useScrollState } from "@/lib/useScrollState";

/** Phones only. Minimal transparent top bar. Hides while scrolling down and returns on scroll up. The story progress bar stays. */
export function MobileTopBar() {
  const { side } = useSide();
  const { hidden } = useScrollState(80);
  const { session } = useSessionState();
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 md:hidden"
      style={{
        transform: hidden ? "translate3d(0, -52px, 0)" : "translate3d(0, 0, 0)",
        transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="flex h-[52px] items-center justify-between bg-gradient-to-b from-scrim/55 to-transparent px-4">
        <Link href={sidePath[side]} aria-label="SB home">
          <Logo className="h-[30px] w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          {session && (
            <Link href="/account" aria-label="My account" className="accent-bg t-ui flex h-9 w-9 items-center justify-center rounded-full text-on-accent">
              {session.initials}
            </Link>
          )}
          <StatusChip className="rounded-full border border-line bg-base/55 px-3 py-1.5 backdrop-blur-[12px]" />
        </div>
      </div>
      <StoryBar />
    </header>
  );
}
