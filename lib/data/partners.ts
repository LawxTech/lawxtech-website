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
  {
    slug: "lawexa",
    name: "Lawexa",
    logo: "/assets/partners/lawexa.png",
    websiteUrl: "https://lawexa.com",
    tagline: "Where modern legal work happens.",
    body: [
      "We're glad to be working with Lawexa, an AI-powered legal research and drafting platform built for lawyers, students, and legal teams.",
      "Lawexa helps its users research cases and laws across jurisdictions, draft, study, and collaborate with AI so legal work gets done faster and more reliably.",
      "For the Law x Tech community, the partnership is a chance to see AI-assisted legal research applied to real African practice, and to put the tools to work in your own study and casework.",
    ],
    ctaLabel: "Explore Lawexa",
    ctaUrl: "https://lawexa.com",
    tags: ["#LawxTech", "#LegalResearch", "#LegalTech", "#AIandLaw"],
  },
  {
    slug: "mypocketcounsel",
    name: "Vega by MyPocketCounsel",
    logo: "/assets/partners/mypocketcounsel.png",
    websiteUrl: "https://mypocketcounsel.com",
    tagline: "Contracts, drafted for your jurisdiction.",
    body: [
      "We're partnering with MyPocketCounsel, the team behind Vega, an AI contract platform built for legal teams and the businesses they support.",
      "Vega brings jurisdiction-specific drafting, playbook-driven AI review, and obligation tracking into one workspace, including a Microsoft Word add-in so teams can draft and review without leaving the tools they already use.",
      "Through this partnership, the Law x Tech community gets a closer look at how contract automation is being built for African legal practice, and how in-house teams and law firms are putting it to work.",
    ],
    ctaLabel: "Book a Demo",
    ctaUrl: "https://mypocketcounsel.com",
    tags: ["#LawxTech", "#ContractAutomation", "#LegalTech", "#AIandLaw"],
  },
];
