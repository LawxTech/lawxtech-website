import Link from "next/link";
import { SUMMIT_DATE_LABEL } from "@/lib/constants";

function MarqueeGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex items-center shrink-0"
      aria-hidden={hidden || undefined}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="flex items-center">
          <span className="mx-6 text-sm font-semibold text-white whitespace-nowrap">
            Save the date - Law x Tech Summit &amp; Awards - {SUMMIT_DATE_LABEL}
            {!hidden && (
              <>
                {" "}
                <Link
                  href="/summit-awards"
                  className="underline underline-offset-2 hover:text-navy"
                >
                  Learn more
                </Link>
              </>
            )}
          </span>
          <span aria-hidden="true" className="mx-6 text-white/50">
            •
          </span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementMarquee() {
  return (
    <div
      className="bg-teal overflow-hidden py-2.5"
      role="region"
      aria-label="Event announcement"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}
