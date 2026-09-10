"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";

const team = [
  {
    name: "Sopuruchi Rufus",
    role: "Founder",
    image: "sopuruchi-new.jpeg",
    dir: "members",
  },
  {
    name: "Favour Babatunde",
    role: "Community Manager",
    image: "Favour Babatunde, Projects Coordinator.jpeg",
    dir: "members",
  },
  {
    name: "Victoria Sogade",
    role: "Projects Manager",
    image: "Victoria Sogade, Communications & Social Media Lead.jpeg",
    dir: "members",
  },
  {
    name: "Joel Akhonani",
    role: "Projects Manager II",
    image: "Joel Akhonani, Projects Manager II.jpeg",
    dir: "members",
  },
  {
    name: "Chidimma Chukwuani",
    role: "Creative Director",
    image: "Chidimma M. Chukwuani, Partnerships & Outreach Lead.jpeg",
    dir: "members",
  },

  {
    name: "Joy Shehu",
    role: "Social Media Manager",
    image: "",
    dir: "members",
  },

  {
    name: "Mofe",
    role: "Partnerships Facilitator",
    image: "Mofe, Partnerships Facilitator.jpeg",
    dir: "members",
  },

  {
    name: "Matthew Onuchukwu",
    role: "Brand Designer",
    image: "Matthew Onuchukwu, Brand Designer.jpeg",
    dir: "members",
  },
  {
    name: "Madubugwu Ozioma",
    role: "Volunteer",
    image: "Madubugwu Ozioma, Graphics & Creative Lead.png",
    dir: "members",
  },
];

function PlaceholderAvatar() {
  return (
    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-2 border-dashed border-teal/40 bg-teal/5 flex items-center justify-center group-hover:border-teal group-hover:bg-teal/10 transition-all duration-300">
      <svg
        className="w-12 h-12 text-teal/40 group-hover:text-teal/60 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </div>
  );
}

export default function TeamGrid() {
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
            The People
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Our Team
          </h2>
          <p className="mt-4 text-muted-brand max-w-xl mx-auto text-base">
            Law x Tech is powered by passionate people who believe in the future
            of law and technology in Nigeria.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 gap-y-10"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={scaleIn}
              className={`group flex flex-col items-center text-center basis-[calc(50%-0.75rem)] sm:basis-[calc(33.333%-1rem)] lg:basis-[calc(20%-1.2rem)] ${
                index >= 5 ? "lg:mx-4" : ""
              }`}
            >
              {member.image ? (
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-teal transition-all duration-300 group-hover:shadow-lg">
                  <Image
                    src={`/assets/${member.dir}/${member.image}`}
                    alt={member.name}
                    fill
                    sizes="144px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <PlaceholderAvatar />
              )}
              <div className="mt-4">
                <p className="font-bold text-navy text-[13.6px] ">
                  {member.name}
                </p>
                <p className="text-muted-brand text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
