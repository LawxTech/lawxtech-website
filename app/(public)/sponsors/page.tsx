import Link from "next/link";
import { ArrowRight, Mail, Ticket } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { SUMMIT_TICKETS_URL } from "@/lib/constants";
import SponsorStatsStrip from "@/components/sponsors/SponsorStatsStrip";
import WhySponsorSection from "@/components/sponsors/WhySponsorSection";
import SponsorshipPackages from "@/components/sponsors/SponsorshipPackages";
import TicketsBand from "@/components/sponsors/TicketsBand";
import SponsorContactSection from "@/components/sponsors/SponsorContactSection";

export const metadata = buildMetadata({
  title: "Sponsors & Partners",
  description:
    "Partner with the Law x Tech Summit & Awards — sponsorship packages that put your brand in front of Africa's legal technology community.",
});

export default function SponsorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
            <div>
              <span className="text-teal text-sm font-semibold uppercase tracking-widest">
                Law x Tech Summit &amp; Awards 2026 — Sponsorship
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
                Sponsorship &amp; Partnership Opportunities
              </h1>
              <p className="mt-5 text-muted-brand text-base leading-relaxed max-w-xl">
                Align your brand with Africa&apos;s leading platform at the
                intersection of law and technology — and reach the lawyers,
                founders and technologists shaping how legal work gets done.
              </p>
              <div className="mt-6 w-16 h-1 bg-teal rounded-full" />
            </div>

            <div className="flex flex-col gap-3 lg:max-w-sm lg:ml-auto lg:w-full">
              <Link
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors text-sm"
              >
                View Packages
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="mailto:info@lawxtech.org?subject=Summit Sponsorship Enquiry"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border-brand text-navy font-semibold rounded-xl hover:border-teal/30 hover:text-teal transition-colors text-sm"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Talk to the Team
              </a>
              <Link
                href={SUMMIT_TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border-brand text-navy font-semibold rounded-xl hover:border-teal/30 hover:text-teal transition-colors text-sm"
              >
                <Ticket className="w-4 h-4" aria-hidden="true" />
                Get Tickets
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SponsorStatsStrip />
      <WhySponsorSection />
      <SponsorshipPackages />
      <TicketsBand />
      <SponsorContactSection />
    </>
  );
}
