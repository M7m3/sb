import { HeroShell } from "./HeroShell";
import { HeroMain } from "./HeroMain";
import { HeroBlueprint } from "@/components/locksmith/art/HeroBlueprint";
import { DashBlueprint } from "@/components/automotive/art/DashBlueprint";
import { business } from "@/content/business";
import type { SideContent } from "@/content/types";

const artClass =
  "pointer-events-none absolute left-1/2 top-[54%] w-[190vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-accent opacity-[0.1] lg:left-auto lg:right-[-6%] lg:top-1/2 lg:w-[64vw] lg:translate-x-0";

/** Type first hero for either side. Blueprint line art behind, then the three giant words. */
export function SideHero({ content }: { content: SideContent }) {
  const locksmith = content.side === "locksmith";
  return (
    // The key and keyhole intro belongs to the Locksmith side only.
    <HeroShell withIntro={locksmith}>
      <noscript>
        <style>{`.hero-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      {locksmith ? <HeroBlueprint className={artClass} /> : <DashBlueprint className={artClass} />}
      <div className="pointer-events-none absolute inset-0 sec-grain-ink" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,color-mix(in_srgb,var(--scrim)_55%,transparent)_100%)]" />
      <HeroMain ed={content.editorial} phone={business.phone} phoneHref={business.phoneHref} />
    </HeroShell>
  );
}
