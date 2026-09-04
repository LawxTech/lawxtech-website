# Partners Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Partners section to the Law x Tech website — a static, typed data file of partners, an index grid page, per-partner slug detail pages, and a homepage preview section — seeded with the Harib Tech Law Academy partnership announcement.

**Architecture:** Content lives in a single static TypeScript data file (`lib/data/partners.ts`), read directly by two new server-rendered routes (`/partners` index, `/partners/[slug]` detail) and a new homepage section. A shared presentational `PartnerCard` component is reused by the index grid and the homepage preview so card markup isn't duplicated. Framer Motion entrance animations reuse the existing `lib/animations.ts` variants, matching the `series` and `blogs` pages' look and feel.

**Tech Stack:** Next.js App Router (server components + one `generateStaticParams`), TypeScript, Tailwind (existing `navy`/`teal`/`surface`/`muted-brand`/`border-brand` tokens from `app/globals.css`), Framer Motion, `lucide-react` icons, `next/image` for local assets.

**Spec:** `docs/superpowers/specs/2026-09-04-partners-section-design.md`

## Global Constraints

- Partner content is a static TS array in `lib/data/partners.ts` — no database, no admin UI (per spec's "Out of scope").
- Partner logos are downloaded and stored locally under `public/assets/partners/<slug>.png` — never hotlinked from the partner's own site, and no `next.config.ts` `images.remotePatterns` changes.
- No header/navigation link is added for Partners (per spec).
- This repo has no test runner configured (`package.json` has no test script, no jest/vitest/playwright config, no `*.test.*` files anywhere). Verification for every task is: `npm run lint`, `npm run build`, and a manual check against a running `npm run dev` server (curl or browser) — substitute this wherever the task template below says "run the tests."
- Match existing conventions exactly: `buildMetadata()` from `lib/metadata.ts` for page metadata, the `navy`/`teal`/`surface`/`muted-brand`/`border-brand` Tailwind color tokens, and the `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container pattern used on `series` and `blogs` pages.

---

## Task 1: Partner data file and Harib logo asset

**Files:**
- Create: `lib/data/partners.ts`
- Create: `public/assets/partners/harib-tech-law-academy.png`

**Interfaces:**
- Produces: `export interface Partner { slug: string; name: string; logo: string; websiteUrl: string; tagline: string; body: string[]; ctaLabel?: string; ctaUrl?: string; startDate?: string; format?: string; tags?: string[]; }` and `export const partners: Partner[]`, both exported from `lib/data/partners.ts`. All later tasks import from this file.

- [ ] **Step 1: Copy the already-downloaded Harib logo into the repo**

The logo was already fetched and verified (transparent PNG, navy "Harib" wordmark + gear/hand icon) at `/private/tmp/claude-501/-Users-toluwalope-Documents-GitHub-lawxtech-website/4dc592ac-35cb-4dda-836e-c9bfc16dc8ee/scratchpad/harib-logo-try1.png`. Copy it into the repo's public assets:

```bash
mkdir -p public/assets/partners
cp "/private/tmp/claude-501/-Users-toluwalope-Documents-GitHub-lawxtech-website/4dc592ac-35cb-4dda-836e-c9bfc16dc8ee/scratchpad/harib-logo-try1.png" public/assets/partners/harib-tech-law-academy.png
```

If that scratch file no longer exists (e.g. a different session/machine), re-fetch it instead:

```bash
mkdir -p public/assets/partners
curl -sL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
  "https://haribacademy.com/_next/static/media/harib-logo.2c5b37b4.png" \
  -o public/assets/partners/harib-tech-law-academy.png
```

- [ ] **Step 2: Verify the asset**

Run: `file public/assets/partners/harib-tech-law-academy.png`
Expected: `PNG image data` in the output (not an HTML error page).

- [ ] **Step 3: Write the data file**

```typescript
// lib/data/partners.ts
export interface Partner {
  slug: string;
  name: string;
  logo: string;
  websiteUrl: string;
  tagline: string;
  body: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  startDate?: string;
  format?: string;
  tags?: string[];
}

export const partners: Partner[] = [
  {
    slug: "harib-tech-law-academy",
    name: "Harib Tech Law Academy",
    logo: "/assets/partners/harib-tech-law-academy.png",
    websiteUrl: "https://haribacademy.com",
    tagline: "The future of law is digital. Are you ready for it?",
    body: [
      "We're excited to announce our partnership with Harib Tech Law Academy for Cohort II of The Legal Foundations of Digital Technology (LFDT).",
      "Through this partnership, members of the Law x Tech community can access a practical learning experience covering key areas including technology law, data protection, AI, intellectual property, fintech regulation, and digital law practice at a heavily discounted price.",
      "With dedicated Professional and Student Tracks, the programme is designed for both legal professionals and aspiring technology lawyers.",
      "If you've been looking to deepen your understanding of technology law, build practical skills, or explore a career at the intersection of law and technology, this is one to pay attention to.",
    ],
    ctaLabel: "Get Started",
    ctaUrl: "https://forms.gle/qruRvAWULx6rrAon6",
    startDate: "5 September 2026",
    format: "Live Virtual Sessions",
    tags: ["#LawxTech", "#TechnologyLaw", "#LegalTech", "#AIandLaw"],
  },
];
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `lib/data/partners.ts`.

- [ ] **Step 5: Commit**

```bash
git add lib/data/partners.ts public/assets/partners/harib-tech-law-academy.png
git commit -m "feat(partners): add partners data file with Harib Tech Law Academy entry"
```

---

## Task 2: Shared PartnerCard and PartnersGrid components

**Files:**
- Create: `components/partners/PartnerCard.tsx`
- Create: `components/partners/PartnersGrid.tsx`

**Interfaces:**
- Consumes: `Partner` type from `lib/data/partners.ts` (Task 1).
- Produces: `export default function PartnerCard({ partner }: { partner: Partner })` from `components/partners/PartnerCard.tsx` — a plain (non-"use client") presentational card linking to `/partners/${partner.slug}`. `export default function PartnersGrid({ partners }: { partners: Partner[] })` from `components/partners/PartnersGrid.tsx` — a `"use client"` component that animates a grid of `PartnerCard`s. Both are consumed by Tasks 3 and 5.

- [ ] **Step 1: Write PartnerCard**

```tsx
// components/partners/PartnerCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/lib/data/partners";

export default function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partners/${partner.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all duration-300 flex flex-col p-6"
    >
      <div className="relative h-16 w-full mb-6">
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          fill
          sizes="200px"
          className="object-contain object-left"
        />
      </div>
      <h2 className="font-bold text-navy text-lg leading-snug mb-2 group-hover:text-teal transition-colors">
        {partner.name}
      </h2>
      <p className="text-muted-brand text-sm leading-relaxed line-clamp-3 flex-1">
        {partner.tagline}
      </p>
      <div className="mt-4 pt-4 border-t border-border-brand">
        <span className="text-teal text-sm font-semibold">Learn more →</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write PartnersGrid**

```tsx
// components/partners/PartnersGrid.tsx
"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";
import PartnerCard from "@/components/partners/PartnerCard";
import type { Partner } from "@/lib/data/partners";

export default function PartnersGrid({ partners }: { partners: Partner[] }) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {partners.map((partner) => (
        <motion.div key={partner.slug} variants={scaleIn}>
          <PartnerCard partner={partner} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors in either new file.

- [ ] **Step 4: Commit**

```bash
git add components/partners/PartnerCard.tsx components/partners/PartnersGrid.tsx
git commit -m "feat(partners): add PartnerCard and PartnersGrid components"
```

---

## Task 3: Partners index page

**Files:**
- Create: `app/(public)/partners/page.tsx`

**Interfaces:**
- Consumes: `partners` array from `lib/data/partners.ts` (Task 1), `PartnersGrid` from `components/partners/PartnersGrid.tsx` (Task 2), `buildMetadata` from `lib/metadata.ts`.

- [ ] **Step 1: Write the index page**

```tsx
// app/(public)/partners/page.tsx
import { buildMetadata } from "@/lib/metadata";
import { partners } from "@/lib/data/partners";
import PartnersGrid from "@/components/partners/PartnersGrid";

export const metadata = buildMetadata({
  title: "Our Partners",
  description:
    "Meet the organisations partnering with Law x Tech to bring the legal tech community practical training, discounted programmes, and career opportunities.",
});

export default function PartnersPage() {
  return (
    <>
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Our Partners
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Building the Future, Together
          </h1>
          <p className="mt-5 text-muted-brand text-base leading-relaxed">
            We team up with organisations across the legal and technology
            worlds to bring the Law x Tech community practical training,
            discounted programmes, and career opportunities.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {partners.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🤝</p>
              <h3 className="text-xl font-bold text-navy">
                Partner announcements coming soon
              </h3>
              <p className="mt-2 text-muted-brand">
                Check back soon for new partnerships.
              </p>
            </div>
          ) : (
            <PartnersGrid partners={partners} />
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manually verify the page renders**

Run: `npm run dev` (in background), then in another shell:
`curl -s http://localhost:3000/partners | grep -o "Harib Tech Law Academy"`
Expected: `Harib Tech Law Academy` printed (confirms the page renders the card server-side). Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add "app/(public)/partners/page.tsx"
git commit -m "feat(partners): add partners index page"
```

---

## Task 4: Partner detail page

**Files:**
- Create: `app/(public)/partners/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Partner` type and `partners` array from `lib/data/partners.ts` (Task 1), `buildMetadata` from `lib/metadata.ts`.

- [ ] **Step 1: Write the detail page**

```tsx
// app/(public)/partners/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { partners } from "@/lib/data/partners";
import { buildMetadata } from "@/lib/metadata";
import { ArrowLeft, Calendar, Monitor, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return partners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = partners.find((p) => p.slug === slug);
  if (!partner) return {};
  return buildMetadata({
    title: partner.name,
    description: partner.tagline,
    openGraph: {
      type: "article",
      title: partner.name,
      description: partner.tagline,
      images: [{ url: partner.logo, alt: partner.name }],
    },
  });
}

export default async function PartnerDetailPage({ params }: Props) {
  const { slug } = await params;
  const partner = partners.find((p) => p.slug === slug);
  if (!partner) notFound();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-muted-brand hover:text-navy text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to partners
        </Link>

        <div className="relative h-14 w-40 mb-4">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="160px"
            className="object-contain object-left"
          />
        </div>

        <a
          href={partner.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-teal text-sm font-semibold hover:underline mb-6"
        >
          {partner.websiteUrl.replace(/^https?:\/\//, "")}
          <ExternalLink size={13} />
        </a>

        <h1 className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-6">
          {partner.tagline}
        </h1>

        {(partner.startDate || partner.format) && (
          <div className="flex flex-wrap items-center gap-4 text-muted-brand text-sm mb-8">
            {partner.startDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Classes begin {partner.startDate}
              </span>
            )}
            {partner.format && (
              <span className="flex items-center gap-1.5">
                <Monitor size={14} />
                {partner.format}
              </span>
            )}
          </div>
        )}

        <div className="space-y-5 text-[#374151] text-base leading-8">
          {partner.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {partner.ctaUrl && partner.ctaLabel && (
          <a
            href={partner.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-8 px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-sm"
          >
            {partner.ctaLabel}
          </a>
        )}

        {partner.tags && partner.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border-brand flex flex-wrap gap-2">
            {partner.tags.map((tag) => (
              <span
                key={tag}
                className="text-teal text-xs font-semibold bg-teal/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manually verify the page renders**

Run: `npm run dev` (in background), then:
`curl -s http://localhost:3000/partners/harib-tech-law-academy | grep -o "Get Started"`
Expected: `Get Started` printed. Also check a bad slug returns 404:
`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/partners/does-not-exist`
Expected: `404`. Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add "app/(public)/partners/[slug]/page.tsx"
git commit -m "feat(partners): add partner detail page"
```

---

## Task 5: Homepage preview section and sitemap

**Files:**
- Create: `components/home/PartnersPreviewSection.tsx`
- Modify: `app/(public)/page.tsx` (insert the new section after `SeriesPreviewSection`)
- Modify: `app/sitemap.ts` (add `/partners` and per-partner routes)

**Interfaces:**
- Consumes: `partners` array from `lib/data/partners.ts` (Task 1), `PartnerCard` from `components/partners/PartnerCard.tsx` (Task 2).

- [ ] **Step 1: Write the homepage preview section**

```tsx
// components/home/PartnersPreviewSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { partners } from "@/lib/data/partners";
import PartnerCard from "@/components/partners/PartnerCard";

export default function PartnersPreviewSection() {
  const featured = partners.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="bg-surface py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              Our Partners
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Building the Future, Together
            </h2>
          </div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Partners <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((partner) => (
            <motion.div key={partner.slug} variants={scaleIn}>
              <PartnerCard partner={partner} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into the homepage**

Modify `app/(public)/page.tsx`:

```diff
 import { buildMetadata } from "@/lib/metadata";
 import HeroSection from "@/components/home/HeroSection";
 import StatsStrip from "@/components/home/StatsStrip";
 import WhatWeDoSection from "@/components/home/WhatWeDoSection";
 import SeriesPreviewSection from "@/components/home/SeriesPreviewSection";
+import PartnersPreviewSection from "@/components/home/PartnersPreviewSection";
 import SummitBanner from "@/components/home/SummitBanner";
 import CommunityVoicesSection from "@/components/home/CommunityVoicesSection";
 import SpeakersWallSection from "@/components/home/SpeakersWallSection";
 import JoinMovementSection from "@/components/home/JoinMovementSection";
 import CommunityChannelsSection from "@/components/home/CommunityChannelsSection";

 export const metadata = buildMetadata({
   title: "Law x Tech — Africa's Home for Law & Technology",
 });

 export default function HomePage() {
   return (
     <>
       <HeroSection />
       <StatsStrip />
       <WhatWeDoSection />
       <SeriesPreviewSection />
+      <PartnersPreviewSection />
       <SummitBanner />
       <CommunityVoicesSection />
       <SpeakersWallSection />
       <JoinMovementSection />
       <CommunityChannelsSection />
     </>
   );
 }
```

- [ ] **Step 3: Add partners routes to the sitemap**

Modify `app/sitemap.ts`:

```diff
 import type { MetadataRoute } from "next";
 import { blogs } from "@/lib/data/blogs";
+import { partners } from "@/lib/data/partners";

 const baseUrl = "https://lawxtech.org";

 export default function sitemap(): MetadataRoute.Sitemap {
   const staticRoutes: MetadataRoute.Sitemap = [
     { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
     { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
     { url: `${baseUrl}/series`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
+    { url: `${baseUrl}/partners`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
     { url: `${baseUrl}/summit-awards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
     { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
     { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
   ];

   const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
     url: `${baseUrl}/blogs/${blog.id}`,
     lastModified: new Date(blog.date),
     changeFrequency: "monthly" as const,
     priority: 0.6,
   }));

-  return [...staticRoutes, ...blogRoutes];
+  const partnerRoutes: MetadataRoute.Sitemap = partners.map((partner) => ({
+    url: `${baseUrl}/partners/${partner.slug}`,
+    lastModified: new Date(),
+    changeFrequency: "monthly" as const,
+    priority: 0.6,
+  }));
+
+  return [...staticRoutes, ...blogRoutes, ...partnerRoutes];
 }
```

- [ ] **Step 4: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Full production build**

Run: `npm run build`
Expected: build succeeds, and the output route list includes `/partners` and `/partners/harib-tech-law-academy`.

- [ ] **Step 6: Manually verify the homepage section and sitemap**

Run: `npm run dev` (in background), then:
```bash
curl -s http://localhost:3000/ | grep -o "Building the Future, Together" | head -1
curl -s http://localhost:3000/sitemap.xml | grep -o "/partners/harib-tech-law-academy"
```
Expected: both commands print a match. Stop the dev server after checking.

- [ ] **Step 7: Commit**

```bash
git add components/home/PartnersPreviewSection.tsx "app/(public)/page.tsx" app/sitemap.ts
git commit -m "feat(partners): add homepage preview section and sitemap entries"
```

---

## Final check

- [ ] Visit `/partners`, `/partners/harib-tech-law-academy`, and `/` in a real browser (`npm run dev`) to confirm the logo displays correctly, the CTA button opens the Google Form in a new tab, and layout/animations match the `series` and `blogs` pages' look.
