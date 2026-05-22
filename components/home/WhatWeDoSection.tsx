"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { BookOpen, Presentation, Users, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Learning Resources",
    description:
      "Curated resources, articles, and guides to help you grow your knowledge at the intersection of law and technology.",
  },
  {
    icon: <Presentation className="w-6 h-6" />,
    title: "Workshops & Webinars",
    description:
      "Expert-led sessions on legal tech, product management, and tech careers designed specifically for legal professionals.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Mentorship Sessions",
    description:
      "Connect with experienced professionals navigating the law-tech space for personalised guidance and career advice.",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Internship Opportunities",
    description:
      "Access exclusive internship and volunteer opportunities to gain real-world experience in legal technology.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="bg-surface py-24">
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
            Why Join Our Community?
          </h2>
          <p className="mt-4 text-muted-brand max-w-2xl mx-auto text-base leading-relaxed">
            Law x Tech equips legal professionals with the tools, network, and
            knowledge to thrive in the new digital economy.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={scaleIn}
              className="group bg-white rounded-2xl p-8 border border-border-brand hover:border-teal/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-5 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-brand text-sm leading-relaxed">
                {benefit.description}
              </p>
              <div className="mt-5 h-0.5 w-0 bg-teal group-hover:w-full transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
