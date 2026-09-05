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
