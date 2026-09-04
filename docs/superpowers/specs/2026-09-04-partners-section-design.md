# Partners Section — Design

## Purpose

Add a "Partners" section to the site so Law x Tech can announce and showcase
partnerships (e.g. Harib Tech Law Academy / LFDT Cohort II). Each partner has
a logo, a short write-up, and its own slug page. First entry: Harib Tech Law
Academy.

## Data model

New static data file: `lib/data/partners.ts`.

```ts
export interface Partner {
  slug: string;
  name: string;
  logo: string;        // local path under /assets/partners
  websiteUrl: string;  // partner's external site
  tagline: string;     // short hook line shown on cards + detail header
  body: string[];      // write-up paragraphs, plain text
  ctaLabel?: string;
  ctaUrl?: string;
  startDate?: string;
  format?: string;
  tags?: string[];
}

export const partners: Partner[] = [ /* ... */ ];
```

Rationale: mirrors the existing `series` pattern (a typed static array, no DB)
per user preference — partners are added by editing this one file and
committing, no admin UI needed for now.

## Assets

Partner logos are downloaded and stored locally under
`public/assets/partners/<slug>.png` rather than hotlinked from the partner's
site. This avoids depending on the partner's site staying up, avoids needing
new `next.config.ts` `images.remotePatterns` entries per partner, and matches
how other image assets (series, speakers, team) are handled in this repo.

Harib Tech Law Academy's logo has already been fetched and verified
(transparent PNG, `Harib` wordmark + gear/hand icon in navy).

## Routes

- `app/(public)/partners/page.tsx` — index page. Grid of partner cards
  (logo, name, tagline), each linking to its detail page. Styled consistently
  with `app/(public)/series/page.tsx` (motion/stagger animations from
  `lib/animations.ts`, navy/teal palette, `max-w-7xl` container).
- `app/(public)/partners/[slug]/page.tsx` — detail page. Renders logo,
  tagline as a headline, `body` paragraphs, an optional highlighted CTA
  button (`ctaLabel`/`ctaUrl`), a small info row for `startDate`/`format`
  (calendar/monitor icons), and `tags` as chips. `notFound()` if the slug
  isn't in `partners`. Styled consistently with
  `app/(public)/blogs/[slug]/page.tsx` (same typography scale, `prose`-like
  spacing, "Back to partners" link).

No dynamic data fetching — both pages are static/server components reading
directly from `lib/data/partners.ts`.

## Homepage

New `components/home/PartnersPreviewSection.tsx`, modeled on
`components/home/SeriesPreviewSection.tsx`: section heading + "View All
Partners" link to `/partners`, plus a card (or small row of cards) for
featured partners. Inserted into `app/(public)/page.tsx` after
`SeriesPreviewSection`.

No header/nav link is added (per user decision) — the section is discoverable
via the homepage and the `/partners` index page.

## SEO

Add `/partners` and one entry per partner (`/partners/<slug>`) to
`app/sitemap.ts`, following the existing pattern used for `blogs`.

## Out of scope

- Admin CMS / DB-backed partner management (explicitly declined by user;
  static file is sufficient for current scale).
- Header navigation entry.
- Partner logo remote-hotlinking / `next.config.ts` changes (logos are
  downloaded and stored locally instead).

## First content entry

Harib Tech Law Academy (`slug: harib-tech-law-academy`), announcing the
partnership for Cohort II of The Legal Foundations of Digital Technology
(LFDT), with the write-up and Google Form CTA link supplied by the user, and
classes starting 5 September 2026 (Live Virtual Sessions).
