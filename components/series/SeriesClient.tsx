"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

const mainSeries = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/assets/series/LxT Series ${i + 1}.jpeg`,
  title: `Law x Tech Series ${i + 1}`,
  href: undefined as string | undefined,
}));

const miniSeries = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/assets/series/Mini Series ${i + 1}.jpeg`,
  title: `Mini Series ${i + 1}`,
  href: undefined as string | undefined,
}));

miniSeries[5].title = "Lawexa";
miniSeries[5].href =
  "https://www.linkedin.com/video/event/urn:li:ugcPost:7481685800481431552";

miniSeries[6].title = "Case Rader";
miniSeries[6].href =
  "https://www.linkedin.com/video/event/urn:li:ugcPost:7488884253838106626";

miniSeries[7].href =
  "https://www.linkedin.com/video/event/urn:li:ugcPost:7492835892722659328";

// const WEBINAR_REMINDER_URL =
//   "https://www.linkedin.com/video/event/urn:li:ugcPost:7492835892722659328";

type TabKey = "main" | "mini";

export default function SeriesClient() {
  const [active, setActive] = useState<TabKey>("main");
  const items = active === "main" ? mainSeries : miniSeries;

  return (
    <div>
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="flex justify-center mb-12"
      >
        <div className="relative flex bg-surface rounded-full p-1 border border-border-brand">
          {(["main", "mini"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 z-10 ${
                active === tab
                  ? "text-white"
                  : "text-muted-brand hover:text-navy"
              }`}
            >
              {active === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-navy rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              {tab === "main" ? "Law x Tech Series" : "Mini Series"}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={staggerContainer(0.07)}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => {
            const CardTag: React.ElementType = item.href ? "a" : "div";
            const cardProps = item.href
              ? {
                  href: item.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <motion.div
                key={item.id}
                variants={scaleIn}
                className="group relative rounded-2xl overflow-hidden border border-border-brand bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <CardTag
                  {...cardProps}
                  className={`relative block h-106 overflow-hidden ${
                    item.href ? "cursor-pointer" : ""
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div>
                      <span className="text-teal text-xs font-semibold uppercase tracking-widest">
                        Episode {String(item.id).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-bold text-white text-base">
                        {item.title}
                      </h3>
                    </div>
                    {item.href && (
                      <ArrowUpRight
                        size={20}
                        className="text-white shrink-0 mb-1"
                      />
                    )}
                  </div>
                </CardTag>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* {active === "mini" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 w-full rounded-2xl border border-border-brand bg-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            {/* <span className="text-teal text-xs font-semibold uppercase tracking-widest">
              Up Next
            </span> */}
            <h3 className="mt-1 font-bold text-navy text-lg">
              From Law2Tech Conversations
            </h3>
            <p className="mt-1 text-muted-brand text-sm">
              Join us live on LinkedIn. Set a reminder so you don&apos;t miss
              it.
            </p>
          </div>
          <a
            href={WEBINAR_REMINDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors text-sm shrink-0"
          >
            Set a Reminder <ArrowUpRight size={16} />
          </a>
        </motion.div>
      )} */}
    </div>
  );
}
