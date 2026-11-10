/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Ticket } from "lucide-react";
import CountdownHourglass from "./CountdownHourglass";
import {
  getTimeRemaining,
  formatTwoDigits,
  type TimeRemaining,
} from "@/lib/countdown";
import { SUMMIT_DATE, SUMMIT_TICKETS_URL } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const TEAL_DEEP = "#006a77";

/** Four-point sparkle, as used across the summit graphics. */
function Sparkle({
  className = "",
  color = "#ffffff",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill={color}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/** Pick the largest unit still counting, so the headline never reads "0". */
function headline(t: TimeRemaining) {
  if (t.days > 0) return { value: t.days, unit: t.days === 1 ? "Day" : "Days" };
  if (t.hours > 0)
    return { value: t.hours, unit: t.hours === 1 ? "Hour" : "Hours" };
  return {
    value: Math.max(t.minutes, 1),
    unit: t.minutes === 1 ? "Minute" : "Minutes",
  };
}

/**
 * Summit countdown in the style of the graphics team's "Days to go" posts:
 * giant halftone day count, hourglass illustration and the event info strip.
 */
export default function SummitCountdownSection({
  targetDate = SUMMIT_DATE,
}: {
  targetDate?: Date;
}) {
  const reduce = usePrefersReducedMotion();
  // Starts empty and fills in on mount, so the server-rendered page never
  // disagrees with the visitor's clock.
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    setTime(getTimeRemaining(targetDate));
    const id = setInterval(() => setTime(getTimeRemaining(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const big = time && !time.isPast ? headline(time) : null;
  const digits = big ? String(big.value) : "00";

  return (
    <section
      aria-labelledby="summit-countdown-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#e3fafa_0%,#d3f2f2_55%,#eaf7f8_100%)]"
    >
      {/* Dotted wave field behind the digits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34, 176, 189, 0.45) 1.2px, transparent 1.8px)",
          backgroundSize: "11px 11px",
          maskImage:
            "radial-gradient(ellipse 48% 34% at 38% 46%, black 0%, transparent 72%), radial-gradient(ellipse 30% 24% at 62% 62%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 48% 34% at 38% 46%, black 0%, transparent 72%), radial-gradient(ellipse 30% 24% at 62% 62%, black 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <h2
          id="summit-countdown-heading"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a5d6c] sm:text-sm"
        >
          <Sparkle className="size-3.5" color={TEAL_DEEP} />
          Counting down to the Law x Tech Summit &amp; Awards 2026
        </h2>

        {/* Digits + illustration */}
        <div className="relative mx-auto mt-6 max-w-5xl sm:mt-8">
          <div className="relative z-0 pr-[34%] sm:pr-[40%]">
            <Sparkle className="absolute left-[4%] top-[12%] z-10 size-[7vw] max-w-12 sm:size-10" />

            <p aria-live="off" className="sr-only">
              {time?.isPast
                ? "The summit is happening now."
                : big
                  ? `${big.value} ${big.unit.toLowerCase()} to go.`
                  : ""}
            </p>

            {time?.isPast ? (
              <p className="font-display text-[19vw] uppercase leading-[0.9] text-[#006a77] sm:text-8xl lg:text-9xl">
                It&apos;s
                <br />
                summit day
              </p>
            ) : (
              <div aria-hidden className="relative w-fit">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={digits}
                    initial={reduce ? false : { y: "18%", opacity: 0 }}
                    animate={{ y: 0, opacity: time ? 1 : 0 }}
                    exit={reduce ? undefined : { y: "-18%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative block font-display text-[46vw] leading-[0.8] tracking-[-0.02em] sm:text-[17rem] lg:text-[25rem]"
                    style={{ color: TEAL_DEEP }}
                  >
                    {digits}
                    {/* Halftone band through the digits */}
                    <span
                      className={`absolute inset-0 ${reduce ? "" : "animate-halftone-drift"}`}
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(140, 236, 242, 0.85) 1.5px, transparent 2.2px)",
                        backgroundSize: "9px 9px",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        maskImage:
                          "linear-gradient(110deg, transparent 30%, black 45%, black 55%, transparent 70%)",
                        WebkitMaskImage:
                          "linear-gradient(110deg, transparent 30%, black 45%, black 55%, transparent 70%)",
                        maskSize: "250% 100%",
                        WebkitMaskSize: "250% 100%",
                        maskPosition: "30% 50%",
                        WebkitMaskPosition: "30% 50%",
                      }}
                    >
                      {digits}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </div>
            )}

            {!time?.isPast && (
              <p
                aria-hidden
                className="relative mt-1 font-display text-[12vw] leading-none tracking-[-0.01em] sm:mt-2 sm:text-7xl lg:text-8xl"
                style={{ color: "#0a5d6c" }}
              >
                {big?.unit ?? "Days"} to go
              </p>
            )}

            <Sparkle
              className="absolute bottom-[8%] left-[56%] size-4 sm:size-5"
              color="#0b1f3a"
            />
          </div>

          <CountdownHourglass className="absolute -right-2 top-[2%] z-10 w-[52%] sm:right-0 sm:top-[-4%] sm:w-[46%] lg:right-[2%] lg:top-[-2%] lg:w-[52%]" />
        </div>

        {/* Live remainder */}
        {time && !time.isPast && big?.unit.startsWith("Day") && (
          <div
            aria-hidden
            className="relative z-20 mx-auto mt-5 flex max-w-5xl flex-wrap gap-2 sm:mt-6"
          >
            {(
              [
                ["hours", "hrs"],
                ["minutes", "mins"],
                ["seconds", "secs"],
              ] as const
            ).map(([key, label]) => (
              <div
                key={key}
                className="flex items-baseline gap-1 rounded-full border border-[#006a77]/15 bg-white/70 px-3 py-1.5 backdrop-blur-sm"
              >
                <span className="font-display text-xl tabular-nums leading-none text-[#006a77] sm:text-2xl">
                  {formatTwoDigits(time[key])}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0a5d6c]/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event info strip over the navy → teal footer band, as on the posts */}
      <div className="relative mt-10 sm:mt-14">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(90deg,#00213a_0%,#004b5e_55%,#007b80_100%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-xl bg-white shadow-[0_25px_60px_-20px_rgba(0,33,58,0.45)] lg:grid-cols-[1.35fr_1fr]">
            <div>
              <div className="grid grid-cols-3 divide-x-2 divide-[#0b1f3a] px-3 py-4 text-[#0b1f3a] sm:px-6 sm:py-5">
                <div className="pr-3 sm:pr-5">
                  <p className="text-sm font-bold sm:text-lg">Sat. 28th</p>
                  <p className="text-sm sm:text-lg">Nov. 2026</p>
                </div>
                <div className="px-3 sm:px-5">
                  <p className="text-sm sm:text-lg">9am</p>
                  <p className="text-sm font-bold sm:text-lg">Prompt</p>
                </div>
                <div className="pl-3 sm:pl-5">
                  <p className="text-sm font-bold sm:text-lg">Dress Code</p>
                  <p className="text-sm sm:text-lg">Legal Techie</p>
                </div>
              </div>
              <p className="bg-[#d6e6fd] px-3 py-3 text-xs text-[#0b1f3a] sm:px-6 sm:text-sm">
                <span className="font-bold">The Zone</span> Plot 9, Gbagada
                Industrial Scheme, beside UPS, Gbagada-Oworonshoki Expressway,
                Lagos.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3 bg-[#e8f8fc] px-4 py-5 sm:px-6">
              <span className="w-fit rounded-full bg-[#96d1f1] px-3 py-1 text-xs font-semibold text-[#0b1f3a]">
                Get your tickets here:
              </span>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href={SUMMIT_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#006a77] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00525c]"
                >
                  <Ticket size={16} />
                  Grab Your Tickets
                </Link>
                <Link
                  href="/sponsors"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#0b1f3a]/25 px-5 py-3 text-sm font-semibold text-[#0b1f3a] transition-colors hover:bg-white"
                >
                  Become a Sponsor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
