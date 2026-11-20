import Link from "next/link";
import { Mail } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

const VOLUNTEER_EMAIL = "info@lawxtech.org";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Law x Tech is not recruiting right now. If you would like to volunteer, send us an email.",
});

export default function CareersPage() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-teal text-sm font-semibold uppercase tracking-widest">
          Careers
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
          We&apos;re not recruiting right now
        </h1>
        <p className="mt-5 text-muted-brand text-base leading-relaxed">
          We don&apos;t have any open roles at the moment. If you&apos;d like
          to volunteer with Law x Tech, shoot us an email and tell us a little
          about yourself and how you&apos;d like to help.
        </p>
        <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:${VOLUNTEER_EMAIL}?subject=Volunteering with Law x Tech`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors text-sm"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Email {VOLUNTEER_EMAIL}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-border-brand text-navy font-semibold rounded-xl hover:border-teal/30 hover:text-teal transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
