import type { StaticImageData } from "next/image";
import chiomaSpotlight from "@/public/assets/summit/speakers/chioma-wilson-dike-spotlight.jpeg";
import chiomaBio from "@/public/assets/summit/speakers/chioma-wilson-dike-bio.jpeg";
import enyinnayaSpotlight from "@/public/assets/summit/speakers/enyinnaya-danjuma-chukwueke-spotlight.jpeg";
import enyinnayaBio from "@/public/assets/summit/speakers/enyinnaya-danjuma-chukwueke-bio.jpeg";
import emmanuelSpotlight from "@/public/assets/summit/speakers/emmanuel-adebayo-spotlight.jpeg";
import emmanuelBio from "@/public/assets/summit/speakers/emmanuel-adebayo-bio.jpeg";
import eniolaSpotlight from "@/public/assets/summit/speakers/eniola-sogbesan-spotlight.jpeg";
import eniolaBio from "@/public/assets/summit/speakers/eniola-sogbesan-bio.jpeg";
import adelaSpotlight from "@/public/assets/summit/speakers/adela-yongo-spotlight.jpeg";
import adelaBio from "@/public/assets/summit/speakers/adela-yongo-bio.jpeg";
import rexSpotlight from "@/public/assets/summit/speakers/rex-azubuike-spotlight.jpeg";
import rexBio from "@/public/assets/summit/speakers/rex-azubuike-bio.jpeg";
import modupeSpotlight from "@/public/assets/summit/speakers/modupe-olusoga-spotlight.jpeg";
import modupeBio from "@/public/assets/summit/speakers/modupe-olusoga-bio.jpeg";
import oladejiSpotlight from "@/public/assets/summit/speakers/oladeji-awoniyi-spotlight.jpeg";
import oladejiBio from "@/public/assets/summit/speakers/oladeji-awoniyi-bio.jpeg";
import preciousSpotlight from "@/public/assets/summit/speakers/precious-ekong-spotlight.jpeg";
import preciousBio from "@/public/assets/summit/speakers/precious-ekong-bio.jpeg";
import abiolaSpotlight from "@/public/assets/summit/speakers/abiola-ogodo-spotlight.jpeg";
import abiolaBio from "@/public/assets/summit/speakers/abiola-ogodo-bio.jpeg";
import ridwanSpotlight from "@/public/assets/summit/speakers/ridwan-badmus-spotlight.jpeg";
import ridwanBio from "@/public/assets/summit/speakers/ridwan-badmus-bio.jpeg";
import angelSpotlight from "@/public/assets/summit/speakers/angel-asher-spotlight.jpeg";
import angelBio from "@/public/assets/summit/speakers/angel-asher-bio.jpeg";
import adedunmadeSpotlight from "@/public/assets/summit/speakers/adedunmade-onibokun-spotlight.jpeg";
import adedunmadeBio from "@/public/assets/summit/speakers/adedunmade-onibokun-bio.jpeg";
import bridgetSpotlight from "@/public/assets/summit/speakers/bridget-ofomhi-spotlight.jpeg";
import bridgetBio from "@/public/assets/summit/speakers/bridget-ofomhi-bio.jpeg";
import chisomSpotlight from "@/public/assets/summit/speakers/chisom-jeremiah-ijeomah-spotlight.jpeg";
import chisomBio from "@/public/assets/summit/speakers/chisom-jeremiah-ijeomah-bio.jpeg";

export type SummitSpeaker = {
  slug: string;
  name: string;
  role: string;
  /** Omitted when the flyer gives a title without an organisation. */
  org?: string;
  /** Session billing printed on the flyer, for speakers who have one. */
  billing?: "Keynote" | "Fireside chat";
  /** "Speaker Spotlight" flyer: portrait with name and role. */
  spotlight: StaticImageData;
  /** Bio flyer: the speaker's full biography as text in the image. */
  bio: StaticImageData;
  spotlightAlt: string;
  bioAlt: string;
  /** CSS object-position that centres the face for round thumbnails. */
  facePosition: string;
};

/** "Role, Org", or just the role when there is no organisation. */
export const speakerTitle = (s: Pick<SummitSpeaker, "role" | "org">) =>
  s.org ? `${s.role}, ${s.org}` : s.role;

const spotlightAlt = (name: string, title: string, kind = "speaker") =>
  `Law x Tech Summit & Awards 2026 ${kind} spotlight: ${name}, ${title}. Saturday 28 November 2026, 9am at The Zone, Gbagada, Lagos.`;

/**
 * The full speaker line-up: keynote first, then the fireside chat, then the
 * remaining speakers in the order their flyers were announced.
 */
export const summitSpeakers: SummitSpeaker[] = [
  {
    slug: "chioma-wilson-dike",
    name: "Chioma Wilson-Dike",
    role: "Legal Innovation Strategist, AI Governance Advocate & Lawyer",
    billing: "Keynote",
    spotlight: chiomaSpotlight,
    bio: chiomaBio,
    spotlightAlt: spotlightAlt(
      "Chioma Wilson-Dike",
      "Legal Innovation Strategist, AI Governance Advocate and Lawyer",
      "keynote speaker",
    ),
    bioAlt:
      "Keynote speaker bio: Chioma Wilson-Dike is a legal innovation strategist, AI governance advocate, and Barrister and Solicitor. Her work spans AI adoption, legal operations, digital transformation and responsible AI governance. She is the Founder of Lexlytic and the Nigerian LegalTech Network, and has convened and contributed to events including Future Lawyer UK, LegalGeek, Legal Innovators and LegalTechTalk. She was named among ILTA's Influential Women in LegalTech 2026 and TechRound's Top 10 Women in LegalTech 2026, and ranked the #1 LegalTech & Legal Entrepreneurs Creator in Nigeria by Favikon.",
    facePosition: "49% 37%",
  },
  {
    slug: "enyinnaya-danjuma-chukwueke",
    name: "Enyinnaya Danjuma Chukwueke",
    role: "Lawyer, Public Policy Practitioner & Cybercrime Specialist",
    billing: "Fireside chat",
    spotlight: enyinnayaSpotlight,
    bio: enyinnayaBio,
    spotlightAlt: spotlightAlt(
      "Enyinnaya Danjuma Chukwueke",
      "Lawyer, Public Policy Practitioner and Cybercrime Specialist",
      "fireside speaker",
    ),
    bioAlt:
      "Speaker bio: Enyinnaya Danjuma Chukwueke is a Nigerian lawyer, public policy practitioner and cybercrime specialist. He serves as a Superintendent of Police and Legal Officer/Investigator at the Nigeria Police Force National Cybercrime Centre (NPF-NCCC), working on complex cyber-enabled financial crime and digital investigations. His career spans private legal practice, the corporate sector, internal affairs and counter-terrorism, and he contributes to policy on policing reform, cybercrime and technology governance. Called to the Nigerian Bar in 2015, he holds a BA in Philosophy, Politics and Economics from the University of York and recently completed the Master of Public Policy at the University of Oxford's Blavatnik School of Government.",
    facePosition: "46% 37%",
  },
  {
    slug: "emmanuel-adebayo",
    name: "Emmanuel Adebayo",
    role: "Head, Innovation & Technology",
    org: "Aluko & Oyebode",
    spotlight: emmanuelSpotlight,
    bio: emmanuelBio,
    spotlightAlt: spotlightAlt(
      "Emmanuel Adebayo",
      "Head of Innovation & Technology, Aluko & Oyebode",
    ),
    bioAlt:
      "Speaker bio: Emmanuel Adebayo is Head of Innovation and Technology at Aluko & Oyebode. Over two decades across payment cards, security operations, cybersecurity and law, he helped SecureID become the first card personalisation bureau in sub-Saharan Africa to achieve Visa certification, led EMV and PCI DSS aligned environments, and at Aluko & Oyebode has modernised infrastructure, stood up a cybersecurity programme and set the firm's AI strategy. A software engineer at heart and a lifelong chess enthusiast.",
    facePosition: "47% 41%",
  },
  {
    slug: "eniola-sogbesan",
    name: "Eniola Sogbesan",
    role: "Senior Associate",
    org: "Pavestones",
    spotlight: eniolaSpotlight,
    bio: eniolaBio,
    spotlightAlt: spotlightAlt(
      "Eniola Sogbesan",
      "Senior Associate, Pavestones",
    ),
    bioAlt:
      "Speaker bio: Eniola Sogbesan is a Senior Associate at Pavestones, a female-led, modern full-service law practice in Lagos. His practice spans finance and technology law, corporate and commercial transactions, corporate governance and regulatory compliance, advising multinationals, technology service providers and startups. He is a member of the NBA Section on Business Law and a licensed compliance officer of the Securities and Exchange Commission, Nigeria.",
    facePosition: "48% 38%",
  },
  {
    slug: "adela-yongo",
    name: "Adela Yongo",
    role: "Growth/Relationship Manager",
    org: "Harib Tech Law Academy",
    spotlight: adelaSpotlight,
    bio: adelaBio,
    spotlightAlt: spotlightAlt(
      "Adela Yongo",
      "Growth/Relationship Manager, Harib Tech Law Academy",
    ),
    bioAlt:
      "Speaker bio: Adela Hakapwa Temitope Yongo is a legal practitioner in corporate and commercial law, banking and finance, regulatory advisory, infrastructure and dispute resolution, practising at Y.C. Maikyau & Co., Abuja. She holds an LL.M. in Financial Law & Policy from Nile University and a First Class LL.B. from Redeemer's University. She is Growth & Relationship Manager at Harib Technology Law Academy and Secretary of the Insights & Publications Committee of the NBA Section on Business Law.",
    facePosition: "46% 38%",
  },
  {
    slug: "rex-azubuike",
    name: "Rex Azubuike",
    role: "Chief Technology Officer",
    org: "NBA-SBL",
    spotlight: rexSpotlight,
    bio: rexBio,
    spotlightAlt: spotlightAlt(
      "Rex Azubuike",
      "Chief Technology Officer, NBA-SBL",
    ),
    bioAlt:
      "Speaker bio: Rex Azubuike is a technology executive and advisor with over 15 years of experience in enterprise web architecture, data security and international consulting. He is Chief Technology Officer & Data Protection Officer for the NBA Section on Business Law, Lead Event Technology Consultant for Sterling Bank's AGMs, and a Consulting Partner for US-based Global Impact Partners Group and Jo Ariam LLC. He holds an M.Sc. in Information Technology and a Bachelor's in Computer Science.",
    facePosition: "48% 41%",
  },
  {
    slug: "modupe-olusoga",
    name: "Modupe Olusoga",
    role: "Chief Operating Officer",
    org: "Streamsowers & Köhn",
    spotlight: modupeSpotlight,
    bio: modupeBio,
    spotlightAlt: spotlightAlt(
      "Modupe Olusoga",
      "Chief Operating Officer, Streamsowers & Köhn",
    ),
    bioAlt:
      "Speaker bio: Modupeola Olusoga is Chief Operating Officer of Streamsowers & Köhn, with more than two decades across professional services, financial services, consulting and the legal sector. She is African Regional Forum Liaison Officer of the International Bar Association and President of the Association of Law Firm Administrators Nigeria (ALAN). She holds an MSc from the University of Lagos and a BSc in Economics from Babcock University.",
    facePosition: "44% 37%",
  },
  {
    slug: "oladeji-awoniyi",
    name: "Oladeji Awoniyi",
    role: "Chief Executive Officer",
    org: "Vega by MyPocketCounsel",
    spotlight: oladejiSpotlight,
    bio: oladejiBio,
    spotlightAlt: spotlightAlt(
      "Oladeji Awoniyi",
      "Chief Executive Officer, Vega by MyPocketCounsel",
    ),
    bioAlt:
      "Speaker bio: Oladeji Awoniyi is the Founder and CEO of MyPocketCounsel (MPC), a Google-backed legal tech company building Vega, an automation platform for contract drafting, document review and obligation tracking, built for legal teams across Africa and beyond. A lawyer and developer by background, Deji spent roughly a decade in Big Law commercial practice across Nigerian and cross-border matters before founding MPC, and has built numerous web and mobile applications over his career.",
    facePosition: "51% 37%",
  },
  {
    slug: "precious-ekong",
    name: "Precious Ekong",
    role: "Founder & CEO",
    org: "Lawexa",
    spotlight: preciousSpotlight,
    bio: preciousBio,
    spotlightAlt: spotlightAlt("Precious Ekong", "Founder & CEO, Lawexa"),
    bioAlt:
      "Speaker bio: Precious Ekong is the Founder and CEO of Lawexa, an AI-powered legal research and intelligence platform serving lawyers, law firms and law students across Nigeria, Ghana, Uganda and other jurisdictions. He has spent over a decade building legal technology, beginning with Precious Caseapp in 2016; Lawexa, launched in January 2026, has grown to over 10,000 users in nine months. He has built legal products at Moland Partners and served as in-house counsel at Imperial Homes Mortgage Bank (formerly GTHomes), and speaks on how AI is reshaping legal practice and creating new career opportunities for lawyers.",
    facePosition: "44% 39%",
  },
  {
    slug: "abiola-ogodo",
    name: "Abiola Ogodo",
    role: "Founder",
    org: "ModulawAI",
    spotlight: abiolaSpotlight,
    bio: abiolaBio,
    spotlightAlt: spotlightAlt("Abiola Ogodo", "Founder, ModulawAI"),
    bioAlt:
      "Speaker bio: Abiola Ogodo is the Founder of ModulawAI, an AI-native legal technology platform built to transform how lawyers research, draft, analyse documents and manage their legal work. With a background in software and product development, he brings research, document analysis, drafting and case management into one connected workspace, making AI practical for lawyers as an intelligent layer inside the tools they already use, including Microsoft Word.",
    facePosition: "49% 39%",
  },
  {
    slug: "ridwan-badmus",
    name: "Ridwan Badmus",
    role: "Head of Technology Law, Data Protection & AI Governance",
    org: "Oguntoye & Oguntoye LP",
    spotlight: ridwanSpotlight,
    bio: ridwanBio,
    spotlightAlt: spotlightAlt(
      "Ridwan Badmus",
      "Head of Technology Law, Data Protection & AI Governance",
    ),
    bioAlt:
      "Speaker bio: Ridwan Badmus is the Head of Technology Law, Privacy and AI Governance & CTO at Oguntoye & Oguntoye LP, the Privacy Engineering and AI Governance Lead at TechStabs Consulting, and Co-Founder and Privacy Technologist at FR Data Protection. He holds the AIGP and CIPT credentials from the International Association of Privacy Professionals (IAPP), and advises organisations on integrating privacy, data protection and trustworthy AI requirements into their products, operations and governance structures.",
    facePosition: "48% 41%",
  },
  {
    slug: "angel-asher",
    name: "Angel Asher",
    role: "AI Governance Lawyer",
    spotlight: angelSpotlight,
    bio: angelBio,
    spotlightAlt: spotlightAlt("Angel Asher", "AI Governance Lawyer"),
    bioAlt:
      "Speaker bio: Angel Asher is a lawyer who helps organisations build and use AI responsibly. At the Houston AI Institute, an AI education organisation, Angel gained hands-on experience reviewing international contracts, managing global programmes and building a brand voice focused on responsible AI and ethics. To bridge the gap between knowing the law and creating technology, Angel is learning AI product engineering to understand how legal rules can be built into everyday technology.",
    facePosition: "46% 40%",
  },
  {
    slug: "adedunmade-onibokun",
    name: "Adedunmade Onibokun",
    role: "Managing Partner",
    org: "Adedunmade Onibokun & Co",
    spotlight: adedunmadeSpotlight,
    bio: adedunmadeBio,
    spotlightAlt: spotlightAlt(
      "Adedunmade Onibokun FICMC",
      "Managing Partner, Adedunmade Onibokun & Co",
    ),
    bioAlt:
      "Speaker bio: Adedunmade (Ade) Onibokun is a lawyer, author and Managing Partner at Adedunmade Onibokun & Co, a general practice firm specialising in corporate commercial law, representing banks, corporates, government agencies and state governments. He has a strong focus on Art Law and is the Founder of Legalnaija, a justice innovation startup with an Online Dispute Resolution mechanism. He received the Outstanding Young Professional Award at the 2022 Nigerian Legal Awards, is Secretary of the NBA Gender Justice and Violence Prevention Committee, Vice Chair of the NBASLP Entertainment and Media Sub-Committee, and a member of the Osun State Judicial Service Commission.",
    facePosition: "46% 39%",
  },
  {
    slug: "bridget-ofomhi",
    name: "Bridget Ofomhi",
    role: "Senior Product Manager",
    org: "SunFi",
    spotlight: bridgetSpotlight,
    bio: bridgetBio,
    spotlightAlt: spotlightAlt(
      "Bridget Ofomhi",
      "Senior Product Manager, SunFi, and former Lead Product Manager, LawPavilion",
    ),
    bioAlt:
      "Speaker bio: Bridget Ofomhi is a Senior Product Manager at SunFi, an agent-led, AI-powered super distribution platform for clean-tech products and services, where she leads product and quality assurance teams. Previously, she was Lead Product Manager at LawPavilion, working on legal-tech and AI-powered products that support legal professionals in their research and practice. She brings a practical perspective on the decisions and trade-offs involved in building and growing digital products across industries.",
    facePosition: "49% 37%",
  },
  {
    slug: "chisom-jeremiah-ijeomah",
    name: "Chisom Jeremiah Ijeomah",
    role: "Senior Software & AI Engineer",
    spotlight: chisomSpotlight,
    bio: chisomBio,
    spotlightAlt: spotlightAlt(
      "Chisom Jeremiah Ijeomah",
      "Senior Software & AI Engineer",
    ),
    bioAlt:
      "Speaker bio: Chisom Jeremiah Ijeomah is a barrister and software engineer with over seven years of experience building digital products across fintech, edutech, artificial intelligence, cybersecurity and enterprise software. He leads engineering teams building secure, scalable digital solutions with a growing focus on AI engineering, and is interested in how legal frameworks can evolve to address emerging technologies and how a grounding in law helps engineers make more responsible decisions.",
    facePosition: "50% 40%",
  },
];
