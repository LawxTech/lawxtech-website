"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";

const speakers = [
  { src: "/assets/speakers/Speaker-1.jpeg", name: "Series 1" },
  { src: "/assets/speakers/Speaker-2.jpeg", name: "Series 2" },
  { src: "/assets/speakers/Speaker-3.jpeg", name: "Series 3" },
  { src: "/assets/speakers/Speaker-4.jpeg", name: "Series 4" },
  { src: "/assets/speakers/Speaker-5.jpeg", name: "Series 5" },
  { src: "/assets/speakers/Speaker-6.jpeg", name: "Series 6" },
];

export default function SpeakersWallSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Our Speakers
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Learn From the Best
          </h2>
          <p className="mt-4 text-muted-brand max-w-xl mx-auto text-base">
            Law x Tech brings together legal professionals and tech experts who
            have walked the path you&apos;re on.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {speakers.map((speaker, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={speaker.src}
                alt={speaker.name}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1280px) 16vw, 200px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors duration-300" />
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold text-xs text-center px-2">
                  {speaker.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <Link
            href="https://forms.gle/ee4eCViprcSn4DE87"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-all duration-200"
          >
            Speak at the Series
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
