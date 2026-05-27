"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp } from "@/lib/animations";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who is Law x Tech for?",
    a: "Law x Tech is for lawyers, law students, and legal professionals who want to understand technology and build careers at the intersection of law and tech. It's also for tech professionals interested in the legal industry.",
  },
  {
    q: "How do I join the community?",
    a: "Click the 'Join Community' button on our website to fill out our registration form. Once submitted, you'll receive an invitation to our WhatsApp community where all the action happens.",
  },
  {
    q: "Are the series sessions free?",
    a: "Yes, all Law x Tech Series and Mini Series sessions are free for community members. Simply join the community and you'll have access to all upcoming and past sessions.",
  },
  {
    q: "How can I speak at a series?",
    a: "We're always looking for knowledgeable speakers! If you're a legal tech professional, lawyer working in tech, or tech expert with insights relevant to the legal profession, apply through our Speaker Application form.",
  },
  {
    q: "How can I volunteer with Law x Tech?",
    a: "We welcome volunteers across design, content creation, community management, marketing, and more. Apply via our Volunteer Application form and a team member will reach out to you.",
  },
  {
    q: "Where are you based?",
    a: "Law x Tech is based in Lagos, Nigeria, but our community and sessions are fully online, open to legal professionals across Nigeria and Africa.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-brand text-base">
            Can&apos;t find what you&apos;re looking for? Reach out to us
            directly.
          </p>
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl transition-colors duration-200 ${
                open === i ? "border-teal/40" : "border-border-brand"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-navy text-sm pr-4">
                  {faq.q}
                </span>
                <span className="shrink-0 text-teal">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-neutral-800 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
