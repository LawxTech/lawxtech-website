"use client";

import { motion } from "framer-motion";
import { fadeIn, slideInLeft } from "@/lib/animations";
import { CalendarDays, MapPin, Mail } from "lucide-react";

export default function UpcomingSummitSection() {
  return (
    <section className="bg-surface py-20 border-b border-border-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Next Edition
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            What&apos;s Coming
          </h2>
        </motion.div>

        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-navy rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-teal text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
                <span className="text-white/50 text-sm">Law x Tech Summit 3</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                The Law x Tech Summit
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                The third edition of Africa&apos;s premier gathering for lawyers and technologists is being planned. Stay close — we&apos;ll announce the date, theme, speakers, and award categories soon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <CalendarDays size={16} className="text-teal shrink-0" />
                  <span>Date to be announced</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin size={16} className="text-teal shrink-0" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>

              <a
                href="mailto:info@lawxtech.org?subject=Law x Tech Summit 3 — Expression of Interest"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors duration-200 text-sm"
              >
                <Mail size={16} />
                Express Interest
              </a>
            </div>

            <div className="lg:col-span-2 bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-10 lg:p-14 flex flex-col justify-center gap-6">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Format</p>
                <p className="text-white font-semibold">In-person + Virtual</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Includes</p>
                <p className="text-white font-semibold">Keynotes, Panels & Awards</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Enquiries</p>
                <a
                  href="mailto:info@lawxtech.org"
                  className="text-teal hover:text-white transition-colors font-semibold text-sm"
                >
                  info@lawxtech.org
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
