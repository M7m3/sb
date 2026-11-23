import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import type { Editorial } from "@/content/types";

export function AreasSection({ areas }: { areas: Editorial["areas"] }) {
  return (
    <section id="areas" className="sec-light scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <SectionHead n={areas.n} name={areas.name} title={areas.title} tone="light" />
        </Reveal>
        {areas.brands && (
          <div id="brands" className="mt-12 scroll-mt-24">
            <p className="t-label text-accent-on-light">{areas.brands.title}</p>
            <ul className="mt-4 columns-2 gap-8 lg:columns-3">
              {areas.brands.list.map((b) => (
                <li key={b} className="break-inside-avoid border-b border-light-ink/15">
                  <span className="t-row-title block cursor-default py-3 transition-[color,transform] duration-300 hover:translate-x-2 hover:text-accent-on-light">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className={`t-label text-accent-on-light ${areas.brands ? "mt-14" : "mt-12"}`}>Areas we serve</p>
        <ul className="mt-4 columns-1 gap-10 sm:columns-2 xl:columns-3">
          {site.areas.map((a) => (
            <li key={a} className="break-inside-avoid border-b border-light-ink/15">
              <span className="t-heading block cursor-default py-3 transition-[color,transform] duration-300 hover:translate-x-2 hover:text-accent-on-light">
                {a}
              </span>
            </li>
          ))}
        </ul>
        <p className="t-lead mt-8 text-light-muted">{areas.note}</p>
      </div>
    </section>
  );
}
