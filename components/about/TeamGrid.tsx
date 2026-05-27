"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, scaleIn } from "@/lib/animations";

const coreTeam = [
  {
    name: "Sopuruchi Rufus",
    role: "Founder",
    image: "sopuruchi-new.jpeg",
    dir: "members",
  },
];

const volunteerRoles = [
  "Graphics & Creative Lead",
  "Communications & Social Media Lead",
  "Partnerships & Outreach Lead",
  "Projects Coordinator",
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center"
        >
          {coreTeam.map((member) => (
            <motion.div
              key={member.name}
              variants={scaleIn}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-teal transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src={`/assets/${member.dir}/${member.image}`}
                  alt={member.name}
                  fill
                  sizes="144px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4">
                <p className="font-bold text-navy text-sm">{member.name}</p>
                <p className="text-muted-brand text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}

          {volunteerRoles.map((role) => (
            <motion.div
              key={role}
              variants={scaleIn}
              className="group flex flex-col items-center text-center"
            >
              <PlaceholderAvatar />
              <div className="mt-4">
                <p className="font-bold text-navy text-sm">Coming Soon</p>
                <p className="text-muted-brand text-xs mt-0.5">{role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
