"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog } from "@base-ui/react/dialog";
import { fadeIn, slideInLeft } from "@/lib/animations";
import { CalendarDays, MapPin, Mail, Maximize2, X } from "lucide-react";
import { SUMMIT_DATE_LABEL, SUMMIT_TIME_LABEL } from "@/lib/constants";
import Countdown from "./Countdown";

const FLYER_SRC = "/assets/events/summit-awards-2026-flyer.jpeg";
const FLYER_ALT =
  "Law x Tech Summit & Awards 2026 flyer: Spotlighting Nigerian Legal Technology. 28 November 2026, 9am at The Zone, Plot 9, Gbagada Industrial Scheme, beside UPS, Gbagada-Oworonshoki Expressway, Lagos.";

const details = [
  { label: "Format", value: "In-person + Virtual" },
  { label: "Includes", value: "Keynotes, Panels & Awards" },
];

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
            New Edition
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
                  Save the Date
                </span>
                {/* <span className="text-white/50 text-sm">Law x Tech Summit 3</span> */}
              </div>

              <h3 className="text-3xl sm:text-[32px] font-bold text-white leading-tight mb-4">
                The Law x Tech Summit & Awards
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Africa&apos;s premier gathering for lawyers and technologists
                returns on {SUMMIT_DATE_LABEL}. Join us in Lagos for keynotes,
                panels, and the industry&apos;s biggest awards night.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <CalendarDays size={16} className="text-teal shrink-0" />
                  <span>
                    {SUMMIT_DATE_LABEL} · {SUMMIT_TIME_LABEL}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin size={16} className="text-teal shrink-0" />
                  <span>The Zone, Lagos</span>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      {d.label}
                    </dt>
                    <dd className="text-white font-semibold text-sm">
                      {d.value}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    Enquiries
                  </dt>
                  <dd>
                    <a
                      href="mailto:info@lawxtech.org"
                      className="text-teal hover:text-white transition-colors font-semibold text-sm"
                    >
                      info@lawxtech.org
                    </a>
                  </dd>
                </div>
              </dl>

              <a
                href="https://luma.com/ftzpb2ki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors duration-200 text-sm"
              >
                <Mail size={16} />
                Express Interest
              </a>
            </div>

            <div className="lg:col-span-2 bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 lg:p-10 flex items-center justify-center">
              <Dialog.Root>
                <Dialog.Trigger
                  aria-label="View the summit flyer full size"
                  className="group relative block w-full max-w-sm cursor-zoom-in rounded-xl overflow-hidden shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <Image
                    src={FLYER_SRC}
                    alt={FLYER_ALT}
                    width={1024}
                    height={1280}
                    sizes="(min-width: 640px) 384px, 90vw"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <Maximize2 size={12} />
                    View full size
                  </span>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/80 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
                  <Dialog.Popup className="fixed left-1/2 top-1/2 z-[100] w-[min(92vw,70vh)] -translate-x-1/2 -translate-y-1/2 outline-none transition-all duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
                    <Dialog.Title className="sr-only">
                      Law x Tech Summit & Awards 2026 flyer
                    </Dialog.Title>
                    <Image
                      src={FLYER_SRC}
                      alt={FLYER_ALT}
                      width={1024}
                      height={1280}
                      sizes="(min-width: 768px) 70vh, 92vw"
                      className="w-full h-auto rounded-xl"
                    />
                    <Dialog.Close
                      aria-label="Close flyer"
                      className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-navy shadow-lg hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    >
                      <X size={18} />
                    </Dialog.Close>
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>

          <div className="border-t border-white/10 px-10 py-10 lg:px-14 lg:py-12">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-6 text-center">
              Counting Down To The Summit
            </p>
            <Countdown />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
