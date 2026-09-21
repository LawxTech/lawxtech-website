"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { slideUp } from "@/lib/animations";

const contactRows = [
  {
    label: "Email",
    value: "info@lawxtech.org",
    href: "mailto:info@lawxtech.org?subject=Summit Sponsorship Enquiry",
  },
  {
    label: "Phone",
    value: "+234 909 903 0433",
    href: "tel:+2349099030433",
  },
];

export default function SponsorContactSection() {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center"
        >
          <div>
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              03 — Next Steps
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Partner with us.
            </h2>
            <p className="mt-5 text-white/70 text-base leading-relaxed">
              Tell us what you want to achieve and we will put together a
              package that fits — including bespoke options that sit outside the
              tiers above.
            </p>
            <a
              href="mailto:info@lawxtech.org?subject=Summit Sponsorship Enquiry"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors text-sm"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Talk to the Team
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <dl className="space-y-5">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pb-5 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <dt className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                    {row.label}
                  </dt>
                  <dd>
                    <a
                      href={row.href}
                      className="text-white hover:text-teal text-sm font-medium transition-colors"
                    >
                      {row.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
