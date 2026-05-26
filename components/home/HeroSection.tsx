"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden -mt-16">
      {/* Background image */}
      <Image
        src="/images/hero-image.jpg"
        alt="Law x Tech community"
        fill
        sizes="100vw"
        className="object-cover object-center "
        priority
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-[#030d1a] via-[#030d1a]/60 to-[#030d1a]/10" />
      <div className="absolute inset-0 bg-linear-to-r from-[#030d1a]/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-20 lg:pb-28 pt-32">
        {/* <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 bg-white/5 backdrop-blur-sm text-white/80 text-xs font-semibold rounded-full tracking-widest uppercase mb-6"
        >
          Nigeria&apos;s Legal Tech Community
        </motion.span> */}

        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl"
        >
          Africa&apos;s Home for <br className="hidden sm:block" />
          Law &amp; <span className="text-teal">Technology</span>
        </motion.h1>

        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base sm:text-[17px] text-white/80 leading-relaxed max-w-xl"
        >
          Are you a lawyer looking to embrace the dynamic world of technology?
          Law x Tech is your gateway to a thriving career at the intersection of
          law and technology.
        </motion.p>

        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="https://forms.gle/P9jUJr3NaAGnS4Je6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors duration-200"
          >
            Join Our Community
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/series"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
          >
            Watch the Series
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
