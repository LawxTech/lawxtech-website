"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { CalendarDays, GraduationCap, Megaphone } from "lucide-react";

const services = [
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Industry Relevant Events",
    description:
      "Law x Tech designs and produces high-impact legal tech events across Africa, from Nigeria's flagship Law x Tech Summit & Awards to intimate networking sessions and virtual webinars. We bring together lawyers, founders, regulators, and technologists in spaces that spark conversations, build careers, and shape the future of law on the continent.",
    tags: [
      "Conferences",
      "Awards Ceremonies",
      "Networking Events",
      "Virtual Webinars",
    ],
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Corporate Training",
    description:
      "We deliver practical, engaging legal tech training for law firms, corporate legal departments, and lawyers in financial institutions and professional bodies. From AI in legal practice to product thinking for lawyers, our programmes are designed to upskill legal professionals for the demands of a technology-driven industry.",
    tags: [
      "In-house Training",
      "Cohort Programmes",
      "Workshops",
      "Custom Curricula",
    ],
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Brand Marketing",
    description:
      "Law x Tech connects brands with Africa's most engaged legal tech audience. Through sponsorships, event partnerships, content collaborations, and spotlight features, we help organisations build visibility and credibility within the legal technology ecosystem across Nigeria and the continent.",
    tags: [
      "Sponsorships",
      "Content Partnerships",
      "Brand Spotlights",
      "Community Campaigns",
    ],
  },
];

export default function WhatWeDoSection() {
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
            What We Offer
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Our Services
          </h2>
          <p className="mt-4 text-muted-brand max-w-2xl mx-auto text-base leading-relaxed">
            From flagship events to corporate training and brand partnerships,
            Law x Tech is building Africa&apos;s legal tech ecosystem one
            programme at a time.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              className="group relative rounded-2xl"
            >
              {/* Spinning border */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div
                  className="absolute left-1/2 top-1/2 w-[200%] aspect-square"
                  style={{
                    transform: "translate(-50%, -50%)",
                    background:
                      "conic-gradient(from 0deg, transparent 0%, #0D7377 12%, transparent 24%)",
                    animation: "border-spin 2s linear infinite",
                  }}
                />
              </div>

              {/* Inner white surface (creates border thickness) */}
              <div className="absolute inset-[1.5px] rounded-[calc(1rem-1.5px)] bg-white pointer-events-none" />

              {/* Static border shown when not hovered */}
              <div className="absolute inset-0 rounded-2xl border border-border-brand group-hover:border-transparent transition-colors duration-300 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-5 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-brand text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-teal bg-teal/8 px-3 py-1 rounded-full border border-teal/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
