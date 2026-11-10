import type { StaticImageData } from "next/image";
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

export type SummitSpeaker = {
  slug: string;
  name: string;
  role: string;
  org: string;
  /** "Speaker Spotlight" flyer: portrait with name and role. */
  spotlight: StaticImageData;
  /** Bio flyer: the speaker's full biography as text in the image. */
  bio: StaticImageData;
  spotlightAlt: string;
  bioAlt: string;
  /** CSS object-position that centres the face for round thumbnails. */
  facePosition: string;
};

const spotlightAlt = (name: string, title: string) =>
  `Law x Tech Summit & Awards 2026 speaker spotlight: ${name}, ${title}. Saturday 28 November 2026, 9am at The Zone, Gbagada, Lagos.`;

/** Speakers in the order their flyers were announced. */
export const summitSpeakers: SummitSpeaker[] = [
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
];
