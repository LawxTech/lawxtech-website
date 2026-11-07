import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Countdown from "@/components/summit/Countdown";
import { SUMMIT_DATE_LABEL } from "@/lib/constants";

/**
 * Static announcement bar pinned to the top of the fixed header: the summit,
 * a live countdown and a link to the details page.
 */
export default function AnnouncementMarquee() {
  return (
    <div
      className="bg-teal py-1.5"
      role="region"
      aria-label="Event announcement"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-3 px-4 text-white sm:gap-x-5 sm:px-6">
        <p className="hidden text-sm font-semibold whitespace-nowrap md:block">
          Law x Tech Summit &amp; Awards
          <span aria-hidden className="mx-2 text-white/50">
            •
          </span>
          {SUMMIT_DATE_LABEL}
        </p>
        <Countdown variant="bar" />
        <Link
          href="/summit-awards"
          className="group inline-flex min-h-8 shrink-0 items-center gap-1 text-sm font-semibold whitespace-nowrap underline-offset-2 hover:underline"
        >
          Summit details
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
