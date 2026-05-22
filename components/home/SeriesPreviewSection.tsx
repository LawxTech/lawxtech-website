"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, scaleIn, slideUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

const featured = [
  {
    src: "/assets/series/LxT Series 1.jpeg",
    title: "LawXTech Series 1",
    number: "01",
  },
  {
    src: "/assets/series/LxT Series 2.jpeg",
    title: "LawXTech Series 2",
    number: "02",
  },
  {
    src: "/assets/series/LxT Series 3.jpeg",
    title: "LawXTech Series 3",
    number: "03",
  },
];

export default function SeriesPreviewSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-teal text-sm font-semibold uppercase tracking-widest">
              The Series
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Featured Episodes
            </h2>
          </div>
          <Link
            href="/series"
            className="inline-flex items-center gap-2 text-teal font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Series <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4"
        >
          <motion.div
            variants={scaleIn}
            className="lg:col-span-3 relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={featured[0].src}
              alt={featured[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-teal font-bold text-xs uppercase tracking-widest">
                Episode {featured[0].number}
              </span>
              <h3 className="text-white font-bold text-xl mt-1">
                {featured[0].title}
              </h3>
            </div>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {featured.slice(1).map((item) => (
              <motion.div
                key={item.number}
                variants={scaleIn}
                className="relative aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer flex-1"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-teal font-bold text-xs uppercase tracking-widest">
                    Episode {item.number}
                  </span>
                  <h3 className="text-white font-bold text-base mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
