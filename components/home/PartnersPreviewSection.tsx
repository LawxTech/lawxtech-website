"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { partners } from "@/lib/data/partners";
import PartnerCard from "@/components/partners/PartnerCard";

export default function PartnersPreviewSection() {
  const featured = partners.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="bg-surface py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              Our Partners
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Building the Future, Together
            </h2>
          </div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Partners <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((partner) => (
            <motion.div key={partner.slug} variants={scaleIn}>
              <PartnerCard partner={partner} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
