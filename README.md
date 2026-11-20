<<<<<<< HEAD
# Zaiqa-E-Mehfil — Next.js Website

Pakistani, Afghan & Indo-Chinese restaurant website for **Zaiqa-E-Mehfil** (156 Greenford Road, Sudbury Hill, Harrow HA1 3QS), converted from static HTML to **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion (`LazyMotion`)**, and **Lenis** smooth scrolling.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Architecture

- **Routes (`src/app/`)**:
  - `/` — Home (Hero, animated proof bar, dish marquee, signature dishes across 3 cuisines, charcoal grill, mojitos, 20 Google reviews, parallax catering banner, live opening hours & Find Us)
  - `/menu` — Full 119-dish menu across 17 categories with sticky animated category rail & instant search
  - `/about` — Story, sticky Urdu/English crest card, values, cuisine trio, and reviews
  - `/contact` — Live opening hours, Find Us, and Table Booking / Catering enquiry form (FormSubmit AJAX + GTM conversion tracking)
  - `/privacy` — Privacy & cookies notice
  - `/thank-you` — Post-submission confirmation (`noindex`)
  - Legacy `.html` routes (`/menu.html`, `/about.html`, `/contact.html`, `/privacy.html`, `/thank-you.html`, `/index.html`) permanently redirect (`308`) to clean Next.js routes.
- **Data (`src/data/`)**: `site.ts` and `menu.ts` (all 119 dishes typed).
- **Fonts**: Self-hosted `Cormorant Garamond` and `Plus Jakarta Sans` via `next/font/local` (zero external font requests).
- **Backup**: Original static HTML files are preserved in `_legacy-html/`.
=======
# zaiqaemehfil
>>>>>>> 8e8fce7da9d2681f896a079029c293ac204d07d6
