import { SideHero } from "@/components/editorial/SideHero";
import { StoryTracker } from "@/components/editorial/StoryTracker";
import { StoryRail } from "@/components/editorial/StoryRail";
import { FinalCta } from "@/components/editorial/FinalCta";
import { CarSection } from "./sections/CarSection";
import { HomeSection } from "./sections/HomeSection";
import { BusinessSection } from "./sections/BusinessSection";
import { HowItWorks } from "./sections/HowItWorks";
import { AreasMap } from "./sections/AreasMap";
import { ReviewsWall } from "./sections/ReviewsWall";
import { Faq } from "./sections/Faq";
import { BookFlow } from "./sections/BookFlow";
import { faq, howItWorks, areasCopy } from "@/content/locksmith-sections";
import type { SideContent } from "@/content/types";

/**
 * The locksmith page. Every section has its own visual idea, but they all share the same type roles and tokens.
 * Pin ids for the scroll story: car, home, business, why (How it works), areas. The closing CTA is "final".
 */
export function LocksmithPage({ content }: { content: SideContent }) {
  const ed = content.editorial;
  const group = (id: string) => content.groups.find((g) => g.id === id)!;
  const pinIds = ["car", "home", "business", "why", "areas"];
  const names = [ed.sections.car.name, ed.sections.home.name, ed.sections.business.name, howItWorks.name, areasCopy.name];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SideHero content={content} />
      <StoryTracker ids={pinIds} finalId="final" />
      <div className="relative">
        <StoryRail names={names} finalLabel={ed.final.headline.replace(".", "")} />
        <CarSection group={group("car")} copy={ed.sections.car} />
        <HomeSection group={group("home")} copy={ed.sections.home} />
        <BusinessSection group={group("business")} copy={ed.sections.business} />
        <HowItWorks />
        <AreasMap />
        <ReviewsWall />
        <Faq />
        <BookFlow groups={content.groups} />
        <FinalCta final={ed.final} callLabel={ed.callLabel} bookLabel={ed.bookLabel} />
      </div>
    </>
  );
}
