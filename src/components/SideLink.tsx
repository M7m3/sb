"use client";

import Link from "next/link";
import { useSide } from "./SideProvider";
import { sidePath, type Side } from "@/content/site";

/** Link to a section on either side. Crossing sides plays the switch animation. */
export function SideLink({
  to,
  hash = "",
  className,
  children,
}: {
  to: Side;
  hash?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { side, switchSide } = useSide();
  return (
    <Link
      href={sidePath[to] + hash}
      className={className}
      onClick={(e) => {
        if (to === side) return;
        e.preventDefault();
        const r = e.currentTarget.getBoundingClientRect();
        switchSide(to, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, hash);
      }}
    >
      {children}
    </Link>
  );
}
