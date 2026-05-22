import { buildMetadata } from "@/lib/metadata";
import SeriesClient from "@/components/series/SeriesClient";

export const metadata = buildMetadata({
  title: "The Series",
  description:
    "Browse all Law x Tech Series and Mini Series episodes — expert-led sessions on legal tech, product management, and building a career at the intersection of law and technology.",
});

export default function SeriesPage() {
  return (
    <>
      <section className="bg-white py-20 border-b border-[#e4e8ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#02807e] text-sm font-semibold uppercase tracking-widest">
            All Episodes
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-[#113167] tracking-tight">
            The Series
          </h1>
          <p className="mt-5 text-[#6b7280] max-w-2xl mx-auto text-base leading-relaxed">
            Expert-led sessions on legal tech, product management, coding, and
            everything at the intersection of law and technology. Available to
            all community members.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-[#02807e] rounded-full" />
        </div>
      </section>

      <section className="bg-[#f8f9fb] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SeriesClient />
        </div>
      </section>

      <section className="bg-[#113167] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Speak at the Series
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Are you a legal tech professional, founder, or expert? Share
                your knowledge and insights with our growing community.
              </p>
              <a
                href="https://forms.gle/ee4eCViprcSn4DE87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[#02807e] text-white font-semibold rounded-lg hover:bg-[#026e6c] transition-colors text-sm"
              >
                Apply to Speak
              </a>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Volunteer With Us
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Help organise, promote, and run the series. Gain real-world
                experience while contributing to Nigeria&apos;s legal tech
                movement.
              </p>
              <a
                href="https://forms.gle/Uba4R8QKKeiufVUj6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Apply as Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
