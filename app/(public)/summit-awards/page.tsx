import { buildMetadata } from "@/lib/metadata";
import UpcomingSummitSection from "@/components/summit/UpcomingSummitSection";
import PastEditionsSection from "@/components/summit/PastEditionsSection";

export const metadata = buildMetadata({
  title: "Summit & Awards",
  description:
    "The Law x Tech Summit — Africa's flagship gathering for lawyers and technologists. Celebrating excellence through awards, keynotes, and community.",
});

export default function SummitAwardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Summit & Awards
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            The Law x Tech Summit
          </h1>
          <p className="mt-5 text-muted-brand text-base leading-relaxed">
            Our flagship annual event — bringing together legal tech leaders,
            celebrating excellence, and shaping the future of law and technology
            in Africa.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        </div>
      </section>

      <UpcomingSummitSection />
      {/* <PastEditionsSection /> */}

      {/* Bottom CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Sponsor the Summit
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Partner with us to put your brand in front of Nigeria&apos;s
                most engaged legal tech community. Reach decision-makers,
                innovators, and the next generation of legal professionals.
              </p>
              <a
                href="mailto:info@lawxtech.org?subject=Summit Sponsorship Enquiry"
                className="inline-flex items-center px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-sm"
              >
                Get in Touch
              </a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Speak or Partner
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Are you a legal tech expert, founder, or organisation? Join us
                as a speaker, nominator, or event partner and help us raise the
                bar for legal tech in Africa.
              </p>
              <a
                href="mailto:info@lawxtech.org?subject=Summit Speaker / Partner Enquiry"
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Send a Note
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
