import type { Metadata } from "next";

const baseUrl = "https://lawxtech.org";

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Law x Tech",
      template: "%s | Law x Tech",
    },
    description:
      "Empowering lawyers and tech enthusiasts to thrive at the intersection of law and technology. Join Law x Tech for insightful sessions, expert guidance, and collaborative networking.",
    keywords: [
      "Law and Technology",
      "Legal Tech",
      "Tech-Savvy Lawyers",
      "Law x Tech Series",
      "Legal Innovation",
      "Legal Profession",
      "Nigeria Legal Tech",
    ],
    authors: [{ name: "Sopuruchi Rufus", url: baseUrl }],
    creator: "Law x Tech",
    publisher: "Law x Tech",
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: baseUrl,
      siteName: "Law x Tech",
      title: "Law x Tech — Where Law Meets Technology",
      description:
        "Empowering lawyers and tech enthusiasts to thrive at the intersection of law and technology.",
      images: [
        {
          url: "/assets/logo/logo_2.JPG",
          width: 1200,
          height: 630,
          alt: "Law x Tech",
        },
      ],
      ...overrides.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: "@lawxtech",
      creator: "@lawxtech",
      title: "Law x Tech — Where Law Meets Technology",
      description:
        "Empowering lawyers and tech enthusiasts to thrive at the intersection of law and technology.",
      images: ["/assets/logo/logo_2.JPG"],
      ...overrides.twitter,
    },
    ...overrides,
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Law x Tech",
  url: baseUrl,
  logo: `${baseUrl}/assets/logo/logo_2.JPG`,
  description:
    "Empowering lawyers and tech enthusiasts to thrive at the intersection of law and technology.",
  foundingDate: "2023",
  founder: { "@type": "Person", name: "Sopuruchi Rufus" },
  sameAs: [
    "https://twitter.com/lawxtech",
    "https://www.linkedin.com/company/lawxtech",
    "https://www.youtube.com/@lawxtech",
    "https://www.instagram.com/lawxtech",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-909-903-0433",
    email: "lawxtechseries@gmail.com",
    contactType: "customer support",
    areaServed: "NG",
  },
};
