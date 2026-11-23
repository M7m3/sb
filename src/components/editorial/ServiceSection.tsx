import { SectionHead } from "./SectionHead";
import { ServiceRow } from "./ServiceRow";
import { ParallaxPhoto } from "./ParallaxPhoto";
import { Reveal } from "@/components/Reveal";
import type { ServiceGroup } from "@/content/types";

type Props = {
  group: ServiceGroup;
  copy: { n: string; name: string; title: string; line: string };
  tone: "dark" | "light";
  photo?: boolean;
};

/** Car, Home and Business sections: giant title, then editorial service rows. */
export function ServiceSection({ group, copy, tone, photo }: Props) {
  const light = tone === "light";
  return (
    <section id={group.id} className={`${light ? "sec-light" : "sec-ink"} scroll-mt-20 py-20 lg:py-28`}>
      <div className="story-container">
        <Reveal>
          <SectionHead {...copy} tone={tone} />
        </Reveal>
        <div className={`mt-10 grid gap-10 lg:mt-14 ${photo ? "lg:grid-cols-[1.25fr_0.75fr] lg:gap-12" : ""}`}>
          <ul className={`border-t ${light ? "border-light-ink/15" : "border-accent/20"}`}>
            {group.items.map((s) => (
              <ServiceRow key={s.slug} title={s.title} description={s.description} slug={s.slug} tone={tone} />
            ))}
          </ul>
          {photo && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ParallaxPhoto className="aspect-[4/5] w-full lg:aspect-[3/4]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
