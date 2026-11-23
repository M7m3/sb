"use client";

import { DesktopNav } from "./DesktopNav";
import { MobileTopBar } from "./MobileTopBar";
import { TabBar } from "./TabBar";

/**
 * Navigation. Desktop (768px and up): floating islands, max 64px including the 12px offset.
 * Phones: minimal top bar plus a floating bottom tab bar (Locksmith and Automotive tabs are the side switch).
 */
export function Navbar() {
  return (
    <>
      <DesktopNav />
      <MobileTopBar />
      <TabBar />
    </>
  );
}
