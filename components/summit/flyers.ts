export type Flyer = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const venue =
  "The Zone, Plot 9, Gbagada Industrial Scheme, beside UPS, Gbagada-Oworonshoki Expressway, Lagos";

export const nominationsFlyer: Flyer = {
  src: "/assets/summit/summit-awards-2026-nominations-open.jpeg",
  alt: "Law x Tech Awards & Honours 2026 flyer: nominations are now open. Nominate a trailblazer, celebrate an innovator, honour an impact maker. Deadline 30 October.",
  width: 1200,
  height: 1600,
};

export const summitFlyers: Flyer[] = [
  {
    src: "/assets/summit/summit-awards-2026-flyer.jpeg",
    alt: `Law x Tech Summit & Awards 2026 flyer: Spotlighting Nigerian Legal Technology. 28 November 2026, 9am at ${venue}.`,
    width: 1024,
    height: 1280,
  },
  {
    src: "/assets/summit/summit-awards-2026-location.jpeg",
    alt: "Law x Tech Summit & Awards 2026 location confirmed: The Zone, Gbagada, Lagos. 28 November 2026.",
    width: 1080,
    height: 1350,
  },
  {
    src: "/assets/summit/summit-awards-2026-tickets.jpeg",
    alt: `Grab your tickets for the Law x Tech Summit & Awards 2026 at lawxtech.org/summit-awards. Saturday 28 November 2026, 9am prompt, dress code Legal Techie, ${venue}.`,
    width: 1024,
    height: 1280,
  },
  {
    src: "/assets/summit/summit-awards-2026-who-should-attend.jpeg",
    alt: "Who should attend the Law x Tech Summit & Awards 2026: lawyers and law firm leaders, in-house legal teams, legal tech founders and builders, tech and AI professionals, law students and young lawyers, innovation and legal operations professionals, regulators, policymakers and academics, and investors and ecosystem builders.",
    width: 1122,
    height: 1402,
  },
  {
    src: "/assets/summit/summit-awards-2026-why-attend.jpeg",
    alt: "Why you should attend the Law x Tech Summit & Awards 2026: see the tech, learn what's actually changing, meet the people building it, discover new career paths, build valuable connections and be in the room.",
    width: 1122,
    height: 1402,
  },
  {
    src: "/assets/summit/summit-awards-2026-partner-lawexa.jpeg",
    alt: "Partnership announcement: Law x Tech Summit & Awards 2026 x Lawexa.",
    width: 1024,
    height: 1280,
  },
  nominationsFlyer,
  {
    src: "/assets/summit/summit-awards-2026-founders-birthday-giveaway.jpeg",
    alt: "Founder's birthday giveaway: get the Unicorn ticket for the Law x Tech Summit & Awards 2026 at ₦7,500 instead of ₦50,000 with discount code Ruchi@28, until 30 October 2026.",
    width: 853,
    height: 1280,
  },
];
