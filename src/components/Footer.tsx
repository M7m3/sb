import { Logo } from "./brand/Logo";
import { SideLink } from "./SideLink";
import { KeyCut } from "./brand/KeyCut";
import { sideContent } from "@/content";
import { site, type Side } from "@/content/site";
import { business } from "@/content/business";
import { hoursSummary } from "@/lib/businessStatus";

// Social links are placeholders. Replace "#" with the client's real profiles.
const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
];

const sides: { side: Side; title: string }[] = [
  { side: "locksmith", title: "Locksmith" },
  { side: "automotive", title: "Automotive" },
];

export function Footer() {
  const hours = hoursSummary();
  return (
    <footer className="border-t border-accent/20 bg-scrim pt-16 pb-[calc(128px+env(safe-area-inset-bottom))] md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="h-auto w-36" />
          <p className="t-small mt-4 max-w-xs text-muted">{site.tagline}</p>
          <ul className="mt-5 flex gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="t-label text-ink/80 underline-offset-4 transition-colors hover:text-accent-light hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {sides.map(({ side, title }) => (
          <div key={side}>
            <h3 className="t-label text-accent-light">{title}</h3>
            <KeyCut name={`footer-${side}`} size={72} className="mt-3 text-accent/70" />
            <ul className="t-small mt-4 space-y-2.5 text-muted">
              {sideContent[side].groups.map((g) => (
                <li key={g.id}>
                  <SideLink to={side} hash={`#${g.id}`} className="transition-colors hover:text-ink">
                    {g.title}
                  </SideLink>
                </li>
              ))}
              <li>
                <SideLink to={side} hash="#book" className="transition-colors hover:text-ink">
                  Book {title}
                </SideLink>
              </li>
            </ul>
          </div>
        ))}

        <div>
          <h3 className="t-label text-accent-light">Contact</h3>
          <KeyCut name="footer-contact" size={72} className="mt-3 text-accent/70" />
          <ul className="t-small mt-4 space-y-2.5 text-muted">
            <li>
              <a href={business.phoneHref} className="text-ink hover:text-accent-light">
                {business.phone}
              </a>
            </li>
            <li>{site.email}</li>
            <li>{site.address}</li>
            <li className="pt-2">
              {hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.time}
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-accent/15 t-micro px-5 pt-6 text-muted sm:px-6">
        © 2026 SB. All rights reserved. Contact details and hours shown are placeholders.
      </div>
    </footer>
  );
}
