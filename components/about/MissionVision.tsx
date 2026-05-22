"use client";

import { motion } from "framer-motion";
import { staggerContainer, slideUp } from "@/lib/animations";

export default function MissionVision() {
  return (
    <section className="bg-[#f8f9fb] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <motion.div
            variants={slideUp}
            className="bg-white rounded-2xl p-10 border border-[#e4e8ef] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#02807e] rounded-t-2xl" />
            <span className="text-[#02807e] text-xs font-semibold uppercase tracking-widest">
              Our Mission
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#113167] tracking-tight">
              What We Set Out to Do
            </h2>
            <p className="mt-5 text-[#6b7280] leading-relaxed text-sm">
              At LawxTech, our mission is to bridge the gap between the worlds
              of law and technology, providing a dynamic platform where lawyers
              and law students can explore, learn, and thrive in the
              ever-evolving landscape of legal tech. Through insightful
              sessions, expert guidance, and collaborative networking, we
              empower our participants to embrace innovation, cultivate
              expertise, and pioneer positive change at the intersection of law
              and technology.
            </p>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="bg-white rounded-2xl p-10 border border-[#e4e8ef] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#113167] rounded-t-2xl" />
            <span className="text-[#113167] text-xs font-semibold uppercase tracking-widest">
              Our Vision
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#113167] tracking-tight">
              Where We Are Headed
            </h2>
            <p className="mt-5 text-[#6b7280] leading-relaxed text-sm">
              Our vision is to pioneer a transformed legal profession by
              empowering legal minds with the skills to navigate technology. We
              envision tech-savvy lawyers who integrate innovation and drive
              impact, shaping a collaborative future in law and tech — whether
              rooted in law or aspiring to transition to tech — with LawxTech
              series as the catalyst.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
