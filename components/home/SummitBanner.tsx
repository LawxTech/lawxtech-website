"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  slideUp,
} from "@/lib/animations";

export default function SummitBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0b6164" }}
    >
      {/* Decorative animated rings */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 translate-x-1/4"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
      >
        {/* Outer ring — slow breathe */}
        <motion.circle
          cx="300"
          cy="300"
          r="300"
          stroke="white"
          strokeWidth="1"
          animate={{ opacity: [0.06, 0.13, 0.06], scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "300px 300px" }}
        />
        {/* Middle ring — dashed, slow rotation */}
        <motion.circle
          cx="300"
          cy="300"
          r="230"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="18 10"
          animate={{ opacity: [0.08, 0.16, 0.08], rotate: 360 }}
          transition={{
            opacity: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
            rotate: { duration: 22, repeat: Infinity, ease: "linear" },
          }}
          style={{ transformOrigin: "300px 300px" }}
        />
        {/* Inner ring — faster breathe, offset phase */}
        <motion.circle
          cx="300"
          cy="300"
          r="160"
          stroke="white"
          strokeWidth="1"
          animate={{ opacity: [0.12, 0.05, 0.12], scale: [1, 1.05, 1] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ transformOrigin: "300px 300px" }}
        />
      </svg>

      {/* Subtle left-edge gradient for depth */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
        style={{
          background:
            "linear-gradient(to right, rgba(11,97,100,0.6) 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-2xl"
        >
          {/* Label */}
          <motion.span
            variants={slideUp}
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4"
          >
            Coming 2026
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={slideInLeft}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
            // style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Law x Tech Summit & Awards 2026
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="mt-3 text-white/80 text-base font-medium"
          >
            The Annual Convergence of Law and Technology in Africa
          </motion.p>

          {/* Meta */}
          <motion.p
            variants={slideUp}
            className="mt-2 text-white/50 text-sm flex flex-wrap items-center gap-x-2"
          >
            <span>Lagos, Nigeria</span>
            <span className="opacity-40">·</span>
            <span>October / November 2026</span>
            <span className="opacity-40">·</span>
            <span>Hybrid — Physical + Livestream</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideInRight}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="https://luma.com/ftzpb2ki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/80 transition-colors duration-200"
            >
              Register Interest
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-white/40 text-white text-sm font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-200"
            >
              Become a Sponsor
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
