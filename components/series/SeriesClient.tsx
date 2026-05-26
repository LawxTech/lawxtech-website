"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { slideUp, staggerContainer, scaleIn, tabContent } from "@/lib/animations";

const mainSeries = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/assets/series/LxT Series ${i + 1}.jpeg`,
  title: `Law x Tech Series ${i + 1}`,
}));

const miniSeries = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  src: `/assets/series/Mini Series ${i + 1}.jpeg`,
  title: `Mini Series ${i + 1}`,
}));

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
                active === tab ? "text-white" : "text-muted-brand hover:text-navy"
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
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              className="group relative rounded-2xl overflow-hidden border border-border-brand bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-teal text-xs font-semibold uppercase tracking-widest">
                  Episode {String(item.id).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-bold text-navy text-base">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
