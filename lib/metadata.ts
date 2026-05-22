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
      "Law x Tech is Africa's leading platform at the intersection of law and technology - powering events, training, and recognition for lawyers in legal tech across Nigeria and beyond.",
    keywords: [
      "Law x Tech",
      "Legal Tech Africa",
      "Legal Technology Nigeria",
      "Law and Technology",
      "Legal Innovation",
      "Lawyers in Tech",
      "Nigeria Legal Tech",
      "Legal Tech Events",
      "Legal Tech Training",
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
      title: "Law x Tech — Africa's Home for Law & Technology",
      description:
        "Law x Tech is Africa's leading platform at the intersection of law and technology - powering events, training, and recognition for lawyers in legal tech across Nigeria and beyond.",
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
      site: "@LawxTech",
      creator: "@LawxTech",
      title: "Law x Tech — Africa's Home for Law & Technology",
      description:
        "Law x Tech is Africa's leading platform at the intersection of law and technology - powering events, training, and recognition for lawyers in legal tech across Nigeria and beyond.",
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
    "Law x Tech is Africa's leading platform at the intersection of law and technology - powering events, training, and recognition for lawyers in legal tech across Nigeria and beyond.",
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
