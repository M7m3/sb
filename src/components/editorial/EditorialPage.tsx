import { SideHero } from "./SideHero";
import { StoryTracker } from "./StoryTracker";
import { StoryRail } from "./StoryRail";
import { ServiceSection } from "./ServiceSection";
import { WhySection } from "./WhySection";
import { AreasSection } from "./AreasSection";
import { ReviewsSection } from "./ReviewsSection";
import { BookSection } from "./BookSection";
import { FinalCta } from "./FinalCta";
import type { SideContent } from "@/content/types";

/**
 * One page structure for both sides: hero, three service sections, why, areas, reviews, book, final.
 * Sections alternate dark and light. The scroll story (pins or warning lights) runs through it.
 */
export function EditorialPage({ content }: { content: SideContent }) {
  const ed = content.editorial;
  const tones = ["light", "dark", "light"] as const;
  const pinIds = [...content.groups.map((g) => g.id), "why", "areas"];
  const names = [...content.groups.map((g) => ed.sections[g.id].name), ed.why.name, ed.areas.name];

  return (
    <>
      <SideHero content={content} />
      <StoryTracker ids={pinIds} finalId="final" />
      <div className="relative">
        <StoryRail names={names} finalLabel={ed.final.headline.replace(".", "")} />
        {content.groups.map((g, i) => (
          <ServiceSection
            key={g.id}
            group={g}
            copy={ed.sections[g.id]}
            tone={tones[i % 3]}
            photo={content.side === "locksmith" && i === 0}
          />
        ))}
        <WhySection why={ed.why} />
        <AreasSection areas={ed.areas} />
        <ReviewsSection reviews={ed.reviews} />
        <BookSection content={content} />
        <FinalCta final={ed.final} callLabel={ed.callLabel} bookLabel={ed.bookLabel} />
      </div>
    </>
  );
}
