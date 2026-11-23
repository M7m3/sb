# SB website (demo)

Next.js (App Router) + Tailwind + Framer Motion + Prisma/PostgreSQL.
Two sides under one brand: `/` is Locksmith, `/automotive` is Automotive. The navbar toggle switches between them with a circular reveal transition.

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:3000. On a phone on the same WiFi, open `http://<your-PC-IP>:3000` (run `ipconfig` to find the IP). You may need to allow Node through Windows Firewall.

## Where to change things

| What | File |
| --- | --- |
| Phone, email, address, hours, areas | `src/content/site.ts` |
| Locksmith text, services, nav links | `src/content/locksmith.ts` |
| Phone, hours, 24/7 flag | `src/content/business.ts` |
| Automotive text, services, brands | `src/content/automotive.ts` |
| Colours and side themes | `src/app/globals.css` (`[data-side="..."]` blocks) |
| Toggle and switch animation | `src/components/SideToggle.tsx`, `TransitionOverlay.tsx`, `SideProvider.tsx` |

Anything marked `PLACEHOLDER` in a comment needs the client to confirm it (phone, hours, claims such as 24/7 or licensing, reviews).

Photos: the car section photo and hero assets live in `public/hero-assets/` (WebP only). Replace those files to change them.

Logo: `src/components/brand/Logo.tsx` (inline themed SVG, colours from CSS variables). Fixed images for previews are in `public/brand/` (`logo-gold.webp`, `logo-blue.webp`). All raster images must be WebP: `node scripts/convert-images.mjs` converts any PNG or JPEG found in `public/`.

## Database (PostgreSQL)

The booking form saves to PostgreSQL through a server action (`src/app/actions.ts`). Without a database the site still works and the form shows "Demo mode, booking not saved".

1. Install PostgreSQL and make sure it is running.
2. Copy `.env.example` to `.env` and put your real password in `DATABASE_URL`:
   `postgresql://postgres:YOUR_PASSWORD@localhost:5432/sb_website`
3. Create the table (this also creates the `sb_website` database if it does not exist):
   ```powershell
   npx prisma migrate deploy
   ```
   If the database does not exist yet, use `npx prisma migrate dev` instead.
4. Restart `npm run dev`. View saved bookings with `npx prisma studio`.

Schema: `prisma/schema.prisma` (`Booking` model).
