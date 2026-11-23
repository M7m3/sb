import { Reveal } from "@/components/Reveal";
import { KeyCut } from "@/components/brand/KeyCut";
import type { Editorial } from "@/content/types";

// PLACEHOLDER: replace with real, permission-approved customer reviews. Do not invent any.
export function ReviewsSection({ reviews }: { reviews: Editorial["reviews"] }) {
  return (
    <section id="reviews" className="sec-ink scroll-mt-20 py-20 lg:py-28">
      <div className="story-container">
        <Reveal>
          <p className="t-label text-accent-light">Reviews</p>
          <h2 className="t-display-m mt-4">{reviews.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["review-a", "review-b", "review-c"].map((k, i) => (
            <Reveal key={k} delay={i * 0.06} className="h-full">
              <figure className="flex h-full flex-col border border-dashed border-accent/30 p-6">
                <div className="flex items-center justify-between">
                  <KeyCut name={k} size={80} className="text-accent" />
                  <span className="t-label text-muted">Placeholder</span>
                </div>
                <blockquote className="t-lead mt-6 flex-1 text-ink/90">{reviews.placeholderText}</blockquote>
                <figcaption className="t-small mt-6 text-muted">{reviews.placeholderName}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
