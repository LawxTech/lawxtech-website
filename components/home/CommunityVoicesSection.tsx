"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "I found this community immensely helpful for staying tech-savvy and learning how technology intersects with my legal practice.",
    name: "Favour Williams",
    role: "Legal Associate",
  },
  {
    quote:
      "A must-join community for lawyers. The series offer invaluable insights and practical advice on navigating the tech landscape.",
    name: "Jane Smith",
    role: "Law Student",
  },
  {
    quote:
      "Law x Tech has transformed how I think about my career. The mentorship sessions alone are worth the community membership.",
    name: "Mike Johnson",
    role: "Corporate Lawyer",
  },
  {
    quote:
      "An essential resource for legal professionals. The guidance and continuous learning opportunities are unmatched in Nigeria.",
    name: "Sarah Thompson",
    role: "Legal Tech Enthusiast",
  },
  {
    quote:
      "This community is a game-changer. The workshops enhanced my tech journey and gave me the confidence to transition into legal tech.",
    name: "Alex Ramirez",
    role: "Legal Consultant",
  },
  {
    quote:
      "If you're passionate about the future of law, this community is a treasure trove of knowledge and connections.",
    name: "Emily Wilson",
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
