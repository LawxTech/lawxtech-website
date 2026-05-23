"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight, slideUp } from "@/lib/animations";

const milestones = [
  {
    year: "2023",
    title: "Law x Tech Is Born",
    description:
      "Founded by Sopuruchi Rufus to pioneer a new work model that helps legal professionals find more flexibility and connect the legal spectrum to technology.",
  },
  {
    year: "2023",
    title: "First Series Launch",
    description:
      "We recognised that Nigerian law faculties do not equip students with knowledge of technology. We took responsibility to arm the next generation of legal professionals with the tools they need to thrive.",
  },
  {
    year: "2023",
    title: "Community Grows to 300+",
    description:
      "From a small gathering of curious legal minds to a thriving community of 300+ members: lawyers, law students, and tech professionals all working at the intersection.",
  },
  {
    year: "2024",
    title: "Mini Series Introduced",
    description:
      "Launched the Mini Series format for bite-sized, focused sessions on niche topics at the law-tech intersection, making learning more accessible for busy professionals.",
  },
  {
    year: "2025",
    title: "12+ Major Series Completed",
    description:
      "Reached a landmark of 12 major series and 12 mini series, cementing Law x Tech as Nigeria's leading legal tech community platform.",
  },
];

export default function OurStoryTimeline() {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Our Journey
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            How We Got Here
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-brand hidden lg:block" />

          <div className="space-y-12">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center"
                >
                  <motion.div
                    variants={isLeft ? slideInLeft : slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className={`bg-surface rounded-2xl p-8 border border-border-brand ${
                      isLeft ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <h3 className="text-lg font-bold text-navy mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-brand text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={isLeft ? slideInRight : slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className={`flex order-first ${
                      isLeft
                        ? "lg:order-2 lg:justify-start"
                        : "lg:order-1 lg:justify-end"
                    } items-center`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">
                          {milestone.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
