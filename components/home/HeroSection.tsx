"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp, scaleIn, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={slideUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f0faf9] border border-[#02807e]/20 text-[#02807e] text-xs font-semibold rounded-full tracking-wide uppercase mb-6">
                Nigeria&apos;s Legal Tech Community
              </span>
            </motion.div>

            <motion.h1
              variants={slideUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#113167] leading-[1.1] tracking-tight"
            >
              Where Law
              <br />
              Meets{" "}
              <span className="text-[#02807e]">Technology</span>
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="mt-6 text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-lg"
            >
              Are you a lawyer looking to embrace the dynamic world of
              technology? Law x Tech is your gateway to a thriving career at
              the intersection of law and technology.
            </motion.p>

            <motion.div
              variants={slideUp}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="https://forms.gle/P9jUJr3NaAGnS4Je6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#02807e] text-white font-semibold rounded-lg hover:bg-[#026e6c] transition-colors duration-200"
              >
                Join Our Community
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/series"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#e4e8ef] text-[#113167] font-semibold rounded-lg hover:border-[#113167] transition-colors duration-200"
              >
                Watch the Series
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/landing-image.jpg"
                alt="Law x Tech community"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#113167]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-[#02807e] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">12+</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Series Completed</p>
                    <p className="text-white/70 text-xs">Across law & technology topics</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#02807e]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#113167]/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
