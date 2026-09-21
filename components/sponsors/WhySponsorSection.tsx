"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { sponsorReasons } from "@/lib/data/sponsorship";

export default function WhySponsorSection() {
  return (
    <section className="bg-surface py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            01 — The Opportunity
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Why sponsor the Summit?
          </h2>
          <p className="mt-4 text-muted-brand max-w-2xl mx-auto text-base leading-relaxed">
            The Law x Tech Summit &amp; Awards is where Africa&apos;s legal and
            technology communities meet — a platform for thought leadership,
            brand visibility and the relationships that move the ecosystem
            forward.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sponsorReasons.map((reason, index) => (
            <motion.div
              key={reason}
              variants={scaleIn}
              className="bg-white rounded-2xl border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all duration-300 p-8"
            >
              <span
                aria-hidden="true"
                className="block text-3xl font-bold text-teal/30 tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-navy text-base leading-relaxed">
                {reason}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
