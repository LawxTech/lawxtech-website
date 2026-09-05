import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/lib/data/partners";

export default function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partners/${partner.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all duration-300 flex flex-col p-6"
    >
      <div className="relative h-16 w-full mb-6">
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          fill
          sizes="200px"
          className="object-contain object-left"
        />
      </div>
      <h2 className="font-bold text-navy text-lg leading-snug mb-2 group-hover:text-teal transition-colors">
        {partner.name}
      </h2>
      <p className="text-muted-brand text-sm leading-relaxed line-clamp-3 flex-1">
        {partner.tagline}
      </p>
      <div className="mt-4 pt-4 border-t border-border-brand">
        <span className="text-teal text-sm font-semibold">Learn more →</span>
      </div>
    </Link>
  );
}
