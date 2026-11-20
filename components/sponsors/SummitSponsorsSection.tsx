import Image from "next/image";
import { summitSponsorGroups, type Sponsor } from "@/lib/data/sponsors";

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <>
      <div className="h-24 w-full flex items-center justify-center">
        {sponsor.kind === "individual" ? (
          <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-teal/10">
            <Image
              src={sponsor.image}
              alt={sponsor.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative h-16 w-full">
            <Image
              src={sponsor.image}
              alt={`${sponsor.name} logo`}
              fill
              sizes="(min-width: 1024px) 220px, 45vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
      <p className="mt-4 text-navy font-semibold text-sm text-center leading-snug">
        {sponsor.name}
      </p>
    </>
  );

  const className =
    "bg-white rounded-2xl border border-border-brand p-5 sm:p-6 flex flex-col items-center h-full";

  return sponsor.websiteUrl ? (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:border-teal/30 hover:shadow-lg transition-all duration-300`}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function SummitSponsorsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20 border-b border-border-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Law x Tech Summit &amp; Awards 2026
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Thank You to Our Sponsors
          </h2>
          <p className="mt-4 text-muted-brand text-base leading-relaxed">
            The organisations and individuals making this year&apos;s summit
            possible.
          </p>
        </div>

        <div className="space-y-12">
          {summitSponsorGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-navy font-bold text-lg mb-5 text-center sm:text-left">
                {group.label}
              </h3>
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {group.sponsors.map((sponsor) => (
                  <li key={sponsor.name}>
                    <SponsorCard sponsor={sponsor} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
