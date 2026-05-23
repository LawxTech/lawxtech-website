"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Trophy, Users, Calendar } from "lucide-react";

type Award = {
  category: string;
  winner: string;
};

type Edition = {
  edition: string;
  year: string;
  theme: string;
  attendees: string;
  awards: Award[];
};

const pastEditions: Edition[] = [
  {
    edition: "Law x Tech Summit 2",
    year: "2024",
    theme: "Theme Placeholder",
    attendees: "Attendee count placeholder",
    awards: [
      { category: "Award Category Placeholder", winner: "Winner Placeholder" },
      { category: "Award Category Placeholder", winner: "Winner Placeholder" },
      { category: "Award Category Placeholder", winner: "Winner Placeholder" },
    ],
  },
  {
    edition: "Law x Tech Summit 1",
    year: "2023",
    theme: "Theme Placeholder",
    attendees: "Attendee count placeholder",
    awards: [
      { category: "Award Category Placeholder", winner: "Winner Placeholder" },
      { category: "Award Category Placeholder", winner: "Winner Placeholder" },
      { category: "Award Category Placeholder", winner: "Winner Placeholder" },
    ],
  },
];

export default function PastEditionsSection() {
  return (
    <section className="bg-white py-20 border-b border-border-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Looking Back
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Past Editions
          </h2>
          <p className="mt-4 text-muted-brand text-base max-w-2xl leading-relaxed">
            Two summits held, two communities built, countless connections made. Here&apos;s how we&apos;ve celebrated legal tech excellence so far.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-8"
        >
          {pastEditions.map((ed) => (
            <motion.div
              key={ed.edition}
              variants={fadeIn}
              className="border border-border-brand rounded-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Edition info */}
                <div className="lg:col-span-2 bg-navy p-8 lg:p-10">
                  <span className="text-teal text-xs font-bold uppercase tracking-widest">
                    {ed.year}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white leading-snug">
                    {ed.edition}
                  </h3>
                  <p className="mt-3 text-white/60 text-sm leading-relaxed">
                    Theme: <span className="text-white/80 italic">{ed.theme}</span>
                  </p>

                  <div className="mt-8 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <Calendar size={15} className="text-teal shrink-0" />
                      <span>{ed.year}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <Users size={15} className="text-teal shrink-0" />
                      <span>{ed.attendees}</span>
                    </div>
                  </div>
                </div>

                {/* Awards */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Trophy size={18} className="text-teal" />
                    <h4 className="text-lg font-bold text-navy">Awards</h4>
                  </div>

                  <div className="flex flex-col gap-4">
                    {ed.awards.map((award, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border-brand"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                          <span className="text-teal text-xs font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-teal uppercase tracking-wider mb-0.5">
                            {award.category}
                          </p>
                          <p className="text-navy font-semibold text-sm">{award.winner}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
