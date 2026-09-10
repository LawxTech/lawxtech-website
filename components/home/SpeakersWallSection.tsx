"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp, scaleIn } from "@/lib/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const speakers = [
  { src: "/assets/speakers/abiola-ogodo.jpeg", name: "Abiola Ogodo" },
  { src: "/assets/speakers/samuel-fadahunsi.jpeg", name: "Samuel Fadahunsi" },
  { src: "/assets/speakers/speaker-6.jpeg", name: "Series 6" },
  { src: "/assets/speakers/speaker-5.jpeg", name: "Series 5" },
  { src: "/assets/speakers/speaker-4.jpeg", name: "Series 4" },
  { src: "/assets/speakers/speaker-3.jpeg", name: "Series 3" },
  { src: "/assets/speakers/speaker-2.jpeg", name: "Series 2" },
  { src: "/assets/speakers/speaker-1.jpeg", name: "Series 1" },
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
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 px-2 sm:px-12"
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {speakers.map((speaker, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/3 lg:basis-1/6"
                >
                  <motion.div
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 sm:-left-2" />
            <CarouselNext className="right-0 sm:-right-2" />
          </Carousel>
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
