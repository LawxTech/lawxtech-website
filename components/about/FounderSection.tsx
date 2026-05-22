"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInLeft, scaleIn } from "@/lib/animations";

export default function FounderSection() {
  return (
    <section className="bg-surface py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="text-teal text-xs font-semibold uppercase tracking-widest">
              Meet the Founder
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Sopuruchi Rufus
            </h2>
            <p className="mt-1 text-muted-brand font-medium">
              Founder & Project Coordinator
            </p>

            <div className="mt-8 space-y-4">
              <p className="text-[#374151] text-sm leading-relaxed">
                Meet Sopuruchi Rufus, the driving force behind Law x Tech. With
                a dynamic blend of legal expertise and technological innovation
                — and being a product manager herself — she has set the course
                for our organisation&apos;s exceptional journey.
              </p>
              <p className="text-[#374151] text-sm leading-relaxed">
                In a world increasingly shaped by technology, Sopuruchi
                recognised the transformative power of innovation early on. Her
                passion for technology and its potential to revolutionise the
                legal industry has driven Law x Tech to the forefront of the
                legal-tech space in Nigeria.
              </p>
              <p className="text-[#374151] text-sm leading-relaxed">
                Her dedication to merging the worlds of law and technology has
                empowered Law x Tech to provide opportunities for legal
                professionals to acquire tech skills and build meaningful
                careers at the intersection of both fields.
              </p>
            </div>

            <blockquote className="mt-8 border-l-4 border-teal pl-5 italic text-teal text-base font-medium leading-relaxed">
              &ldquo;The legal profession is not immune to technology — it is
              transformed by it. Law x Tech exists to make sure Nigerian lawyers
              lead that transformation.&rdquo;
            </blockquote>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden max-w-md mx-auto">
              <Image
                src="/images/sopuruchi.jpeg"
                alt="Sopuruchi Rufus, Founder of Law x Tech"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-navy/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
