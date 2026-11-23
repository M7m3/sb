import { SectionPin } from "./SectionPin";

type Props = { n: string; name: string; title: string; line?: string; tone: "dark" | "light" };

/** "01 / CAR" label with a tiny rising pin, a giant title and one line of copy. */
export function SectionHead({ n, name, title, line, tone }: Props) {
  const light = tone === "light";
  return (
    <header>
      <p className={`t-label flex items-center gap-3 ${light ? "text-accent-on-light" : "text-accent-light"}`}>
        <SectionPin className="lg:hidden" />
        <span>
          {n} / {name}
        </span>
      </p>
      <h2 className="t-display-l mt-4">{title}</h2>
      {line && <p className={`t-lead mt-5 max-w-xl ${light ? "text-light-muted" : "text-ink/80"}`}>{line}</p>}
    </header>
  );
}
