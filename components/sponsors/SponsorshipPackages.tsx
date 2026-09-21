"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { sponsorTiers } from "@/lib/data/sponsorship";

const SPONSOR_EMAIL = "info@lawxtech.org";

export default function SponsorshipPackages() {
  return (
    <section id="packages" className="bg-white py-12 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            02 — The Packages
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Sponsorship Packages
          </h2>
          <p className="mt-4 text-muted-brand max-w-2xl mx-auto text-base leading-relaxed">
            Six tiers from Headline to Community Partner — each with pre-summit,
            summit-day and post-summit benefits.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {sponsorTiers.map((tier) => (
            <motion.div
              key={tier.slug}
              variants={scaleIn}
              className={`bg-white rounded-2xl border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all duration-300 p-8 flex flex-col h-full ${
                tier.featured ? "ring-1 ring-teal/30" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-navy">{tier.name}</h3>
                <span className="text-teal font-bold text-base whitespace-nowrap">
                  {tier.price}
                </span>
              </div>

              <p className="mt-2 text-muted-brand text-sm leading-relaxed">
                {tier.tagline}
              </p>

              {tier.featured && (
                <span className="mt-4 self-start text-xs font-medium text-teal bg-teal/8 px-3 py-1 rounded-full border border-teal/15">
                  Lead partner
                </span>
              )}

              <div className="mt-5 pt-5 border-t border-border-brand space-y-6 flex-1">
                {tier.groups.map((group) => (
                  <div key={group.label}>
                    <span className="text-teal text-xs font-semibold uppercase tracking-widest">
                      {group.label}
                    </span>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            aria-hidden="true"
                            className="w-4 h-4 text-teal shrink-0 mt-0.5"
                          />
                          <span className="text-muted-brand text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <a
                  href={`mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent(
                    `Sponsorship Enquiry — ${tier.name}`,
                  )}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 border border-teal/30 text-teal font-semibold rounded-lg hover:bg-teal hover:text-white hover:border-teal transition-colors text-sm"
                >
                  Request Full Details
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 text-center text-muted-brand text-sm"
        >
          Bespoke packages are available on request.
        </motion.p>
      </div>
    </section>
  );
}
