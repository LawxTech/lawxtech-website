import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Page Not Found",
  robots: { index: false, follow: true },
});

export default function NotFound() {
  return (
    <section className="bg-white py-24 min-h-[80vh] flex items-center justify-center border-b border-border-brand">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-teal text-sm font-semibold uppercase tracking-widest">
          Page Not Found
        </span>
        <h1 className="mt-3 text-6xl sm:text-7xl lg:text-[14.5rem] font-extrabold text-navy tracking-tight">
          404
        </h1>
        <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        <p className="mt-6 text-muted-brand text-base leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the link might be outdated.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-dark transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/series"
            className="px-6 py-3 border border-border-brand text-navy text-sm font-semibold rounded-lg hover:bg-surface transition-colors duration-200"
          >
            Explore the Series
          </Link>
        </div>
      </div>
    </section>
  );
}
