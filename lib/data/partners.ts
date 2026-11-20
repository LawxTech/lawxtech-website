import { SUMMIT_TICKETS_URL } from "@/lib/constants";

export interface Partner {
  slug: string;
  name: string;
  logo: string;
  websiteUrl?: string;
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
    slug: "modulawai",
    name: "ModulawAI",
    logo: "/assets/partners/modulawai.png",
    tagline: "30% off ModulawAI plans for every Law x Tech Summit attendee.",
    body: [
      "We're excited to partner with ModulawAI for the Law x Tech Summit & Awards 2026.",
      "ModulawAI is an AI-powered legal operations platform built for African legal practice, bringing legal research, case management, client collaboration, and workflow automation into one place.",
      "Through this partnership, every registered attendee and delegate of the Law x Tech Summit & Awards 2026 gets 30% off ModulawAI plans.",
    ],
    ctaLabel: "Get Your Summit Ticket",
    ctaUrl: SUMMIT_TICKETS_URL,
    tags: ["#LawxTech", "#LxTSummit2026", "#LegalTech", "#AIandLaw"],
  },
  {
    slug: "airpockets-travels",
    name: "AirPockets Travels",
    logo: "/assets/partners/airpockets-travels.png",
    tagline: "Eight exclusive travel and visa opportunities at the Law x Tech Summit.",
    body: [
      "We're partnering with AirPockets Travels to bring eight exclusive travel and visa opportunities to the Law x Tech Summit & Awards 2026.",
      "Three attendees stand a chance to receive sponsored visa processing for South Africa, and five attendees will get a free visa consultation for a country of their choice.",
      "The raffle draw is open to the first 100 attendees who arrive before 9am on Saturday, 28 November 2026. Don't miss out, and be punctual!",
    ],
    ctaLabel: "Get Your Summit Ticket",
    ctaUrl: SUMMIT_TICKETS_URL,
    tags: ["#LawxTech", "#LxTSummit2026", "#Travel", "#VisaOpportunities"],
  },
  {
    slug: "ruchis-agency-and-events",
    name: "Ruchi's Agency & Events",
    logo: "/assets/partners/ruchis-agency-and-events.png",
    tagline: "Your event, our priority.",
    body: [
      "We're pleased to announce Ruchi's Agency & Events as a partner of the Law x Tech Summit & Awards 2026.",
      "The summit takes place on Saturday, 28 November 2026 at The Zone, Gbagada, Lagos, bringing together lawyers, founders, regulators, and technologists shaping the future of law in Africa.",
    ],
    ctaLabel: "Get Your Summit Ticket",
    ctaUrl: SUMMIT_TICKETS_URL,
    tags: ["#LawxTech", "#LxTSummit2026", "#Events"],
  },
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
  {
    slug: "keyedge-resource-consult",
    name: "Keyedge Resource Consult",
    logo: "/assets/partners/keyedge-resource-consult.png",
    websiteUrl: "https://keyedgeresourceconsult.com",
    tagline: "Your partner in corporate strategy achievement.",
    body: [
      "We're pleased to welcome Keyedge Resource Consult, a consulting firm working with individuals and organisations on growth, capacity, and long-term strategy.",
      "Keyedge works across corporate strategy development, market analysis, operational efficiency, and digital transformation, alongside training in areas like communication skills and workplace productivity.",
      "For the Law x Tech community, the partnership opens up practical support on the business side of legal practice, from building a firm's operating strategy to the professional development that sits behind it.",
    ],
    ctaLabel: "Visit Keyedge",
    ctaUrl: "https://keyedgeresourceconsult.com",
    tags: ["#LawxTech", "#CorporateStrategy", "#Consulting", "#ProfessionalDevelopment"],
  },
];
