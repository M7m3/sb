import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import type { SideContent } from "@/content/types";

export function BookSection({ content }: { content: SideContent }) {
  const ed = content.editorial;
  const presets: Record<string, string> = {};
  for (const g of content.groups) for (const s of g.items) presets[s.slug] = s.title;

  return (
    <section id="book" className="sec-light scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <p className="t-label text-accent-on-light">Book</p>
          <h2 className="t-display-m mt-4">{ed.book.title}</h2>
          <p className="t-lead mt-4 max-w-xl text-light-muted">{ed.book.line}</p>
        </Reveal>
        <Reveal delay={0.06} className="mt-12 max-w-3xl">
          <BookingForm side={content.side} serviceOptions={content.booking.serviceOptions} presets={presets} variant="editorial" />
        </Reveal>
      </div>
    </section>
  );
}
