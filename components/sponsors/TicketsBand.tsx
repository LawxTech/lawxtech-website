"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { slideUp } from "@/lib/animations";
import {
  SUMMIT_DATE_LABEL,
  SUMMIT_TICKETS_URL,
  SUMMIT_TIME_LABEL,
} from "@/lib/constants";

export default function TicketsBand() {
  return (
    <section className="bg-surface py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-border-brand p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-xl">
            <h2 className="text-xl font-bold text-navy">
              Booking seats or a group table?
            </h2>
            <p className="mt-3 text-muted-brand text-sm leading-relaxed">
              Individual seats and group tables for the Law x Tech Summit &amp;
              Awards are handled on tix.africa. Sponsorship packages include
              reserved seating — talk to us first if you are considering a
              partnership.
            </p>
            <p className="mt-3 text-muted-brand text-sm">
              {SUMMIT_DATE_LABEL} · {SUMMIT_TIME_LABEL} · The Zone, Lagos
            </p>
          </div>
          <Link
            href={SUMMIT_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors text-sm shrink-0"
          >
            Get Tickets
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
