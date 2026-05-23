"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInLeft, scaleIn } from "@/lib/animations";

export default function AboutHero() {
  return (
    <section className="min-h-[60vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      <div className="bg-navy flex items-center px-8 sm:px-12 lg:px-16 py-20">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="max-w-lg"
        >
          <span className="inline-block text-teal text-sm font-semibold uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Pioneering the Future of{" "}
            <span className="text-teal">Legal Practice</span>
          </h1>
          <p className="mt-6 text-white/70 text-base leading-relaxed">
            Law x Tech launched in 2023 to bridge the gap between the legal
            profession and the technology industry, equipping Nigeria&apos;s
            next generation of lawyers with the tools to thrive in the digital
            economy.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="relative min-h-[40vh] lg:min-h-full"
      >
        <Image
          src="/images/about-us-landing-image.jpeg"
          alt="About Law x Tech"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/20" />
      </motion.div>
    </section>
  );
}
