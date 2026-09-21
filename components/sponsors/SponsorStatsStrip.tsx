"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/animations";
import Counter from "@/components/common/Counter";
import { sponsorStats } from "@/lib/data/sponsorship";

export default function SponsorStatsStrip() {
  return (
    <section className="bg-navy py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {sponsorStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={slideUp}
              className="flex flex-col items-center text-center"
            >
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-2 text-sm font-medium text-white/60 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
