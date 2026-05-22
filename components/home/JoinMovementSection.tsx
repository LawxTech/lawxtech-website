"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";

export default function JoinMovementSection() {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Ready to be part of
              <br />
              the future{" "}
              <span className="text-teal">of law?</span>
            </h2>
            <p className="mt-5 text-white/70 text-base leading-relaxed max-w-md">
              Join a growing community of lawyers and tech enthusiasts shaping
              the future of legal practice in Nigeria and beyond.
            </p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row gap-4 lg:justify-end"
          >
            <Link
              href="https://forms.gle/P9jUJr3NaAGnS4Je6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors duration-200"
            >
              Join Community
            </Link>
            <Link
              href="https://forms.gle/Uba4R8QKKeiufVUj6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Volunteer With Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
