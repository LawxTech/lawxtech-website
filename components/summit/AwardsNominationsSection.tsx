/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, slideInLeft, slideInRight } from "@/lib/animations";
import { ArrowUpRight, CalendarClock, MapPin, Trophy } from "lucide-react";
import { getTimeRemaining } from "@/lib/countdown";
import {
  AWARDS_NOMINATION_DEADLINE,
  AWARDS_NOMINATION_DEADLINE_LABEL,
  AWARDS_NOMINATION_URL,
} from "@/lib/constants";

const details = [
  {
    icon: CalendarClock,
    label: "Nominations close",
    value: AWARDS_NOMINATION_DEADLINE_LABEL,
  },
  { icon: Trophy, label: "Awards ceremony", value: "28 November 2026" },
  { icon: MapPin, label: "Venue", value: "The Zone, Gbagada, Lagos" },
];

export default function AwardsNominationsSection() {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    setClosed(getTimeRemaining(AWARDS_NOMINATION_DEADLINE).isPast);
  }, []);

  return (
    <section
      id="nominations"
      className="bg-white py-20 border-b border-border-brand scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Awards & Honours 2026
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            {closed ? "Nominations Are Closed" : "Nominations Are Now Open"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 flex flex-col items-center gap-4"
          >
            {!closed && (
              <span className="order-2 lg:order-1 inline-flex items-center px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full uppercase tracking-wider">
                Nominations are free
              </span>
            )}
            <Image
              src="/assets/summit/summit-awards-2026-nominations-open.jpeg"
              alt={`Law x Tech Awards & Honours 2026 flyer: nominations are now open. Nominate a trailblazer, celebrate an innovator, honour an impact maker. Deadline ${AWARDS_NOMINATION_DEADLINE_LABEL}.`}
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 384px, 90vw"
              className="order-1 lg:order-2 w-full max-w-sm h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3"
          >
            <p className="text-muted-brand text-base leading-relaxed">
              We&apos;re celebrating outstanding individuals, startups, products
              and communities driving innovation at the intersection of law and
              technology.
            </p>
            <p className="mt-4 text-muted-brand text-base leading-relaxed">
              Know someone deserving of recognition? Or have you been doing
              incredible work yourself?
            </p>
            <p className="mt-6 text-navy text-xl sm:text-2xl font-bold leading-snug">
              Nominate them. Nominate yourself.{" "}
              <span className="text-teal">Let their work be seen.</span>
            </p>

            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border-brand bg-surface p-4"
                >
                  <Icon size={18} className="text-teal mb-2" />
                  <dt className="text-muted-brand text-xs uppercase tracking-widest mb-1">
                    {label}
                  </dt>
                  <dd className="text-navy font-semibold text-sm">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              {closed ? (
                <p className="text-muted-brand text-sm">
                  Nominations closed on {AWARDS_NOMINATION_DEADLINE_LABEL}. See
                  you at the ceremony!
                </p>
              ) : (
                <a
                  href={AWARDS_NOMINATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors duration-200 text-sm"
                >
                  Submit a Nomination <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
