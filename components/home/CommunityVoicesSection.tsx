"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "This community helped me understand how technology fits into legal practice. The sessions are clear and very practical.",
    name: "Adaeze Okonkwo",
    role: "Legal Associate",
  },
  {
    quote:
      "As a law student, Law x Tech opened my eyes to career paths I never knew existed. I am grateful for every session.",
    name: "Emeka Nwachukwu",
    role: "Law Student",
  },
  {
    quote:
      "The series changed how I see my career. I now know how to use technology to work smarter as a lawyer.",
    name: "Babatunde Adeyemi",
    role: "Corporate Lawyer",
  },
  {
    quote:
      "Law x Tech is the best thing to happen to legal professionals in Nigeria. The learning never stops here.",
    name: "Ngozi Eze",
    role: "Legal Tech Enthusiast",
  },
  {
    quote:
      "I joined not knowing much about tech. Today I consult on legal tech projects. This community made that possible.",
    name: "Amina Suleiman",
    role: "Legal Consultant",
  },
  {
    quote:
      "If you are a lawyer who wants to stay relevant, join this community. The knowledge and network here are priceless.",
    name: "Chioma Obi",
    role: "Barrister & Solicitor",
  },
];

export default function CommunityVoicesSection() {
  return (
    <section className="bg-surface py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Community Voices
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            What Our Members Say
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-white rounded-2xl p-8 border border-border-brand hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <span className="text-5xl font-serif text-teal leading-none mb-4 select-none">
                &ldquo;
              </span>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="mt-6 pt-5 border-t border-border-brand">
                <p className="font-bold text-navy text-sm">{t.name}</p>
                <p className="text-muted-brand text-xs mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
