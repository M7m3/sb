<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SB Website: Design System and Rules

Read this before changing any UI. These rules are the source of truth. Do not invent new fonts, colours, sizes or spacing. If something new is needed, add a token here first, then use it.

Where a value below says "verified", it was checked against the code and the real value is listed.

## Brand
- Client: SB, locksmith and automotive services in Scarborough and the GTA (Toronto, Canada).
- Two sides under one brand: Locksmith ("/", default, black and gold) and Automotive ("/automotive", night blue and lightning blue), switched with the navbar switch (desktop) or the bottom tabs (phones).
- Feel: premium editorial, bold, confident, clear for a stressed customer. Like a luxury watch or fashion site, never like a template trades site.
- Most visitors are on mobile. Design mobile first.
- Both sides share one design system: same fonts, type roles, spacing, shapes, motion and page structure. Only the tokens change.

## Where the system lives
- Tokens (CSS variables) and the Tailwind theme mapping: `src/app/globals.css` (`:root`, `[data-side="..."]`, `@theme inline`).
- Type roles: the `t-*` classes at the bottom of `src/app/globals.css`, defined with `@utility`.
- Page text: `src/content/locksmith.ts` and `src/content/automotive.ts` (same shape, type in `src/content/types.ts`). Business facts (phone, hours): `src/content/business.ts`.
- One page structure for both sides: `src/components/editorial/` (`EditorialPage`, hero, sections, story rail and bar). Side specific line art: `src/components/locksmith/art/` and `src/components/automotive/art/`.
- Navigation: `src/components/DesktopNav.tsx`, `MobileTopBar.tsx`, `TabBar.tsx`, `MenuSheet.tsx`, composed in `Navbar.tsx`.
- Brand pieces: `src/components/brand/` (`Logo`, `KeyCut`, `Icons`, `SideIcons`).
- Tailwind v4 gotchas: custom classes written in `@layer components` are silently dropped, so use `@utility`. Plain unlayered CSS beats Tailwind utilities, so do not put typography in unlayered classes. `text-base` is the font-size utility, so the colour for text on an accent fill is `text-on-accent`. A derived token such as `--line` must be declared on every `[data-side]` element, not only on `:root`, or it will not follow the side.

## Colour tokens (CSS variables) and the side mapping
Components use SIDE-NEUTRAL names. Never hardcode gold or blue in a component. Each side maps the names:

| Token | Locksmith (`:root`, `[data-side="locksmith"]`) | Automotive (`[data-side="automotive"]`) |
|---|---|---|
| --base (dark sections) | #0A0A0B ink black | #05080F deep night navy |
| --surface / --surface-2 | #141416 / #1C1C1F | #0B1220 / #111B2E |
| --accent (primary accent) | #D4AF37 gold | #00A3FF lightning blue |
| --accent-light (highlights, small accent text on dark) | #F2D37A | #7FD4FF |
| --accent-deep (gradient end, pressed) | #B8892A deep brass | #0057D9 |
| --accent-on-light (accent text and thin lines on light sections, passes contrast) | #8A6710 | #0057D9 |
| --light-bg (light sections) | #EFE8DA bone | #E8EEF5 frost |
| --light-ink (text on light sections) | #15130F | #0B1220 |
| --light-muted (secondary text on light) | #4A463E | #46536A |
| --light-faint (placeholders on light) | #8E8A82 | #7C8AA0 |
| --ink (text on dark) | #F5F5F5 | #F2F6FB |
| --muted (secondary text on dark) | #9A9A9F | #8D98AB |
| --glow-pct | 28% | 30% |

Derived tokens (declared for every side, so they follow the accent): --line (accent 18%), --glow (accent at --glow-pct), --glow-strong (accent 45%), --accent-gradient (135deg: --accent-light, --accent 70%, --accent-deep), --on-accent (= --base, text on accent fills), --scrim (#000, neutral overlays, always with an alpha).
Semantic: --status-open #34d399, --status-closed #f59e0b, --status-unknown #6b7280, --success #34d399, --success-on-light #047857, --danger #f87171, --danger-on-light #b91c1c.
Deprecated aliases (do not use in new code): --gold, --gold-light, --deep-brass.

Tailwind names: `bg-base`, `bg-surface`, `bg-surface2`, `text-ink`, `text-muted`, `text-accent`, `text-accent-light`, `text-accent-on-light`, `bg-light-bg`, `text-light-ink`, `text-light-muted`, `text-light-faint`, `text-on-accent`, `border-line`, `bg-scrim/60`, `stroke-accent`, `fill-accent-light/20`, `accent-bg` (gradient fill), `accent-metal` (shiny headline fill), `sec-ink` (dark section), `sec-light` (light section).

Rules:
- Sections alternate between dark (`sec-ink`) and light (`sec-light`) for rhythm.
- The accent is an accent. Never use it for long body text.
- Accent gradient: linear, --accent-light, --accent, --accent-deep.
- On light sections use --accent-on-light, not --accent, for text and thin lines.
- No new colours without adding them here. No hex or rgb literals in components. For a tinted alpha use `color-mix(in srgb, var(--accent) 40%, transparent)` or a Tailwind opacity such as `border-accent/30`.
- Exceptions that must be literals: `themeColor` in `layout.tsx` (keep equal to Locksmith --base), the side specific logo colours in `.logo-shell`, and the amber of the warning lights (--status-closed).
- The side is set by `data-side` on the shell (and on the transition overlay, so it shows the destination colours).

## Logo
- Use the `Logo` component (`src/components/brand/Logo.tsx`), an inline copy of `public/brand/logo-themed.svg`. Never use `<img>` for the live logo, because the CSS variables would not apply.
- Colours come from `--logo-1`, `--logo-2`, `--logo-3`. Locksmith: #F2D37A, #D4AF37, #B8892A. Automotive: #7FD4FF, #00A3FF, #0057D9. They are set by `data-logo` on the shell (`.logo-shell`), which follows the side that is being switched TO, and they are registered with `@property` (syntax `<color>`) so they animate over 600ms on the toggle. The overlay logo starts in the old colours and animates to the new ones.
- Fixed images (Open Graph, favicon, emails): `public/brand/logo-gold.webp`, `logo-blue.webp`, `logo-blue.svg`. The favicon stays gold (one brand icon).

## Typography
Fonts (next/font, Google):
- Display: Archivo, weight 900, width (font-stretch) 118%, UPPERCASE. Fallback: "Arial Black", system-ui.
- Body and UI: Inter, weights 400 / 500 / 600. Fallback: system-ui.
- Never use other fonts.

Type roles. Use these classes, do not hand-pick sizes:

| Class | Font | Size | Weight | Letter spacing | Line height | Case |
|---|---|---|---|---|---|---|
| `t-display-xl` (hero words, "UNLOCKED.", "SORTED.") | Archivo | Mobile: clamp(2.6rem, 15vw, 4.6rem) at 100% width. 1024px+: clamp(3.4rem, min(8.6vw, 17vh), 10.5rem) at 118%. 1280px+: clamp(3.4rem, min(10.2vw, 17vh), 11.5rem). About 147px at 1440x900, 184px at 1920x1080 | 900 | -0.02em | 0.9 | Upper |
| `t-display-l` (section titles) | Archivo 118% | clamp(3.4rem, 14vw, 9rem) (verified) | 900 | -0.02em | 0.9 | Upper |
| `t-display-m` (BOOK, WHAT CUSTOMERS SAY) | Archivo 118% | clamp(2.6rem, 9.5vw, 6.5rem) (verified) | 900 | -0.02em | 0.9 | Upper |
| `t-heading` (area names, WHY SB statements, menu sheet links) | Archivo 118% | clamp(1.75rem, 3vw, 2.6rem) | 900 | -0.02em | 0.9 | Upper |
| `t-prompt` ("WHAT'S LOCKED?", with `text-accent`) | Archivo 118% | clamp(1.25rem, 2.2vw, 1.875rem) | 900 | -0.02em | 0.9 | Upper |
| `t-row-title` (service names, brand names) | Archivo 118% | mobile 17px, 640px+ 24px | 900 | -0.02em | mobile 1.05, 640px+ 0.95 | Upper |
| `t-numeral` (large outlined numbers) | Archivo 118% | 48px | 900 | -0.02em | 0.9 | Upper |
| `t-lead` (section intro lines) | Inter | mobile 18px, 640px+ 20px | 400 | normal | 1.4 | Sentence |
| `t-body` | Inter | 16px | 400 | normal | 1.5 | Sentence |
| `t-small` (row descriptions, help text) | Inter | 14px | 400 | normal | 1.4 | Sentence |
| `t-ui` (buttons, side switch) | Inter | 15px | 600 | normal | 1.3 | Sentence |
| `t-ui-nav` (nav links) | Inter | 14px | 500 | normal | 1.3 | Sentence |
| `t-tab` (bottom tab bar labels) | Inter | 11px | 600 | normal | 1.2 | Sentence |
| `t-micro` (status chip, footer small print) | Inter | 13px | 400 (500 allowed with `font-medium`) | normal | 1.5 | Sentence |
| `t-label` (eyebrows like "LOCKSMITH · SCARBOROUGH & GTA", "01 / CAR", footer headings) | Inter | 12px | 600 | 0.18em | 1.5 | Upper, usually `text-accent-light` (`text-accent-on-light` on light sections) |

Typography rules:
- Display text is always Archivo 900, 118% width, uppercase, -0.02em, line height 0.9. The one exception is `t-display-xl` below 1024px, which uses 100% width because BUSINESS does not fit a 390px screen at 118%.
- Outlined display text (hero words) is `hero-word`: 1.5px accent stroke, transparent fill, fills solid accent left to right on hover and focus.
- Display roles use `text-wrap: balance`.
- Mobile: a service row title must never wrap to more than 2 lines (checked at 360px). On mobile the key cut and arrow sit on the first line of the row and the title uses the full width below it.
- Never put display text in sentence case, and never put body copy in uppercase.

## Spacing and layout
- Spacing scale (Tailwind 4px base): use 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. No odd values.
- Section padding: 80px mobile (`py-20`), 112px desktop (`lg:py-28`).
- Page side gutter (verified): 20px mobile, 24px from 640px, max content width 1280px (`story-container`). From 1024px the story container reserves 256px on the right for the sticky story rail. The hero is wider: 20px mobile, 32px from 640px, max 1600px.
- Hero is `min-h-[100svh]` with NO extra top margin: it only clears the header (desktop 64px, phones 60px) and, on phones, the tab bar (128px bottom padding). Do not add spacers for the header.
- Call Now and Book must be fully visible without scrolling, and not covered by the tab bar, at 1280x720, 1366x768, 1440x900, 1920x1080, 390x844 and 360x740, on both sides. On phones under 760px tall the word descriptions are hidden and the secondary button becomes a text link to make room.
- Tap targets are at least 44x44px; hero word rows at least 72px tall on mobile.
- Scroll offset for anchors: `scroll-mt-20` (80px).

## Navigation
Desktop and tablet (768px and up): floating islands, no full width bar, no separate status strip.
- Three glass islands 12px from the top. Total header height including the offset is 60px (maximum 64px). Island height 48px.
  1. Left: the logo only (36px tall).
  2. Centre: one capsule with the side switch (Locksmith / Automotive, with the side icons), then (from 1024px) a thin divider and the current side's anchor links with the sliding accent underline that tracks the active section (3 links at 1024px, all 5 from 1280px).
  3. Right: status chip (from 1024px, dot plus "Available now" or "Opens 8:00 AM ...", from `business.ts`) and the Call button (accent pill, phone number from 1024px).
- Island style: --base at 55% with `backdrop-blur(16px)`, 1px --line border, pill radius.
- On scroll past 80px the islands shrink (scale 0.88 to 0.92) and the centre capsule gets a stronger glass background. They stay visible on scroll up. Transform and opacity only.

Phones (below 768px): see the tab bar.

## Mobile tab bar (phones, below 768px)
- Top: a minimal transparent bar, 52px: logo left, status chip right. It hides when scrolling down and returns on scroll up. The story progress bar (28px, under the top bar) stays at the top.
- Bottom: a floating glass bar, 16px from the left, right and bottom edges plus `env(safe-area-inset-bottom)`, 64px tall, pill radius, `backdrop-blur(16px)`.
- 5 items, left to right: Locksmith, Automotive, CALL, Book, Menu. Icons 22px, labels `t-tab`, tap targets at least 44px.
  - Locksmith and Automotive ARE the side switch. The active tab has an accent pill that slides between them (`layoutId="tab-pill"`). Tapping runs the same transition and routing as the desktop switch.
  - CALL (centre): 56px circle, accent gradient, thin custom phone stroke, breathing glow, raised so it overlaps the top edge of the bar.
  - Book: scrolls to `#book`. Menu: opens the bottom sheet.
- Menu sheet: drag handle (drag down to close), tap outside to close, Escape closes, focus is trapped while open and returned to the Menu tab on close. Contents: the current side's section links (`editorial.menuLinks`), areas, hours, phone, and a button to switch to the other side.
- First visit only: a small pulsing dot on the Automotive tab (sessionStorage, wrapped in try/catch).
- Page bottom padding: the footer has 128px plus the safe area on phones so the bar never covers content.
- No hamburger, no floating call button, no tooltip on phones.

## Shapes, borders, effects
- Buttons, switch, tabs, islands: fully rounded pills (radius 9999px).
- Service rows, sections, dividers: square (radius 0) with 1px hairlines (`border-accent/20` on dark, `border-light-ink/15` on light). Editorial rows, not cards.
- Inputs: bottom border only, no boxes.
- Grain: static SVG noise, 4% opacity on dark, 7% multiply on light (`sec-ink`, `sec-light`).
- Glows are soft and subtle (--glow, --glow-strong). No neon, no heavy drop shadows.

## Brand elements
- KeyCut glyphs (`src/components/brand/KeyCut.tsx`) replace icons everywhere (service rows, dropdown, dividers, 404, loader). Each service slug gets a deterministic, unique key cut, on both sides, so slugs must be unique across the site. Never use stock icon sets (lucide, heroicons, etc.).
- Functional UI icons (menu, close, phone, arrow, book) are thin custom strokes in `Icons.tsx`: 1.5px, rounded caps and joins, currentColor.
- Side icons: `public/brand/icon-locksmith.svg` and `icon-automotive.svg`, inlined as `LocksmithIcon` and `AutomotiveIcon` (`SideIcons.tsx`) so they use currentColor (accent when active, muted when inactive). Used in the desktop switch, the tab bar and anywhere a side is named. Wrap them in an element with the `group` class: the key does a quarter turn and the car a small forward nudge on hover or press (not with reduced motion).
- Signature scroll stories, one per side, ending in a headline:
  - Locksmith: pin tumbler. As each of 5 sections enters, one pin lifts to the shear line. At the final CTA the cylinder turns and the headline reads "UNLOCKED."
  - Automotive: dashboard warning lights. As each of 5 sections enters, one warning light (check engine, battery, immobilizer key, brake, oil) switches off from glowing amber to a calm outline. At the final CTA the rev counter needle sweeps up and settles and the headline reads "SORTED."
  - Desktop: sticky card on the right (`StoryRail`). Phones: slim bar under the top bar (`StoryBar`) plus a tiny marker next to each section label. Sections are labelled "01 / NAME" to "05 / NAME".
- The key and keyhole intro plays once per session, on the Locksmith side only.

## Buttons
- Primary: accent gradient fill, `text-on-accent`, pill, `t-ui`, running accent border light (Call Now in heroes and final CTAs), soft breathing glow.
- Secondary: transparent, 1px accent border, --ink text (or --light-ink on light sections), pill, `t-ui`.
- Text link: accent-light with an underline that draws in on hover.

## Motion
- Library: Framer Motion and CSS only. No GSAP, no Lottie, no canvas, no WebGL, no video backgrounds.
- Animate only transform, opacity, clip-path, mask and background-position (plus the registered logo colour variables).
- Standard timings: micro 150 to 200ms, UI 300 to 400ms, reveals 500 to 700ms, stagger 60 to 80ms. Springs for the switch, tab pill and pins.
- Every loop pauses off screen and when the tab is hidden.
- Respect prefers-reduced-motion: replace motion with simple fades, show end states (pins lifted, lights off, words filled on focus).
- The side switch transition (circular reveal from the tapped control, destination colours, logo colour animating from the old side to the new one) must stay about 0.9 to 1.2 seconds.

## Images
- All raster images are WebP. No JPEG or PNG anywhere in `/public`. SVGs and the favicon (.ico) are fine.
- Photos quality 80, logos quality 90, keep transparency. `node scripts/convert-images.mjs` converts any PNG or JPEG found in `/public`; update references and delete the originals afterwards.
- Use SVG for line art and icons.

## Copy rules
- Friendly, confident, plain English. Professional, never stiff. Short sentences.
- Never use em dashes or en dashes in visible copy.
- Canadian context: use "Scarborough & GTA", Canadian phone format.
- No fake reviews, fake stats or fake claims. Anything the client must confirm (phone, hours, 24/7, response times) lives in `src/content/business.ts` and is marked TODO. Claims in the content files that the client must confirm are marked TODO too.
- All page text lives in `src/content/*.ts`, never hardcoded in components.

## Do and don't
- Do reuse existing components, `t-*` roles and side-neutral tokens.
- Do test both sides at 360, 390, 430, 768, 1024, 1440 widths before finishing.
- Don't add new fonts, colours, icon libraries or animation libraries.
- Don't hardcode gold, blue, hex colours or pixel font sizes in components.
- Don't break the switch (desktop and tabs), the intro, the booking form or the ?service= prefill.
- When adding a role or token, add it to `globals.css` and to this file in the same change.
