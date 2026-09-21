export interface BenefitGroup {
  label: "Pre-Summit" | "Summit Day" | "Post-Summit";
  items: string[];
}

export interface SponsorTier {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  featured?: boolean;
  groups: BenefitGroup[];
}

/**
 * TODO (before publishing): confirm every figure below with the partnerships
 * lead. `communityMembers` and `seriesEditions` are carried over from the
 * homepage StatsStrip and are safe. `expectedAttendance` and `speakers` are
 * placeholders — do not ship them unverified.
 */
export interface SponsorStat {
  value: number;
  suffix: string;
  label: string;
}

export const sponsorStats: SponsorStat[] = [
  { value: 2000, suffix: "+", label: "Community Members" },
  { value: 13, suffix: "", label: "Series Editions" },
  // TODO: confirm expected physical attendance for the 2026 summit
  { value: 500, suffix: "+", label: "Expected Attendance" },
  // TODO: confirm confirmed speaker count for the 2026 summit
  { value: 20, suffix: "+", label: "Speakers & Panellists" },
];

export const sponsorReasons: string[] = [
  "Align your brand with Africa's leading platform at the intersection of law and technology.",
  "Reach an engaged audience of lawyers, founders, regulators and technologists in one room.",
  "Put your product in front of the people who decide what legal tools their firms adopt.",
  "Stay visible year-round through our series, community channels and post-event content.",
  "Shape the conversation with a keynote, a panel seat or a sponsored session on stage.",
  "Back the awards that set the benchmark for legal tech excellence on the continent.",
];

export const sponsorTiers: SponsorTier[] = [
  {
    slug: "headline-partner",
    name: "Headline Partner",
    tagline: "Lead the platform. Own the conversation.",
    price: "On request",
    featured: true,
    groups: [
      {
        label: "Pre-Summit",
        items: [
          "Lead partner logo across all summit materials — website, social, email and press",
          "Named as Headline Partner in every announcement and media release",
          "Dedicated brand feature across the Law x Tech community channels",
          "Founder or executive interview published ahead of the summit",
          "Cross-promotion across the Law x Tech Series in the run-up to the event",
        ],
      },
      {
        label: "Summit Day",
        items: [
          "Headline branding on stage, signage, and the livestream overlay",
          "Executive keynote or fireside slot on the main stage",
          "Two-minute brand film during the plenary session",
          "Award presentation opportunity during the ceremony",
          "Reserved premium seating for your team and guests",
          "Exhibition space in the main networking area",
          "Full-page feature in the summit programme",
        ],
      },
      {
        label: "Post-Summit",
        items: [
          "Year-round logo placement on the Law x Tech website",
          "Named in the post-summit report and highlight reel",
          "Dedicated follow-up feature to the Law x Tech community",
        ],
      },
    ],
  },
  {
    slug: "gold-partner",
    name: "Gold Partner",
    tagline: "Premium positioning with year-round visibility.",
    price: "On request",
    groups: [
      {
        label: "Pre-Summit",
        items: [
          "Logo on the summit website with a link to your sponsor profile",
          "Brand posts and video content across Law x Tech social channels",
          "Use of the “Official Gold Partner” mark in your own campaigns",
          "Inclusion in pre-summit email campaigns to the community",
        ],
      },
      {
        label: "Summit Day",
        items: [
          "Logo on stage signage, event screens and printed materials",
          "One-minute brand film during the programme",
          "Panel seat or sponsored session slot",
          "Award category presentation on stage",
          "Reserved seating for your team and guests",
          "Corporate profile in the summit programme",
        ],
      },
      {
        label: "Post-Summit",
        items: [
          "Year-round logo placement on the Law x Tech website",
          "Named in the post-summit report and social coverage",
        ],
      },
    ],
  },
  {
    slug: "silver-partner",
    name: "Silver Partner",
    tagline: "Strong stage and digital presence.",
    price: "On request",
    groups: [
      {
        label: "Pre-Summit",
        items: [
          "Logo on the summit website with a link to your sponsor profile",
          "Social media campaign support ahead of the event",
          "Mention in pre-summit email campaigns to the community",
        ],
      },
      {
        label: "Summit Day",
        items: [
          "Logo on event signage and screens",
          "Thirty-second brand film during the programme",
          "Award category presentation on stage",
          "Reserved seating for your team",
          "Corporate listing in the summit programme",
        ],
      },
      {
        label: "Post-Summit",
        items: [
          "Logo placement on the Law x Tech website",
          "Named in the post-summit social coverage",
        ],
      },
    ],
  },
  {
    slug: "award-category-partner",
    name: "Award Category Partner",
    tagline: "Own a category. Be named with every reference.",
    price: "On request",
    groups: [
      {
        label: "Pre-Summit",
        items: [
          "Brand tied exclusively to a selected award category",
          "Named in every announcement referencing that category",
          "Logo on the awards page linked to your sponsor profile",
        ],
      },
      {
        label: "Summit Day",
        items: [
          "Exclusive naming rights to your chosen award category",
          "Presentation of the sponsored award on stage",
          "Branding on all signage related to the sponsored category",
          "Photo opportunities with the category winner",
          "Reserved seating for your team",
        ],
      },
      {
        label: "Post-Summit",
        items: [
          "Named alongside the category winner in all post-event publicity",
        ],
      },
    ],
  },
  {
    slug: "product-exhibition-partner",
    name: "Product & Exhibition Partner",
    tagline: "Put your product in front of Africa's legal tech builders.",
    price: "On request",
    groups: [
      {
        label: "Pre-Summit",
        items: [
          "Logo on the summit website and selected media platforms",
          "Recognition as an official partner in pre-summit campaign content",
        ],
      },
      {
        label: "Summit Day",
        items: [
          "Exhibition stand in the main networking area",
          "Live product demo slot during the breakout programme",
          "Promotional materials in attendee welcome packs",
          "Logo placement on event screens",
          "Verbal recognition during opening and closing remarks",
        ],
      },
      {
        label: "Post-Summit",
        items: [
          "Mention in the post-summit press release and social coverage",
          "One product feature on the Law x Tech newsletter",
        ],
      },
    ],
  },
  {
    slug: "community-partner",
    name: "Community Partner",
    tagline: "An entry-level partnership with meaningful visibility.",
    price: "On request",
    groups: [
      {
        label: "Pre-Summit",
        items: [
          "Logo on the summit website and pre-event digital materials",
          "Recognition as an official community partner",
          "Inclusion in at least one email campaign to the community",
        ],
      },
      {
        label: "Summit Day",
        items: [
          "Logo placement on event screens and signage",
          "Promotional materials in attendee welcome packs",
          "Verbal recognition during opening and closing remarks",
          "Listing in the summit programme",
        ],
      },
      {
        label: "Post-Summit",
        items: ["Named in the post-summit social coverage"],
      },
    ],
  },
];
