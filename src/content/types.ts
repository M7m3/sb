import type { Side } from "./site";

export type Service = { title: string; description: string; slug: string };
export type ServiceGroup = { id: string; title: string; blurb: string; items: Service[] };

export type SectionCopy = { n: string; name: string; title: string; line: string };

/** All the editorial copy for a side's page. Group ids (for example car, diagnose) key `sections`. */
export type Editorial = {
  heroLabel: string;
  heroLine: string;
  heroPrompt: string;
  words: { id: string; label: string; blurb: string }[];
  callLabel: string;
  bookLabel: string;
  sections: Record<string, SectionCopy>;
  why: { n: string; name: string; title: string; items: { title: string; text: string; slug: string }[] };
  areas: { n: string; name: string; title: string; note: string; brands?: { title: string; list: string[] } };
  reviews: { title: string; placeholderText: string; placeholderName: string };
  book: { title: string; line: string };
  /** Final headline. `prefix` (for example "Un") animates in when the story completes. */
  final: { headline: string; prefix?: string; line: string };
  /** Links in the mobile menu sheet. */
  menuLinks: { label: string; href: string }[];
};

export type SideContent = {
  side: Side;
  navLinks: { label: string; href: string }[];
  groups: ServiceGroup[];
  booking: { serviceOptions: string[] };
  editorial: Editorial;
};
