import { buildMetadata } from "@/lib/metadata";
import { partners } from "@/lib/data/partners";
import PartnersGrid from "@/components/partners/PartnersGrid";

export const metadata = buildMetadata({
  title: "Our Partners",
  description:
    "Meet the organisations partnering with Law x Tech to bring the legal tech community practical training, discounted programmes, and career opportunities.",
});

export default function PartnersPage() {
  return (
    <>
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Our Partners
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Building the Future, Together
          </h1>
          <p className="mt-5 text-muted-brand text-base leading-relaxed">
            We team up with organisations across the legal and technology
            worlds to bring the Law x Tech community practical training,
            discounted programmes, and career opportunities.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {partners.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🤝</p>
              <h3 className="text-xl font-bold text-navy">
                Partner announcements coming soon
              </h3>
              <p className="mt-2 text-muted-brand">
                Check back soon for new partnerships.
              </p>
            </div>
          ) : (
            <PartnersGrid partners={partners} />
          )}
        </div>
      </section>
    </>
  );
}
