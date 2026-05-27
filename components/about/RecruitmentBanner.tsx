"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp } from "@/lib/animations";

const APPLICATION_LINK = "https://surveymars.com/q/y2hFxhumV";

export default function RecruitmentBanner() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Join The Team
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            We Are Recruiting
          </h2>
          <p className="mt-4 text-muted-brand max-w-xl mx-auto text-base">
            Law x Tech is recruiting 4 sharp, driven volunteers to help build
            Africa&apos;s home for law and technology.
          </p>
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col lg:flex-row gap-10 items-center"
        >
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-lg border border-border-brand">
            <Image
              src="/images/recruiting.jpg"
              alt="Law x Tech is Recruiting — Graphics & Creative Lead, Communications & Social Media Lead, Partnerships & Outreach Lead, Projects Coordinator"
              width={800}
              height={960}
              className="w-full h-auto"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-4">
              {[
                "Graphics & Creative Lead",
                "Communications & Social Media Lead",
                "Partnerships & Outreach Lead",
                "Projects Coordinator",
              ].map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-border-brand"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-teal shrink-0" />
                  <span className="text-navy font-semibold text-sm">
                    {role}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-muted-brand text-sm leading-relaxed">
              Are you built for this? We&apos;re looking for people who are
              passionate about the intersection of law and technology and want
              to help shape Africa&apos;s legal tech future.
            </p>

            <Link
              href={APPLICATION_LINK}
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-teal transition-colors duration-300"
            >
              Apply Now
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
