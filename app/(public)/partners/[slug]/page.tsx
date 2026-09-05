import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { partners } from "@/lib/data/partners";
import { buildMetadata } from "@/lib/metadata";
import { ArrowLeft, Calendar, Monitor, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return partners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = partners.find((p) => p.slug === slug);
  if (!partner) return {};
  return buildMetadata({
    title: partner.name,
    description: partner.tagline,
    openGraph: {
      type: "article",
      title: partner.name,
      description: partner.tagline,
      images: [{ url: partner.logo, alt: partner.name }],
    },
  });
}

export default async function PartnerDetailPage({ params }: Props) {
  const { slug } = await params;
  const partner = partners.find((p) => p.slug === slug);
  if (!partner) notFound();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-muted-brand hover:text-navy text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to partners
        </Link>

        <div className="relative h-14 w-40 mb-4">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="160px"
            className="object-contain object-left"
          />
        </div>

        <a
          href={partner.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-teal text-sm font-semibold hover:underline mb-6"
        >
          {partner.websiteUrl.replace(/^https?:\/\//, "")}
          <ExternalLink size={13} />
        </a>

        <h1 className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-6">
          {partner.tagline}
        </h1>

        {(partner.startDate || partner.format) && (
          <div className="flex flex-wrap items-center gap-4 text-muted-brand text-sm mb-8">
            {partner.startDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Classes begin {partner.startDate}
              </span>
            )}
            {partner.format && (
              <span className="flex items-center gap-1.5">
                <Monitor size={14} />
                {partner.format}
              </span>
            )}
          </div>
        )}

        <div className="space-y-5 text-[#374151] text-base leading-8">
          {partner.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {partner.ctaUrl && partner.ctaLabel && (
          <a
            href={partner.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-8 px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-sm"
          >
            {partner.ctaLabel}
          </a>
        )}

        {partner.tags && partner.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border-brand flex flex-wrap gap-2">
            {partner.tags.map((tag) => (
              <span
                key={tag}
                className="text-teal text-xs font-semibold bg-teal/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
