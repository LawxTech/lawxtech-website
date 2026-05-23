# Summit & Awards Page — Design Spec

**Date:** 2026-05-23  
**Route:** `/summit-awards`

## Purpose

Spotlight the Law x Tech Summit — a flagship annual event where community leaders are recognised through awards. The page serves two audiences: people curious about past editions and people interested in the upcoming one.

## Layout (Option A — Upcoming-first)

### 1. Page Hero (white bg)
- Eyebrow: "Summit & Awards"
- H1: "The Law x Tech Summit"
- Description: "Our flagship annual event — bringing together legal tech leaders, celebrating excellence, and shaping the future of law and technology in Africa."
- Teal accent bar (matches other pages)

### 2. Upcoming Summit Section (surface bg)
- "Next Edition" eyebrow
- Featured card (navy bg) showing: edition name placeholder, "Coming Soon" badge, teaser description
- CTA: "Express Interest" → mailto:info@lawxtech.org

### 3. Past Editions Section (white bg)
- "Past Editions" heading
- One card per summit (2 cards), each showing:
  - Edition name + year (placeholder)
  - Theme (placeholder)
  - Awards sub-section listing award categories + winners (placeholder)
- Cards stacked vertically, full-width, for enough room to show awards detail

### 4. Bottom CTA (navy bg)
- "Want to sponsor, speak, or partner?"
- Contact: info@lawxtech.org

## Contact Info
All contact references use `info@lawxtech.org`.

## Data
Static placeholder arrays in `components/summit/` — easy to replace with real content.

## Files

| File | Action |
|------|--------|
| `app/summit-awards/page.tsx` | Create |
| `components/summit/UpcomingSummitSection.tsx` | Create |
| `components/summit/PastEditionsSection.tsx` | Create |
| `components/layout/Header.tsx` | Add "Summit & Awards" nav link |
| `app/sitemap.ts` | Add `/summit-awards` route |

## Design Tokens
Follows existing system: `navy`, `teal`, `surface`, `border-brand`, `muted-brand`, Montserrat, framer-motion animations.
