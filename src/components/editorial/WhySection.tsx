import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/Reveal";
import { KeyCut } from "@/components/brand/KeyCut";
import type { Editorial } from "@/content/types";

/** Four short statements in big type. Claims are marked TODO in content/locksmith.ts. */
export function WhySection({ why }: { why: Editorial["why"] }) {
  return (
    <section id="why" className="sec-ink scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead n={why.n} name={why.name} title={why.title} tone="dark" />
        </Reveal>
        <ol className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {why.items.map((it, i) => (
            <Reveal key={it.slug} delay={i * 0.06}>
              <li className="border-t border-accent/25 pt-6">
                <div className="flex items-center justify-between">
                  <span className="t-numeral text-transparent [-webkit-text-stroke:1.5px_var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <KeyCut name={it.slug} size={96} animate className="text-accent" />
                </div>
                <h3 className="t-heading mt-5">{it.title}</h3>
                <p className="t-body mt-3 max-w-sm text-ink/70">{it.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
